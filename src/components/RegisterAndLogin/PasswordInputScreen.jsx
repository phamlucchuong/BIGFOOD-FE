import "./PasswordInputScreen.css";
import MainContent from "./MainContent";
import { usePasswordInput } from "./usePasswordInput";

export default function PasswordInputScreen({ onClose, onNextHome, onNextOtp, email }) {
  const {
    password,
    handleChange,
    handleSendOtp,
    inputRefs,
    snackBarOpen,
    snackBarMessage,
  } = usePasswordInput({ email, onNextHome, onNextOtp });

  return (
    <MainContent
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
      <a onClick={handleSendOtp} className="forgot-password">
        Quên mật khẩu
      </a>
    </MainContent>
  );
}
