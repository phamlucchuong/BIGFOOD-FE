import "@fortawesome/fontawesome-free/css/all.min.css";
import { ClipboardList, CreditCard, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TextButton from "../../../components/common/buttons/TextButton";
import CancelOrderModal from "../../../components/modals/common/CancelOrderModal";
import RatingModal from "../../../components/modals/common/RatingModal";
import useOrder from "../../../hooks/data/useOrder";
import useReview from "../../../hooks/data/useReview";
import {
  calculateDeliveryTime,
  formatISOToReadable,
} from "../../../utils/dateTimeFormatUtils";
import { formatCurrency } from "../../../utils/moneyFormatUtils";
import {
  orderStatusMapper,
  paymentMethodMapper,
} from "../../../utils/statusMapperUtils";
import { formatUuidWithPrefix } from "../../../utils/uuidFormatUtils";

export default function OrderDetail() {
  const { orders, getOrder, cancelOrder } = useOrder();
  const { createReview, updateReview } = useReview();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    reviewText: "",
    lastUpdateAt: null,
    replyText: "",
    replyAt: null,
  });
  const [reason, setReason] = useState("");

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

  useEffect(() => {
    if (!orderId) return;
    getOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    if (orders?.review) {
      handleFetchReview();
      handleFetchReason();
    }
  }, [orders]);

  const handleCancelOrder = async (reason) => {
    console.log("Hủy đơn hàng với lý do: ", reason);
    const request = {
      status: "CANCELLED",
      reason: reason,
    };
    const result = await cancelOrder(orderId, request);
    if (result) {
      await getOrder(orderId, reason);
    }
  };

  const handleFetchReview = () => {
    setReview({
      rating: orders.review.rating,
      reviewText: orders.review.reviewText,
      lastUpdateAt: orders.review.lastUpdateAt,
      replyText: orders.review.replyText,
      replyAt: orders.review.replyAt,
    });
  };

  const handleFetchReason = () => {
    setReason(
      orders.status === "CANCELLED" ? orders.cancelReason : orders.rejectReason
    );
  };

  const handleReview = async (rating, comment) => {
    const reviewData = {
      rating,
      reviewText: comment,
    };

    if (orders?.review?.id) {
      await updateReview(orderId, reviewData);
    } else {
      await createReview(orderId, reviewData);
    }

    await getOrder(orderId);
  };


  const status = {
    PENDING: "Đơn hàng đang chờ nhà hàng xác nhận và chuẩn bị.",
    CONFIRMED: "Đơn hàng đã được xác nhận và đang tiến hành chuẩn bị.",
    PREPARING: "Đơn hàng đang được đầu bếp chuẩn bị.",
    DELIVERING: "Đơn hàng đang được giao tới quý khách, hãy chú ý điện thoại để không bỏ lỡ cuộc gọi từ nhân viên giao hàng.",
    COMPLETED: "Đơn hàng đã hoàn thành, cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi.",
    CANCELLED: "Đơn hàng đã được hủy bởi khách hàng.",
    REJECTED: "Đơn hàng bị nhà hàng từ chối.",
  }

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

          {orders.status === "PENDING" && (
            <TextButton
              name={"Hủy đơn hàng"}
              onClick={handleCancelModalOpen}
              className="border border-red-500 text-red-700 px-4 py-2 rounded-lg font-medium text-sm transition hover:scale-105"
            />
          )}
          {orders.status === "COMPLETED" && orders?.review?.id == null && (
            <TextButton
              name={"Đánh giá"}
              onClick={handleRatingModalOpen}
              className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg font-medium text-sm transition hover:scale-105"
            />
          )}
          {(orders.status === "CANCELLED" ||
            orders.status == "REJECTED" ||
            (orders.status === "COMPLETED" && orders?.review?.id != null)) && (
            <TextButton
              name={"Đặt lại"}
              onClick={handleRatingModalOpen}
              className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition hover:scale-105"
            />
          )}

          <div
            className={`rounded-full border border-slate-200 px-5 py-2 text-xs font-semibold uppercase tracking-wide cursor-default
            ${orderStatusMapper[orders?.status]?.color}`}
          >
            {orderStatusMapper[orders?.status]?.text}
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
                  Trạng thái đơn hàng
                </div>
                <p className="mt-2 text-slate-500">
                  {status[orders.status]}
                </p>
              </div>
            </div>
            {/* đánh giá đơn hàng */}
            <div className="relative space-y-4 rounded-2xl border border-slate-100 bg-white/80 p-6 mt-4">
              {orders?.review?.id && (
                <div className="">
                  <div
                    onClick={handleRatingModalOpen}
                    className="absolute top-0 right-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-pencil text-gray-500 text-xs hover:text-red-500 transition-transform"></i>
                  </div>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`text-[50px] ${
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-sm text-gray-700">
                      {review?.lastUpdateAt
                        ? formatISOToReadable(review.lastUpdateAt)
                        : ""}
                    </span>
                  </div>
                  <p className="mt-6 text-gray-700">{review.reviewText}</p>

                  {/* trả lời bình luận của nhà hàng */}
                  {review.replyText && (
                    <div className="mt-6">
                      <span className="text-sm text-gray-700">
                        {review?.replyAt
                          ? formatISOToReadable(review.replyAt)
                          : ""}
                      </span>
                      <div className="flex justify-end mt-2">
                        <p className="mt-6 text-gray-700">{review.replyText}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(orders.status == "CANCELLED" ||
                orders.status == "REJECTED") && (
                <>
                  <div className="">
                    <h3
                      className={`text-lg font-semibold text-${
                        orders.status == "CANCELLED" ? "orange" : "red"
                      }-600`}
                    >
                      Lý do {orders.status == "CANCELLED" ? "hủy" : "từ chối"}{" "}
                      đơn hàng:
                    </h3>
                    <p className="mt-2 text-gray-700">{reason}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    Vào lúc: {formatISOToReadable(orders.lastUpdateAt)}
                  </span>
                </>
              )}
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
                <span>
                  Trả qua {paymentMethodMapper[1][orders.paymentMethod]}
                </span>
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
                    {paymentMethodMapper?.[1]?.[orders.paymentMethod] ||
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
                    {calculateDeliveryTime(orders.deliveryDistance).min} –{" "}
                    {calculateDeliveryTime(orders.deliveryDistance).max}
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
        {isRatingModalOpen && (
          <RatingModal
            currentRating={review.rating}
            currentReview={review.reviewText}
            onClose={handleRatingModalClose}
            onSubmit={handleReview}
          />
        )}
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
