import "./CompletedRegisterScreen.css";
import MainContent from "./MainContent";
import { useCompletedRegister } from "./useCompletedRegister";

export default function CompletedRegisterScreen({ onNext, onClose, email }) {
  const {
    name, setName,
    phone, setPhone,
    password, setPassword,
    touched, setTouched,
    isValidName,
    isValidPhone,
    isValidPassword,
    isFormValid,
    handleVerify,
  } = useCompletedRegister({ email, onNext });

  return (
    <MainContent onClose={onClose} title="Hoàn tất việc đăng ký">
      <div className="name-input-wrapper">
        <input
          type="text"
          placeholder="Nhập họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched({ ...touched, name: true })}
          className={`custom-input ${touched.name && !isValidName ? "error" : ""}`}
        />
        {touched.name && !isValidName && (
          <span className="error-message">
            Tên không được vượt quá 40 ký tự và không chứa số, ký tự đặc biệt
          </span>
        )}
      </div>

    
      <div className="phone-input-wrapper">
        <input
          type="tel"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched({ ...touched, phone: true })}
          className={`custom-input ${touched.phone && !isValidPhone ? "error" : ""}`}
        />
      </div>
      {touched.phone && !isValidPhone && (
        <span className="error-message">Số điện thoại phải có 9-10 chữ số</span>
      )}

  
      <div className="password-input-wrapper">
        <input
          type="text"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
          className={`custom-input ${touched.password && !isValidPassword ? "error" : ""}`}
        />
      </div>
      {touched.password && !isValidPassword && (
        <span className="error-message">Mật khẩu phải bằng 6 kí tự</span>
      )}

    
      <button
        className={`onNext ${isFormValid ? "active" : ""}`}
        disabled={!isFormValid}
        onClick={handleVerify}
      >
        Xong
      </button>
    </MainContent>
  );
}
