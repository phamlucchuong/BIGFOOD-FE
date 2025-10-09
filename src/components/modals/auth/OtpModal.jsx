import { useRef } from "react";
import "./PasswordInputScreen.css";
import useOtpVerification from "../../../hooks/auth/useOtp";
import ModalWrapper from "../ModalWrapper";

export default function OtpModal({ onNext, onClose, email }) {
  const inputRefs = useRef([]);
  const {
    values,
    snackBarOpen,
    snackBarMessage,
    handleChange,
    handleSendOtp,
  } = useOtpVerification(email, onNext, inputRefs);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Nhập mã OTP"
      description={`Mã OTP được gửi tới email của bạn là  ${email}`}
    >
      <div className="password-boxes">
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="password"
            maxLength={1}
            value={value}
            onChange={(event) => handleChange(event, index)}
            className="password-input"
          />
        ))}
      </div>

      {snackBarOpen && (
        <div className="snackbar error">{snackBarMessage}</div>
      )}

      <a onClick={handleSendOtp} className="forgot-password">
        Gửi lại mã OTP
      </a>
    </ModalWrapper>
  );
}
