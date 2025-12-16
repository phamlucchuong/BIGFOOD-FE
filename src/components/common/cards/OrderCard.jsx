import { formatISOToReadable } from "../../../utils/dateTimeFormatUtils";
import { formatCurrency } from "../../../utils/moneyFormatUtils";
import { formatUuidWithPrefix } from "../../../utils/uuidFormatUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderStatusMapper } from "../../../utils/statusMapperUtils";

// Hiển thị đơn hàng; dùng `item` để khớp với CollectionSection
export default function OrderCard({ item, onClick }) {
  const order = item || {};
  const [onViewDetail, setOnViewDetail] = useState(true);
  const navigate = useNavigate();

  const onReorder = (e) => {
    e.stopPropagation();
    // Xử lý đặt lại đơn hàng
    console.log("Đặt lại đơn hàng:", order.id);
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    setOnViewDetail(false);
    navigate(`/order/detail?id=${order.id}`);
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2 hover:shadow-md transition py-3 my-4"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {/* Left section - Logo and info */}
        <div className="flex items-center gap-4 flex-1">
          {/* Restaurant Logo */}
          {order.restaurantBanner ? (
            <img
              src={order.restaurantBanner}
              alt={order.restaurantName || "Restaurant"}
              className="w-14 h-14 rounded-lg object-cover"
            />
          ) : null}

          {/* Restaurant and order details */}
          <div>
            {/* Date and Time */}
            {order.createdAt ? (
              <div className="text-sm font-medium text-gray-900 mb-1">
                {formatISOToReadable(order.createdAt)}
              </div>
            ) : null}

            {/* Order Code */}
            {order.id ? (
              <div className="text-xs text-gray-500 mb-1">
                Mã đơn hàng: {formatUuidWithPrefix(order.id)}
              </div>
            ) : null}
          </div>

          <div>
            {/* Restaurant Name */}
            {order.restaurantName ? (
              <h3 className="text-md font-medium text-gray-900 mb-1 line-clamp-2">
                {order.restaurantName}
              </h3>
            ) : null}

            {/* Quantity and Price */}
            <div className="text-xs text-gray-500">
              {order.numberDishes ?? 0} phần •{" "}
              {formatCurrency(order.totalAmount ?? 0)}
            </div>
          </div>
        </div>
        {/* Reorder Button */}
        {order.status === "COMPLETED" ||
        order.status === "CANCELLED" ||
        order.status === "REJECTED" ? (
          <div className="mr-12">
            <button
              onClick={onReorder}
              className="absolute right-64 top-6 px-4 py-[7px] border border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-50 transition text-sm"
            >
              Đặt lại
            </button>
          </div>
        ) : null}
        {/* Right section - Buttons and Status */}
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          {order.status ? (
            <div
              className={`px-4 py-[5px] rounded-lg text-xs font-medium ${
                orderStatusMapper[order.status].color
              }`}
            >
              {orderStatusMapper[order.status].text}
            </div>
          ) : null}

          {/* View detail link (optional) */}
          {onViewDetail && (
            <button
              onClick={handleViewDetail}
              className="text-gray-500 text-sm "
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
