import { useState } from "react";
import ModalWrapper from "../ModalWrapper";

export default function RatingModal({
  currentRating,
  currentReview,
  onClose,
  onSubmit,
}) {
  const [rating, setRating] = useState(currentRating || 0);
  const [comment, setComment] = useState(currentReview || "");

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    onSubmit(rating, comment);
    onClose();
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <ModalWrapper
      title="Đánh giá của bạn"
      description="Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! Vui lòng cho chúng tôi biết trải nghiệm của bạn."
      onClose={onClose}
    >
      <div className="mt-4">
        {/* <label className="block text-sm font-medium">Số sao</label> */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {stars.map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-[50px] ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">Bình luận</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 w-full text-sm rounded border border-gray-300 outline-none p-2 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          rows={4}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onClose}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Gửi
        </button>
      </div>
    </ModalWrapper>
  );
}
