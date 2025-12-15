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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nhập họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={`w-full px-3 py-2 border rounded-md text-sm outline-none 
            ${
              touched.name && errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-400"
            }`}
        />
        {touched.name && errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="tel"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          className={`w-full px-3 py-2 border rounded-md text-sm outline-none 
            ${
              touched.phone && errors.phone
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-400"
            }`}
        />
        {touched.phone && errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      <button
        disabled={!isFormValid}
        onClick={handleVerify}
        className={`w-full py-3 rounded-md text-sm font-medium transition 
          ${
            isFormValid
              ? "bg-yellow-400 text-[#081F42] cursor-pointer hover:bg-yellow-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Xong
      </button>
    </ModalWrapper>
  );
}
