import ModalWrapper from "../ModalWrapper";
import useRegister from "../../../hooks/auth/useRegister";

export default function RegisterModal({ onNext, onClose, email }) {
  const {
    name,
    setName,
    phone,
    setPhone,
    touched,
    setTouched,
    isFormValid,
    handleVerify,
    errors,
  } = useRegister({ email, onNext });

  return (
    <ModalWrapper onClose={onClose} title="Hoàn tất việc đăng ký">
    
      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Nhập họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={`w-full px-3 py-3 text-[15px] border rounded-lg outline-none transition-all duration-200 ${
            touched.name && errors.name
              ? "border-red-500"
              : "border-gray-300 focus:border-[#ffb400] focus:ring-2 focus:ring-[#ffb400]/20"
          }`}
        />
        {touched.name && errors.name && (
          <span className="text-red-500 text-[13px] mt-1">{errors.name}</span>
        )}
      </div>

    
      <div className="flex flex-col mb-4">
        <input
          type="tel"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          className={`w-full px-3 py-3 text-[15px] border rounded-lg outline-none transition-all duration-200 ${
            touched.phone && errors.phone
              ? "border-red-500"
              : "border-gray-300 focus:border-[#ffb400] focus:ring-2 focus:ring-[#ffb400]/20"
          }`}
        />
        {touched.phone && errors.phone && (
          <span className="text-red-500 text-[13px] mt-1">{errors.phone}</span>
        )}
      </div>

 
      <button
        disabled={!isFormValid}
        onClick={handleVerify}
        className={`w-full mt-2 rounded-lg py-3 text-[16px] font-medium transition-colors duration-200 ${
          isFormValid
            ? "bg-[#ffb400] text-[#081F42] cursor-pointer"
            : "bg-gray-300 text-white cursor-not-allowed"
        }`}
      >
        Xong
      </button>
    </ModalWrapper>
  );
}
