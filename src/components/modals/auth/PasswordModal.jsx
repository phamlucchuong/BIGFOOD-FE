
import "./PasswordInputScreen.css";
import ModalWrapper from "../ModalWrapper";
import usePassword from "../../../hooks/auth/usePassword";

export default function PasswordModal({ email, setPasswordGlobal, onClose, onNext }) {
  const {
    password,
    handleChange,
    handleSendOtp,
    inputRefs,
    snackBarOpen,
    snackBarMessage,
  } = usePassword({ email, onNext, setPasswordGlobal });

  return (
    <ModalWrapper
      onClose={onClose}
      title="Nhập mật khẩu"
      description={`Bạn đang đăng nhập với email: ${email}`}
    >
      <div className="password-boxes">
        {password.map((value, index) => (
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

      {snackBarOpen && <div className="snackbar error">{snackBarMessage}</div>}

      <a onClick={handleSendOtp} className="forgot-password cursor-pointer">
        Quên mật khẩu
      </a>
    </ModalWrapper>
  );
}
