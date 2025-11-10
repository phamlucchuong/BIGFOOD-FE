import React, { useState } from "react";
import { ChevronRight, Users } from "lucide-react";
import mockRestaurants from "../../dataSample/mockRestaurants";

const RelatedRestaurants = ({ category }) => {

  const restaurants = mockRestaurants.filter(
    (item) => item.category === category
  );

  return (
    <div>

      {/* Slider hiển thị danh sách quán */}
        <div className="flex items-center gap-4 overflow-x-auto pb-3 animate-fadeIn">
          {restaurants.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] bg-white shadow-sm rounded-xl p-3 flex-shrink-0 hover:shadow-md transition"
            >
              <div className="relative">
                {item.promo && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    PROMO
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-40 object-cover"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{item.address}</p>
                <p className="text-xs mt-1 flex items-center text-yellow-600">
                  ⭐ {item.rating} ({item.reviews})
                </p>
              </div>
            </div>
          ))}

        </div>
    </div>
  );
};

export default RelatedRestaurants;
