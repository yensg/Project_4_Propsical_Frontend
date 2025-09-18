import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useFetch from "../../hooks/useFetch";
import AuthCtx from "../../context/authCtx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Label } from "@radix-ui/react-label";
import BlockedDatesDelete from "../BlockedDatesDelete";
import AppointmentTimeslotsDelete from "../AppointmentTimeslotsDelete";

export default function Calendar20(props) {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [error, setError] = useState("");

  const isAuthenticated = Boolean(authCtx.access);

  const [range, setRange] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = (Math.floor(totalMinutes / 60) + 9) % 24;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });

  // Must send the local's machine timezone setting over to the backend to align
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Blocking the dates
  const clickedBlockDates = async () => {
    // block range of dates
    const fromDate = new Date(range.from);
    const toDate = new Date(range.to);
    const dates = [];
    for (
      let d = new Date(fromDate);
      d <= toDate; // stop at 'to' exclusive (midnight of 17th)
      d.setDate(d.getDate() + 1)
    ) {
      // push a *copy* of the date
      dates.push(new Date(d));
    }
    return await fetchData(
      "/api/blockCalendar",
      "POST",
      {
        listing_id: props.listing_id,
        dates,
        summary: "Blocked Dates",
        description: "Blocking dates",
        timezone: timeZone,
        account_id: authCtx.account_id,
      },
      authCtx.access
    );
  };
  const mutate = useMutation({
    mutationFn: clickedBlockDates,
    onSuccess: () => {
      setRange("");
      queryClient.invalidateQueries(["allAppointments", props.listing_id]);
    },
  });

  // Fetching appointments
  const fetchAllAppointments = async () => {
    return await fetchData(
      "/api/appointments",
      "POST",
      {
        listing_id: props.listing_id,
      },
      undefined
    );
  };
  const query = useQuery({
    queryKey: ["allAppointments", props.listing_id],
    queryFn: fetchAllAppointments,
  });

  // Blocked Dates, keep only date_is_blocked = true
  const fetchedBlockedDates = query.data
    ?.filter((each) => each.date_is_blocked)
    .map((each) => {
      return new Date(each.dtstart);
    });

  // Blocked Timeslots, keep only timeslot_is_blocked = true
  const fetchedBlockedTime = query.data
    ?.filter((each) => each.timeslot_is_blocked)
    .map((each) => {
      const date = new Date(each.dtstart);
      // Extract the time part (HH:mm, Singapore TZ)
      const time = date.toLocaleTimeString("en-SG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return [date, time];
    });

  const normalizeDate = (d) => {
    const nd = new Date(d);
    nd.setHours(0, 0, 0, 0);
    return nd;
  };

  // date conversion after selected on the calendar
  const now = new Date();
  const offsetMinutes = -now.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const localHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(
    2,
    "0"
  );
  const localMinutes = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");
  // This is Time Zone due to localmachine setting
  const offset = `${sign}${localHours}:${localMinutes}`;
  // this is from selectedTime
  const [hours, minutes] = selectedTime.split(":").map(Number);
  // Extract year, month, day from selectedDate
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");
  // Combine into one ISO string before updating the database
  const formatedDate = `${year}-${month}-${day}T${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}:00${offset}`;

  const createAppointment = async (data) => {
    return await fetchData("/api/calendar", "POST", data, undefined);
    // return await fetchData("/api/calendar", "POST", {
    //   listing_id: props.listing_id,
    //   dtstart: formatedDate,
    //   summary: authCtx.username || guestName,
    //   description: guestPhone,
    //   status: "CONFIRMED",
    //   timeslot_is_blocked: true,
    //   account_id: authCtx.account_id || null,
    //   timezone: timeZone,
    // });
  };
  const mutateAppt = useMutation({
    mutationFn: (data) => createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["allAppointments", props.listing_id]);
      setSelectedDate(new Date());
      setSelectedTime("");
      setGuestName("");
      setGuestPhone("");
    },
  });

  const clickedBlockedTimeslot = () => {
    mutateAppt.mutate({
      listing_id: props.listing_id,
      dtstart: formatedDate,
      summary: authCtx.username,
      description: "Blocked timeslot",
      status: "CANCELLED",
      timeslot_is_blocked: true,
      account_id: authCtx.account_id,
      timezone: timeZone,
    });
  };

  const clickedBookAppointmentByPublicPage = () => {
    const inputs = { guestName, guestPhone };
    const hasEmpty = Object.entries(inputs).some(
      ([, value]) => value === "" || value === null || value === undefined
    );
    if (hasEmpty) {
      setError("⚠️ Please fill in all required fields");
      return;
    }
    setError("");

    mutateAppt.mutate({
      listing_id: props.listing_id,
      dtstart: formatedDate,
      summary: guestName,
      description: guestPhone,
      status: "CONFIRMED",
      timeslot_is_blocked: true,
      account_id: null,
      timezone: timeZone,
    });
  };

  const clickedBookAppointmentByLogin = () => {
    if (!guestPhone || guestPhone.trim() === "") {
      setError("⚠️ Please fill in all required fields");
      return;
    }
    setError("");

    mutateAppt.mutate({
      listing_id: props.listing_id,
      dtstart: formatedDate,
      summary: authCtx.username,
      description: `created appt for ${guestPhone}`,
      status: "CONFIRMED",
      timeslot_is_blocked: true,
      account_id: authCtx.account_id,
      timezone: timeZone,
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          {props.view === "month" ? (
            <Card className="gap-0 p-0">
              <CardContent className="relative p-0">
                <div className="p-6">
                  <Label className="font-semibold align-baseline">
                    Blocking Mode
                  </Label>
                  <Calendar
                    mode="range"
                    defaultMonth={range?.from}
                    selected={range}
                    onSelect={setRange}
                    disabled={fetchedBlockedDates}
                    numberOfMonths={1}
                    captionLayout="dropdown"
                    className="bg-transparent p-0 [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
                    formatters={{
                      formatMonthDropdown: (date) => {
                        return date.toLocaleString("default", {
                          month: "long",
                        });
                      },
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
                <div className="text-sm">
                  <>Select dates you want to block.</>
                </div>
                <Button
                  // disabled={!selectedDate || !selectedTime}
                  className="w-full md:ml-auto md:w-auto"
                  variant="outline"
                  onClick={mutate.mutate}
                >
                  Block
                </Button>
              </CardFooter>
              <CardFooter className="flex flex-col gap-1 border-t px-6 !py-5">
                <div className="text-sm">
                  <>Select dates you want to unblock.</>
                </div>
                <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 ">
                  <div className="flex flex-col items-center gap-2">
                    {query.isSuccess &&
                      query.data.map((each) => {
                        return (
                          <BlockedDatesDelete
                            date={each.dtstart}
                            listing_id={props.listing_id}
                            uid={each.uid}
                            key={each.uid}
                          />
                        );
                      })}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="gap-0 p-0">
              <CardContent className="relative p-0 md:pr-48">
                <div className="flex justify-center p-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    required
                    defaultMonth={selectedDate}
                    disabled={fetchedBlockedDates}
                    showOutsideDays={true}
                    className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                    formatters={{
                      formatWeekdayName: (date) => {
                        return date.toLocaleString("en-US", {
                          weekday: "short",
                        });
                      },
                    }}
                    components={{
                      DayButton: ({ children, modifiers, day, ...props }) => {
                        const isConfirmed =
                          query.isSuccess &&
                          query.data.some(
                            (each) =>
                              each.status === "CONFIRMED" &&
                              new Date(each.dtstart).toDateString() ===
                                day.date.toDateString()
                          );

                        return (
                          <CalendarDayButton
                            day={day}
                            modifiers={modifiers}
                            {...props}
                            className={
                              isConfirmed
                                ? "bg-red-500 text-white rounded-full"
                                : ""
                            }
                          >
                            {children}
                          </CalendarDayButton>
                        );
                      },
                    }}
                  />
                </div>
                <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
                  <div className="grid gap-2">
                    {timeSlots.map((time) => {
                      const timeIsBlocked = fetchedBlockedTime
                        ?.filter(
                          (each) =>
                            normalizeDate(each[0]).getTime() ===
                            normalizeDate(selectedDate).getTime()
                        )
                        .map((each) => {
                          return each[1];
                        })
                        .includes(time);
                      return (
                        <Button
                          key={time}
                          disabled={timeIsBlocked}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          onClick={() => setSelectedTime(time)}
                          className={`w-full shadow-none ${
                            timeIsBlocked ? "opacity-50 line-through" : ""
                          }`}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
                <div className="text-sm">
                  <>Select timeslot you want to block.</>
                </div>
                <Button
                  // disabled={!selectedDate || !selectedTime}
                  className="w-full md:ml-auto md:w-auto"
                  variant="outline"
                  onClick={clickedBlockedTimeslot}
                >
                  Block
                </Button>
              </CardFooter>
              <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5">
                {error && <p className="text-red-500 font-semibold">{error}</p>}
                <div className="text-sm">Time Zone: {timeZone}</div>
                <div className="text-sm">
                  {selectedDate && selectedTime ? (
                    <>
                      Your meeting is booked for{" "}
                      <span className="font-medium">
                        {" "}
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}{" "}
                      </span>
                      at <span className="font-medium">{selectedTime}</span>.
                    </>
                  ) : (
                    <>Select a date and time for your meeting.</>
                  )}
                </div>
                <div className="flex flex-row items-center w-full  gap-2">
                  <Label htmlFor="guestPhone">Name/Phone</Label>
                  <Input
                    id="guestPhone"
                    type="text"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!selectedDate || !selectedTime}
                  className="w-full "
                  variant="outline"
                  onClick={clickedBookAppointmentByLogin}
                >
                  Book Appointment
                </Button>
              </CardFooter>
              <CardFooter className="flex flex-col gap-1 border-t px-6 !py-5 ">
                <div className="text-sm">
                  <>Select Appointment you want to delete.</>
                </div>
                <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6">
                  <div className="flex flex-col items-center gap-2">
                    {query.isSuccess &&
                      query.data
                        .filter((each) => each.timeslot_is_blocked)
                        .map((each) => {
                          const date = new Date(each.dtstart);
                          const time = date.toLocaleTimeString("en-SG", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          });
                          return (
                            <AppointmentTimeslotsDelete
                              date={date}
                              time={time}
                              listing_id={props.listing_id}
                              uid={each.uid}
                              key={each.uid}
                              summary={each.summary}
                              description={each.description}
                            />
                          );
                        })}
                  </div>
                </div>
              </CardFooter>
            </Card>
          )}
        </>
      ) : (
        <>
          <Card className="gap-0 p-0">
            <CardContent className="relative p-0 md:pr-48">
              <div className="flex justify-center p-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  required
                  defaultMonth={selectedDate}
                  disabled={fetchedBlockedDates}
                  showOutsideDays={true}
                  className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                  formatters={{
                    formatWeekdayName: (date) => {
                      return date.toLocaleString("en-US", {
                        weekday: "short",
                      });
                    },
                  }}
                  components={{
                    DayButton: ({ children, modifiers, day, ...props }) => {
                      const isConfirmed =
                        query.isSuccess &&
                        query.data.some(
                          (each) =>
                            each.status === "CONFIRMED" &&
                            new Date(each.dtstart).toDateString() ===
                              day.date.toDateString()
                        );

                      return (
                        <CalendarDayButton
                          day={day}
                          modifiers={modifiers}
                          {...props}
                          className={
                            isConfirmed
                              ? "bg-red-500 text-white rounded-full"
                              : ""
                          }
                        >
                          {children}
                        </CalendarDayButton>
                      );
                    },
                  }}
                />
              </div>
              <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
                <div className="grid gap-2">
                  {timeSlots.map((time) => {
                    const timeIsBlocked = fetchedBlockedTime
                      ?.filter(
                        (each) =>
                          normalizeDate(each[0]).getTime() ===
                          normalizeDate(selectedDate).getTime()
                      )
                      .map((each) => {
                        return each[1];
                      })
                      .includes(time);
                    return (
                      <Button
                        key={time}
                        disabled={timeIsBlocked}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full shadow-none ${
                          timeIsBlocked ? "opacity-50 line-through" : ""
                        }`}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 ">
              {error && <p className="text-red-500 font-semibold">{error}</p>}
              <div className="text-sm">Time Zone: {timeZone}</div>
              <div className="text-sm">
                {selectedDate && selectedTime ? (
                  <>
                    Your meeting is booked for{" "}
                    <span className="font-medium">
                      {" "}
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}{" "}
                    </span>
                    at <span className="font-medium">{selectedTime}</span>.
                  </>
                ) : (
                  <>Select a date and time for your meeting.</>
                )}
              </div>
              <div className="flex flex-row items-center w-full gap-2">
                <Label htmlFor="guestName">Name</Label>
                <Input
                  id="guestName"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center w-full gap-2">
                <Label htmlFor="guestPhone">Phone</Label>
                <Input
                  id="guestPhone"
                  type="text"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                />
              </div>
              <Button
                disabled={!selectedDate || !selectedTime}
                className="w-full"
                variant="outline"
                onClick={clickedBookAppointmentByPublicPage}
              >
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </>
  );
}
