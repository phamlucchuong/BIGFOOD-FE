import React from "react";
import ModalWrapper from "../ModalWrapper";

export default function ReviewModal({ reviews, onClose }) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Đánh giá cửa hàng</h2>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">{review.user}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-yellow-500">
                  {"★".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có đánh giá nào.</p>
        )}
      </div>
    </ModalWrapper>
  );
}
