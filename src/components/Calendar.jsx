import React, { use, useState } from "react";
import Calendar20 from "./ui/calendar-20";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowBigLeft } from "lucide-react";
import AuthCtx from "../context/authCtx";

const Calendar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("day");
  const authCtx = use(AuthCtx);
  const isAuthenticated = Boolean(authCtx.access);

  return (
    <>
      <div className="flex flex-row justify-between">
        <Button onClick={() => navigate(-1)}>
          <ArrowBigLeft /> Back
        </Button>
        {isAuthenticated ? (
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setView("month")}>
              Month
            </Button>
            <Button variant="outline" onClick={() => setView("day")}>
              Day
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex min-h-screen items-center justify-center">
        <Calendar20 view={view} listing_id={params.id}></Calendar20>
      </div>
    </>
  );
};

export default Calendar;
