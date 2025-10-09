
import "react-phone-input-2/lib/style.css";
import "./EmailInputScreen.css";
import icon_email from "../../../assets/images/email.png";
import useEmail from "../../../hooks/auth/useEmail";
import ModalWrapper from "../ModalWrapper";

export default function EmailModal({ setEmail, onClose, onNext }) {
  const { localEmail, setLocalEmail, isValidEmail, loading, handleVerifyEmail } =
    useEmail({ onNext, setEmail });

  return (
    <ModalWrapper
      onClose={onClose}
      title="Khám phá ẩm thực cùng Be!"
      description="Đăng nhập/Đăng ký tài khoản be ngay bây giờ"
    >
      <div className="email-input-wrapper">
        <div className="phone-icon">
          <img id="vietnam-flag" src={icon_email} alt="email" />
          <span style={{ marginLeft: "5px" }}>Email</span>
        </div>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          className="custom-phone-input"
        />
      </div>

      <p className="agreement">
        Tôi đồng ý với <strong>Điều kiện &amp; Điều khoản</strong> và{" "}
        <strong>Hợp đồng vận chuyển</strong> của be
      </p>

      <button
        className={`next-btn ${isValidEmail ? "active" : ""}`}
        disabled={!isValidEmail || loading}
        onClick={handleVerifyEmail}
      >
        {loading ? "Đang xử lý..." : "Tiếp theo"}
      </button>
    </ModalWrapper>
  );
}
