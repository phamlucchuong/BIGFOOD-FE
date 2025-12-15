import { useState } from "react";
import ModalWrapper from "../ModalWrapper";

export default function RatingModal({ onClose }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        console.log("Rating:", rating);
        console.log("Comment:", comment);
        onClose();
    };

    return (
        <ModalWrapper
            title="Đánh giá của bạn"
            description="Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! Vui lòng cho chúng tôi biết trải nghiệm của bạn."
            onClose={onClose}
        >
            <div className="mt-4">
                <label className="block text-sm font-medium">Số sao</label>
                <div className="flex items-center gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl ${
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
                    className="mt-1 w-full rounded border-gray-300"
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
