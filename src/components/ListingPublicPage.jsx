import { useQuery } from "@tanstack/react-query";
import React, { use, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import AuthCtx from "../context/authCtx";
import ListingEach from "./ListingEach";
import { Popsicle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ListingPublicPage = () => {
  const fetchData = useFetch();

  const getAllListings = async () => {
    return await fetchData("/api/allListings", "GET", undefined, undefined);
  };
  const query = useQuery({
    queryKey: ["allListings"],
    queryFn: getAllListings,
  });

  return (
    <>
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <div className="flex items-center justify-center gap-2">
          <Popsicle />
          Welcome!
        </div>
      </h1>

      {query?.isSuccess &&
        query?.data?.map((item, idx) => {
          return (
            <ListingEach
              asking_price={item.asking_price}
              floor_size={item.floor_size}
              land_size={item.land_size}
              bedroom={item.bedroom}
              toilet={item.toilet}
              type={item.type}
              unit_number={item.unit_number}
              location={item.location}
              geo_lat={item.geo_lat}
              geo_lon={item.geo_lon}
              summary={item.summary}
              description={item.description}
              listing_id={item.id}
              account_id={item.account_id}
              is_deleted={item.is_deleted}
              key={idx}
              number={item.number}
              tenure={item.tenure}
            >
              {idx}
            </ListingEach>
          );
        })}
    </>
  );
};

export default ListingPublicPage;
