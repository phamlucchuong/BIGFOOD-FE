
import ModalWrapper from "../ModalWrapper";
import useRegister from "../../../hooks/auth/useRegister";

export default function RegisterModal({ onNext, onClose, email }) {
  const {
    name, setName,
    phone, setPhone,
    touched, setTouched,
    isValidName,
    isValidPhone,
    isFormValid,
    handleVerify,
    errors
  } = useRegister({ email, onNext });

  return (
    <ModalWrapper onClose={onClose} title="Hoàn tất việc đăng ký">
    
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Nhập họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={`custom-input ${touched.name && errors.name ? "error" : ""}`}
        />
        {touched.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          type="tel"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          className={`custom-input ${touched.phone && errors.phone ? "error" : ""}`}
        />
        {touched.phone && errors.phone && (
          <span className="error-message">{errors.phone}</span>
        )}
      </div>

      <button
        className={`onNext ${isFormValid ? "active" : ""}`}
        disabled={!isFormValid}
        onClick={handleVerify}
      >
        Xong
      </button>
    </ModalWrapper>
  );
}
