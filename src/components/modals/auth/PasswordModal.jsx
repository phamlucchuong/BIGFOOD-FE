import ModalWrapper from "../ModalWrapper";
import usePassword from "../../../hooks/auth/usePassword";

export default function PasswordModal({
  email,
  setPasswordGlobal,
  onClose,
  onNext,
}) {
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
      <div className="flex gap-2.5 mt-5 mb-2">
        {password.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="password"
            maxLength={1}
            value={value}
            onChange={(event) => handleChange(event, index)}
            className="w-10 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg outline-none transition-colors hover:border-[#1a73e8] focus:border-[#1a73e8]"
          />
        ))}
      </div>

      {snackBarOpen && (
        <div className="text-red-500 text-sm font-medium mt-1">
          {snackBarMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleSendOtp}
        className="block mt-10 text-[#1a73e8] text-[15px] font-medium hover:underline cursor-pointer"
      >
        Quên mật khẩu
      </button>
    </ModalWrapper>
  );
}
