import React, { use } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import AuthCtx from "../context/authCtx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const BlockedDatesDelete = (props) => {
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();
  const fetchData = useFetch();

  const dateObj = new Date(props.date);
  const formatedDate = dateObj.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short", // gives "Jan", "Feb"
    year: "numeric",
  });

  const deleteBlockedDates = async () => {
    await fetchData(
      "/api/deleteBlockedDates",
      "DELETE",
      {
        uid: props.uid,
      },
      authCtx.access
    );
    return true;
  };
  const mutate = useMutation({
    mutationFn: deleteBlockedDates,
    onSuccess: () => {
      queryClient.invalidateQueries(["allAppointments", props.listing_id]);
    },
  });

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div>{formatedDate}</div>
        <Button variant="destructive" onClick={mutate.mutate}>
          <Trash2 />
        </Button>
      </div>
    </>
  );
};

export default BlockedDatesDelete;
