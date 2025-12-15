import { useState } from "react";
import ModalWrapper from "../ModalWrapper";

export default function CancelOrderModal({ onClose, onSubmit }) {
    const [selectedReason, setSelectedReason] = useState("");
    const [otherReason, setOtherReason] = useState("");

    const reasons = [
        "Thay đổi địa chỉ giao hàng",
        "Thời gian giao hàng quá lâu",
        "Đặt nhầm món",
        "Không muốn đặt nữa",
    ];

    const handleSubmit = () => {
        const reason = selectedReason === "other" ? otherReason : selectedReason;
        onSubmit(reason);
        onClose();
    };

    return (
        <ModalWrapper
            title="Lý do hủy đơn hàng"
            description="Vui lòng chọn lý do hủy đơn hàng của bạn."
            onClose={onClose}
        >
            <div className="mt-4 space-y-2">
                {reasons.map((reason, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="radio"
                            id={`reason-${index}`}
                            name="cancel-reason"
                            value={reason}
                            checked={selectedReason === reason}
                            onChange={() => setSelectedReason(reason)}
                            className="mr-2"
                        />
                        <label htmlFor={`reason-${index}`} className="text-sm">
                            {reason}
                        </label>
                    </div>
                ))}
                <div className="flex items-center mt-2">
                    <input
                        type="radio"
                        id="reason-other"
                        name="cancel-reason"
                        value="other"
                        checked={selectedReason === "other"}
                        onChange={() => setSelectedReason("other")}
                        className="mr-2"
                    />
                    <label htmlFor="reason-other" className="text-sm">
                        Lý do khác
                    </label>
                </div>
                {selectedReason === "other" && (
                    <textarea
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Nhập lý do khác..."
                        className="mt-2 w-full rounded border-gray-300"
                        rows={3}
                    />
                )}
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
                    className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white"
                >
                    Xác nhận
                </button>
            </div>
        </ModalWrapper>
    );
}
