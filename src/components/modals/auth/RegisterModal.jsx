import ModalWrapper from "../ModalWrapper";
import useRegister from "../../../hooks/auth/useRegister";

export default function RegisterModal({ onNext, onClose, email }) {
  const {
    name, setName,
    phone, setPhone,
    touched, setTouched,
    isFormValid,
    handleVerify,
    errors
  } = useRegister({ email, onNext });

  return (
    <ModalWrapper onClose={onClose} title="Hoàn tất việc đăng ký">
      <div className="flex flex-col gap-5 w-full mt-2">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Nhập họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all
              ${touched.name && errors.name ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
          />
          {touched.name && errors.name && (
            <span className="text-red-500 text-xs ml-1">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="tel"
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all
              ${touched.phone && errors.phone ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
          />
          {touched.phone && errors.phone && (
            <span className="text-red-500 text-xs ml-1">{errors.phone}</span>
          )}
        </div>

        <button
          disabled={!isFormValid}
          onClick={handleVerify}
          className={`w-full py-3 mt-1 rounded-xl text-white font-medium transition-all
            ${isFormValid    ? "bg-[#FFC40C] text-[#081F42] cursor-pointer"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
        >
          Xong
        </button>
      </div>
    </ModalWrapper>
  );
}