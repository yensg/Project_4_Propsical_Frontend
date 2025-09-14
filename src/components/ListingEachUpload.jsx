import React, { use, useState } from "react";
import AuthCtx from "../context/authCtx";
import { useMutation } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft, Image, Popsicle } from "lucide-react";

const ListingEachUpload = () => {
  const [file, setFile] = useState(null);
  const authCtx = use(AuthCtx);
  const params = useParams();
  const navigate = useNavigate();

  const onUpload = async () => {
    const form = new FormData();
    form.append("image", file);
    form.append("listing_id", params.id);

    const res = await fetch(`${import.meta.env.VITE_SERVER}/api/upload`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + authCtx.access,
      },
      body: form,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Upload failed");
    return data;
  };

  const mutate = useMutation({
    mutationFn: onUpload,
    onSuccess: () => {
      setFile(null);
    },
  });

  //   const clickedBack = () => {
  //     navigate(`/updateListing/${params.id}`);
  //   };

  return (
    <>
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <div className="relative flex items-center justify-center gap-2 -left-4">
          <Popsicle className="w-6 h-6" />
          Propsical
        </div>
      </h1>
      <div className="scroll-m-20 text-xl font-semibold tracking-tight">
        Upload Image
      </div>
      <div className="flex flex-wrap gap-2 w-full md:w-auto md:ml-auto md:items-center md:mt-0">
        <Link to={`/updateListing/${params.id}`}>
          {/* <Button onClick={clickedBack}> */}
          <Button>
            <ArrowBigLeft /> Back
          </Button>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Upload Button */}
          <Button onClick={mutate.mutate}>
            <Image />
            Upload
          </Button>
        </div>

        {/* Show uploaded image */}
        {mutate.isSuccess && (
          <img
            src={mutate.data.secure_url}
            alt="Uploaded"
            className="mt-2 w-48 h-48 object-cover rounded-md"
          />
        )}
      </div>
    </>
  );
};
export default ListingEachUpload;
