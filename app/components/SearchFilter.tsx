"use client";
import { Radio } from "@material-tailwind/react";
import React, { ReactNode, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function SearchFilter({ children }: Props) {
  const [rating, setRating] = useState([0, 5]);
  const [priceFilter, setPriceFilter] = useState("asc");
  const [applyRatingFilter, setApplyRatingFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const priceSort = searchParams.get("priceSort");

  const lowToHeight = priceSort === "asc";
  const heightToLow = priceSort === "desc";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        let url = "";

        if (applyRatingFilter) {
          url = `/search?query=${query}&minRating=${rating[0]}&maxRating=${rating[1]}&priceSort=${priceFilter}`;
        } else {
          url = `/search?query=${query}&priceSort=${priceFilter}`;
        }

        router.push(url);
      }}
      className="md:flex py-4 space-y-4"
    >
      <div className="md:border-r md:border-b-0 border-b border-gray-700 p-4 md:space-y-4 md:block flex space-x-8 md:space-x-0 sticky top-0 md:h-screen z-10 bg-white">
        <div>
          <p className="font-semibold">Giá</p>
          <div>
            <div>
              <Radio
                name="type"
                label="Thấp đến cao"
                defaultChecked={lowToHeight}
                color="blue-gray"
                className="text-sm"
                onChange={() => setPriceFilter("asc")}
              />
            </div>
            <div>
              <Radio
                name="type"
                label="Cao đến thấp"
                color="blue-gray"
                onChange={() => setPriceFilter("desc")}
                defaultChecked={heightToLow}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="text-blue-gray-600 text-center w-full p-1 border rounded mt-6"
          >
            Áp dụng
          </button>
          <button
            onClick={() => {
              setApplyRatingFilter(false);
              setRating([0, 5]);
              router.push("/search?query=" + query);
            }}
            type="button"
            className="text-blue-gray-600 text-center w-full p-1 border rounded mt-6"
          >
            Huỷ bỏ
          </button>
        </div>
      </div>

      <div className="p-4 flex-1">{children}</div>
    </form>
  );
}
