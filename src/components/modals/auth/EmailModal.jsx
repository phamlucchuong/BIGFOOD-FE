import { useState } from "react";
import icon_email from "../../../assets/images/email.png";
import useEmail from "../../../hooks/auth/useEmail";
import ModalWrapper from "../ModalWrapper";

export default function EmailModal({ setEmail, onClose, onNext }) {
  const { localEmail, setLocalEmail, isValidEmail, loading, handleVerifyEmail } =
    useEmail({ onNext, setEmail });

  const [agreed, setAgreed] = useState(false);
  const canProceed = isValidEmail && agreed && !loading;

  return (
    <ModalWrapper
      onClose={onClose}
      title="Khám phá ẩm thực cùng Be!"
      description="Đăng nhập/Đăng ký tài khoản be ngay bây giờ"
    >
      <div className="flex items-center gap-2 my-4">
        <div className="flex items-center w-[90px] h-[35px] border border-gray-300 rounded-md bg-gray-50">
          <img
            id="vietnam-flag"
            src={icon_email}
            alt="email"
            className="w-[25px] h-[20px] ml-2 object-cover"
          />
          <span className="ml-1 text-sm font-medium">Email</span>
        </div>

        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          className="flex-1 w-[380px] h-[35px] border-2 border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:border-[#669CF1]"
        />
      </div>

      <label className="flex items-start gap-2 mt-3 text-[13px] text-[#2D415E] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-[2px] w-4 h-4 border-gray-400 rounded focus:ring-0 accent-[#FFC40C] cursor-pointer"
        />
        <span>
          Tôi đồng ý với{" "}
          <strong className="font-semibold text-[13px] text-[#2E85F7] mx-1">
            Điều kiện &amp; Điều khoản
          </strong>
          và{" "}
          <strong className="font-semibold text-[13px] text-[#2E85F7] mx-1">
            Hợp đồng vận chuyển
          </strong>{" "}
          của be
        </span>
      </label>

      <button
        className={`w-full py-3 mt-5 rounded-md text-[15px] font-medium transition ${
          canProceed
            ? "bg-[#FFC40C] text-[#081F42] cursor-pointer"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!canProceed}
        onClick={handleVerifyEmail}
      >
        {loading ? "Đang xử lý..." : "Tiếp theo"}
      </button>
    </ModalWrapper>
  );
}
