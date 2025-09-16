import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArchiveX,
  BedDouble,
  CircleDollarSign,
  Eye,
  MapPin,
  PencilLine,
  Phone,
  Toilet,
  Trash2,
  User,
} from "lucide-react";
import React, { use } from "react";
import useFetch from "../hooks/useFetch";
import AuthCtx from "../context/authCtx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { Link, useNavigate } from "react-router-dom";

const ListingEach = (props) => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(authCtx.access);

  const deleteListing = async () => {
    await fetchData(
      "/api/deleteListing",
      "DELETE",
      {
        listing_id: props.listing_id,
      },
      authCtx.access
    );
    return true;
  };
  const mutate = useMutation({
    mutationFn: deleteListing,
    onSuccess: () => {
      queryClient.invalidateQueries(["listings", authCtx.username]);
    },
  });

  const clickedView = () => {
    navigate(`/listings/${props.listing_id}`);
  };

  const clickedUpdate = () => {
    navigate(`/updateListing/${props.listing_id}`);
  };

  const findImages = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/api/findImages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + undefined,
      },
      body: JSON.stringify({ listing_id: props.listing_id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Can't find images");
    return data;
  };
  const queryImages = useQuery({
    queryKey: ["images", props.listing_id],
    queryFn: findImages,
  });

  const findUsername = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/api/username`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + undefined,
      },
      body: JSON.stringify({ listing_id: props.listing_id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Can't find images");
    return data;
  };
  const queryUsername = useQuery({
    queryKey: ["usernames", props.listing_id],
    queryFn: findUsername,
  });

  return (
    <>
      <div className="px-4 md:px-12 gap-2">
        <Card className="w-full p-4">
          {!isAuthenticated ? (
            <Link to={`/listings/${props.listing_id}`}>
              <div className="flex w-full flex-col md:flex-row items-start gap-2">
                <div className="flex flex-col md:flex-row md: items-center items-left gap-2">
                  <div className="shrink-0 w-10 text-center text-lg font-semibold">
                    <span>{props.children + 1}</span>
                  </div>
                  {queryImages.isSuccess && queryImages.data.length > 0 && (
                    <img
                      src={queryImages.data[0].image}
                      alt={props.children + 1}
                      className="shrink-0 rounded-md object-cover w-64 h-56"
                    />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex w-full flex-wrap gap-2">
                      <Badge variant="destructive">
                        <CircleDollarSign />
                        Asking Price: $
                        {Number(props.asking_price).toLocaleString()}
                      </Badge>
                      <Badge>
                        <BedDouble />
                        {props.bedroom}
                      </Badge>
                      <Badge>
                        <Toilet />
                        {props.toilet}
                      </Badge>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                      >
                        Floor size: {Number(props.floor_size).toLocaleString()}{" "}
                        sqft
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                      >
                        Land size: {Number(props.land_size).toLocaleString()}{" "}
                        sqft
                      </Badge>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      <Badge>Unit No: {props.unit_number}</Badge>
                      <Badge>Tenure: {props.tenure}</Badge>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin />
                        <span className="font-semibold text-left">
                          {props.location}
                        </span>
                      </div>
                      {queryUsername.isSuccess && (
                        <div className="flex w-full flex-wrap gap-2">
                          <div className="flex flex-row gap-2">
                            <div className="flex flex-row">
                              <User />
                              <span>{queryUsername.data.name}</span>
                            </div>
                            <div className="flex flex-row">
                              <Phone />
                              <span>{queryUsername.data.phone}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <div className="flex flex-wrap gap-2 w-full md:w-auto md:ml-auto md:items-center md:mt-0">
                      <Button variant="outline" onClick={clickedView}>
                        <Eye />
                        View
                      </Button>
                      <Button variant="outline" onClick={clickedUpdate}>
                        <PencilLine />
                        Update
                      </Button>
                      {/* <Button variant="secondary">
                        <ArchiveX />
                        Completed
                      </Button> */}
                      <Button variant="destructive" onClick={mutate.mutate}>
                        <Trash2 />
                        Delete
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <div>
              <div className="flex w-full flex-col md:flex-row items-start gap-2">
                <div className="flex flex-col md:flex-row md: items-center items-left gap-2">
                  <div className="shrink-0 w-10 text-center text-lg font-semibold">
                    <span>{props.children + 1}</span>
                  </div>
                  {queryImages.isSuccess && queryImages.data.length > 0 && (
                    <img
                      src={queryImages.data[0].image}
                      alt={props.children + 1}
                      className="shrink-0 rounded-md object-cover w-64 h-56"
                    />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex w-full flex-wrap gap-2">
                      <Badge variant="destructive">
                        <CircleDollarSign />
                        Asking Price: $
                        {Number(props.asking_price).toLocaleString()}
                      </Badge>
                      <Badge>
                        <BedDouble />
                        {props.bedroom}
                      </Badge>
                      <Badge>
                        <Toilet />
                        {props.toilet}
                      </Badge>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                      >
                        Floor size: {Number(props.floor_size).toLocaleString()}{" "}
                        sqft
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                      >
                        Land size: {Number(props.land_size).toLocaleString()}{" "}
                        sqft
                      </Badge>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      <Badge>Unit No: {props.unit_number}</Badge>
                      <Badge>Tenure: {props.tenure}</Badge>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin />
                        <span className="font-semibold">{props.location}</span>
                      </div>
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <div className="flex flex-wrap gap-2 w-full md:w-auto md:ml-auto md:items-center md:mt-0">
                      <Button variant="outline" onClick={clickedView}>
                        <Eye />
                        View
                      </Button>
                      <Button variant="outline" onClick={clickedUpdate}>
                        <PencilLine />
                        Update
                      </Button>
                      {/* <Button variant="secondary">
                        <ArchiveX />
                        Completed
                      </Button> */}
                      <Button variant="destructive" onClick={mutate.mutate}>
                        <Trash2 />
                        Delete
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      <br />
    </>
  );
};

export default ListingEach;
