import "@fortawesome/fontawesome-free/css/all.min.css";
import { Bike, ClipboardList, Clock, CreditCard, MapPin } from "lucide-react";
import useOrder from "../../../hooks/data/useOrder";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/moneyFormatUtils";
import {
  orderStatusMap,
  paymentMethodMap,
} from "../../../utils/statusMapperUtils";
import { formatUuidWithPrefix } from "../../../utils/uuidFormatUtils";
import { formatISOToReadable } from "../../../utils/dateTimeFormatUtils";
import { useSearchParams } from "react-router-dom";
import TextButton from "../../../components/common/buttons/TextButton";
import RatingModal from "../../../components/modals/common/RatingModal";
import CancelOrderModal from "../../../components/modals/common/CancelOrderModal";

export default function OrderDetail() {
  const { orders, getOrder } = useOrder();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleRatingModalOpen = () => {
    setIsRatingModalOpen(true);
  };

  const handleRatingModalClose = () => {
    setIsRatingModalOpen(false);
  };

  const handleCancelModalOpen = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
  };

  const handleCancelOrder = (reason) => {
    console.log("Cancellation reason:", reason);
  };

  useEffect(() => {
    getOrder(orderId);
  }, []);

  const buttonColor = {
    PENDING: "red",
    COMPLETED: "blue",
  }[orders?.status];

  const calTime = (distance) => {
    const minSpeed = 15; // km/h (Kẹt xe)
    const maxSpeed = 30; // km/h (Đường thoáng)
    const prepTime = 15; // Phút (Thời gian nhà hàng làm món)

    // 1. Tính thời gian di chuyển (đổi ra phút)
    // Đi nhanh nhất (maxSpeed) -> Tốn ít thời gian nhất (minTime)
    const minTravelTimeMinutes = (distance / maxSpeed) * 60;

    // Đi chậm nhất (minSpeed) -> Tốn nhiều thời gian nhất (maxTime)
    const maxTravelTimeMinutes = (distance / minSpeed) * 60;

    // 2. Cộng thêm thời gian làm món
    const totalMinMinutes = minTravelTimeMinutes + prepTime;
    const totalMaxMinutes = maxTravelTimeMinutes + prepTime;

    // 3. Tính ra Timestamp (ms)
    // Date.now() + số phút * 60 giây * 1000 ms
    const minTimeMs = Date.now() + totalMinMinutes * 60 * 1000;
    const maxTimeMs = Date.now() + totalMaxMinutes * 60 * 1000;

    // 4. Hàm helper để format ra giờ:phút (VD: 12:30)
    const formatTime = (ms) => {
      const date = new Date(ms);
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

    return {
      // Trả về chuỗi hiển thị luôn (hoặc trả về timestamp tùy nhu cầu)
      min: formatTime(minTimeMs),
      max: formatTime(maxTimeMs),
      // Trả thêm timestamp raw nếu muốn tính toán tiếp
      minMs: minTimeMs,
      maxMs: maxTimeMs,
    };
  };

  // Cách dùng trong UI:
  // const time = calTime(orders.deliveryDistance);
  // Hiển thị: <div>{time.min} – {time.max}</div>  => "22:08 – 22:25"

  return (
    <div className="min-h-screen bg-[#e8edf2] px-4 py-10">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
              🍗
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {formatISOToReadable(orders.createdAt)}
              </p>
              <p className="text-xs text-gray-400">
                Mã đơn hàng: {formatUuidWithPrefix(orders?.id, "ĐH-")}
              </p>
            </div>
            <div className="ml-6 mt-[-20px]">
              <h1 className="mt-2 text-lg text-gray-900">
                {orders?.restaurantName}
              </h1>
              <p className="text-sm text-gray-500">
                {orders?.orderDetails?.length} phần •{" "}
                {formatCurrency(orders.totalAmount)}
              </p>
            </div>
          </div>
          <TextButton
            name={orders?.status === "PENDING" ? "Hủy đơn hàng" : ""}
            className={`border border-${buttonColor}-700 px-4 py-2 rounded-lg font-medium text-sm transition`}
            onClick={()=>handleCancelModalOpen()}
          />
          <div className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
            {orderStatusMap[orders?.status]}
          </div>
        </div>

        <div className="mt-6 bg-[#dce9ff] px-6 py-3 text-sm font-semibold text-slate-700">
          {/* Đang xác nhận đơn hàng */}
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[2fr_1.2fr]">
          <section>
            <div className="space-y-4 rounded-2xl border border-slate-100 bg-white/80 p-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                {orders?.orderDetails?.map((item) => (
                  <div key={item.id} className="flex w-full gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.foodName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.foodName}
                        </p>
                        <p className="mt-1 text-gray-500">
                          {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                      <span className="text-gray-600">{item.quantity}x</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <ClipboardList className="h-4 w-4 text-sky-500" />
                  Trạng thái giao hàng
                </div>
                <p className="mt-2 text-slate-500">
                  Đơn hàng đang chờ nhà hàng xác nhận và chuẩn bị.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-100 bg-white/60 p-6">
            <div className="space-y-3 text-sm text-slate-600">
              {orders?.orderDetails?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <span>{item.foodName}</span>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(item.unitPrice)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(orders.deliveryFee)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>Trả qua {paymentMethodMap[1][orders.paymentMethod]}</span>
                <span>{formatCurrency(orders.totalAmount)}</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <CreditCard className="h-4 w-4 text-sky-500" />
                {orders?.paymentMethod === "CASH" ? (
                  <span>
                    Chuẩn bị tiền mặt đủ {formatCurrency(orders.totalAmount)}.
                  </span>
                ) : (
                  <span>
                    Thanh toán qua{" "}
                    {paymentMethodMap?.[1]?.[orders.paymentMethod] ||
                      orders.paymentMethod}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-white/80 p-6">
              <div className="grid gap-4 rounded-2xl bg-slate-50/80 px-6 py-4 text-sm text-slate-600 sm:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 text-center font-semibold text-slate-700">
                  <div>{orders.deliveryDistance} km</div>
                  <div className="text-xs font-medium text-slate-500">
                    Quãng đường
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 text-center font-semibold text-slate-700">
                  <div>
                    {calTime(orders.deliveryDistance).min} –{" "}
                    {calTime(orders.deliveryDistance).max}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Dự kiến giao hàng
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="h-full w-px bg-slate-200" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        Điểm giao hàng
                      </p>
                      <p className="text-sm text-slate-500">
                        {orders?.restaurantName}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-full w-px bg-slate-200" />
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <MapPin className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        Điểm nhận hàng
                      </p>
                      <p className="text-sm text-slate-500">
                        {orders?.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </section>
        </div>
        {isRatingModalOpen && <RatingModal onClose={handleRatingModalClose} />}
        {isCancelModalOpen && (
          <CancelOrderModal
            onClose={handleCancelModalClose}
            onSubmit={handleCancelOrder}
          />
        )}
      </div>
    </div>
  );
}
