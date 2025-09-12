import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { Popsicle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ListingEachPage = () => {
  const params = useParams();
  const fetchData = useFetch();

  const getOneListing = async () => {
    return await fetchData(
      "/api/eachListing",
      "PUT",
      {
        listing_id: params.id,
      },
      undefined
    );
  };
  const query = useQuery({
    queryKey: ["listing", params.id],
    queryFn: getOneListing,
  });

  return (
    <>
      <>
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <div className="relative flex items-center justify-center gap-2 -left-4">
            <Popsicle className="w-6 h-6" />
            Propsical
          </div>
        </h1>

        {query.isSuccess && (
          <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {query.data.summary}
            </h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Asking Price: ${Number(query.data.asking_price).toLocaleString()}
            </h3>
            <p className="text-muted-foreground text-xl">
              {query.data.description}
            </p>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <tbody>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Type
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {query.data.type}
                    </td>
                  </tr>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Bedroom(s)
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {Number(query.data.bedroom).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Bathroom(s)
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {Number(query.data.toilet).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Floor size
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {Number(query.data.floor_size).toLocaleString()} sqft
                    </td>
                  </tr>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Land size
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {Number(query.data.land_size).toLocaleString()} sqft
                    </td>
                  </tr>
                  <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Tenure
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {query.data.tenure}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    </>
  );
};
export default ListingEachPage;
