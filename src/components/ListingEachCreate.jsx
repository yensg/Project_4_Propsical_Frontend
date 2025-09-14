import React, { use, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import AuthCtx from "../context/authCtx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowBigLeft, Popsicle, Send, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ListingEachCreate = () => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const [inputs, setInputs] = useState({
    asking_price: "",
    floor_size: "",
    land_size: "",
    bedroom: "",
    toilet: "",
    type: "",
    tenure: "",
    unit_number: "",
    location: "",
    summary: "",
    description: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleClear = () => {
    setInputs({
      asking_price: "",
      floor_size: "",
      land_size: "",
      bedroom: "",
      toilet: "",
      type: "",
      tenure: "",
      unit_number: "",
      location: "",
      summary: "",
      description: "",
    });
  };

  //   const getAccountId = async () => {
  //     return await fetchData(
  //       "/api/username",
  //       "PUT",
  //       {
  //         username: authCtx.username,
  //       },
  //       authCtx.access
  //     );
  //   };
  //   const query = useQuery({
  //     queryKey: ["accountId"],
  //     queryFn: getAccountId,
  //   });

  const createListing = async (payload) => {
    return await fetchData(
      "/api/createListing",
      "PUT",
      payload,
      authCtx.access
    );
  };

  const mutate = useMutation({
    mutationFn: (payload) => createListing(payload),
    onSuccess: (data) => {
      setInputs({
        asking_price: "",
        floor_size: "",
        land_size: "",
        bedroom: "",
        toilet: "",
        type: "",
        tenure: "",
        unit_number: "",
        location: "",
        summary: "",
        description: "",
      });
      navigate(`/newListingUpload/${data.listing_id}`);
    },
  });

  const clickedSubmit = () => {
    const hasEmpty = Object.entries(inputs).some(
      ([key, value]) => value === "" || value === null || value === undefined
    );

    if (hasEmpty) {
      setError("⚠️ Please fill in all required fields");
      return;
    }

    setError("");

    const payload = {
      ...inputs,
      land_size: inputs.land_size === "" ? null : Number(inputs.land_size),
      account_id: authCtx.account_id, // add it here only when sending
    };

    mutate.mutate(payload);
  };

  return (
    <>
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <div className="relative flex items-center justify-center gap-2 -left-4">
          <Popsicle className="w-6 h-6" />
          Propsical
        </div>
      </h1>
      <div className="scroll-m-20 text-xl font-semibold tracking-tight">
        Create New Listing
      </div>
      <div className="flex flex-wrap gap-2 w-full md:w-auto md:ml-auto md:items-center md:mt-0">
        <Link to={`/listings`}>
          <Button>
            <ArrowBigLeft /> Back
          </Button>
        </Link>
      </div>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="location"
          >
            Address:
          </Label>
          <Input
            value={inputs.location ?? ""}
            onChange={handleChange}
            id="location"
            type="text"
            placeholder="Address"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="unit_number"
          >
            Unit Number:
          </Label>
          <Input
            value={inputs.unit_number}
            onChange={handleChange}
            id="unit_number"
            type="text"
            placeholder="Unit Number, Landed Number etc"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="summary"
          >
            Summary:
          </Label>
          <Input
            value={inputs.summary}
            onChange={handleChange}
            id="summary"
            type="text"
            placeholder="Condo name etc"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="asking_price"
          >
            Asking Price($):
          </Label>
          <Input
            value={inputs.asking_price}
            onChange={handleChange}
            id="asking_price"
            type="text"
            placeholder="Price"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="type"
          >
            Type:
          </Label>
          <Input
            value={inputs.type}
            onChange={handleChange}
            id="type"
            type="text"
            placeholder="Type"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="bedroom"
          >
            Bedroom:
          </Label>
          <Input
            value={inputs.bedroom}
            onChange={handleChange}
            id="bedroom"
            type="text"
            placeholder="bedroom"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="toilet"
          >
            Toilet:
          </Label>
          <Input
            value={inputs.toilet}
            onChange={handleChange}
            id="toilet"
            type="text"
            placeholder="Toilet"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="floor_size"
          >
            Floor size (sqft):
          </Label>
          <Input
            value={inputs.floor_size}
            onChange={handleChange}
            id="floor_size"
            type="text"
            placeholder="Size"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="land_size"
          >
            Land size (sqft):
          </Label>
          <Input
            value={inputs.land_size}
            onChange={handleChange}
            id="land_size"
            type="text"
            placeholder="Size"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="tenure"
          >
            Tenure:
          </Label>
          <Input
            value={inputs.tenure}
            onChange={handleChange}
            id="tenure"
            type="text"
            placeholder="Tenure"
            required
          />
        </div>

        <div className="flex flex-row gap-2">
          <Label
            className="leading-7 font-bold [&:not(:first-child)]:mt-6 whitespace-nowrap"
            htmlFor="description"
          >
            Description:
          </Label>
          <Input
            value={inputs.description}
            onChange={handleChange}
            id="description"
            type="text"
            placeholder="Describe your property"
            required
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto md:ml-auto md:items-center md:mt-0">
          <Button onClick={clickedSubmit}>
            <Send />
            Submit
          </Button>
          <Button variant="destructive" onClick={handleClear}>
            <Trash2 />
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};
export default ListingEachCreate;
