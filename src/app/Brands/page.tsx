import Link from "next/link";
import React from "react";

export default async function Brands() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  const { data } = await res.json();

  return (
    <div className="container w-[80%] mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Brands</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {data?.map((brand: any) => (
          <Link className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-5 "
            key={brand._id} href={`Brands/${brand._id}`}>
          <div
            
          >
            <div className="inner text-center cursor-pointer hover:scale-120 duration-300">
              {brand.image ? (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-[250px] object-cover rounded-2xl hover:shadow-2xl"
                />
              ) : (
                <div className="w-full h-[250px] bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center text-xl font-semibold text-gray-600">
                  No Image
                </div>
              )}
              <h2 className="text-center mt-3 text-2xl font-bold bg-yellow-300 p-2 rounded-2xl">
                {brand.name}
              </h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
