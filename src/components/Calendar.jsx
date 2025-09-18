import React, { useState } from "react";
import Calendar20 from "./ui/calendar-20";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowBigLeft } from "lucide-react";

const Calendar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("month");

  return (
    <>
      {JSON.stringify(view)}
      <div className="flex flex-row justify-between">
        <Button onClick={() => navigate(-1)}>
          <ArrowBigLeft /> Back
        </Button>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setView("month")}>
            Month
          </Button>
          <Button variant="outline" onClick={() => setView("day")}>
            Day
          </Button>
        </div>
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <Calendar20 view={view} listing_id={params.id}></Calendar20>
      </div>
    </>
  );
};

export default Calendar;
