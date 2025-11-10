import React, { useState } from "react";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import mockRestaurants from "../../dataSample/mockRestaurants";

const RelatedRestaurants = ({ category }) => {
  const [showSlider, setShowSlider] = useState(false);

  const restaurants = mockRestaurants.filter(
    (item) => item.category === category
  );

  return (
    <div className="w-full mt-4">
      {/* Thanh nút điều khiển */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setShowSlider(!showSlider)}
          className="border rounded-full px-3 py-1 text-sm flex items-center gap-1 text-gray-700"
        >
          Nhà hàng tương tự
          <ChevronDown
            size={16}
            className={`transition-transform ${showSlider ? "rotate-180" : ""}`}
          />
        </button>

        <button className="border rounded-full px-3 py-1 text-sm flex items-center gap-1 text-gray-700">
          <Users size={16} /> Đặt theo nhóm
        </button>
      </div>

      {/* Slider hiển thị danh sách quán */}
      {showSlider && (
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

          <button className="flex items-center justify-center min-w-[40px] bg-gray-100 rounded-full size-10 hover:bg-gray-200">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedRestaurants;
