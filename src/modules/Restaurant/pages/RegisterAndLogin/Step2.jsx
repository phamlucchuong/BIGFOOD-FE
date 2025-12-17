import React, { useState, useEffect } from "react";
import useOtpVerification from "../../../../hooks/auth/restaurant/useOtp";

const Step2 = ({ formData, setFormData, setCurrentStep }) => {
  const [otpTimer, setOtpTimer] = useState(60);

  const {
    values,
    snackBarOpen,
    snackBarMessage,
    handleChange,
    handleSendOtp,
    handleVerify,
    inputRefs
  } = useOtpVerification(formData.email);

 
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
      return () => clearTimeout(timer); 
    }
  }, [otpTimer]);

  const handleNext = async () => {
    const response = await handleVerify();
    if (response.results) {
      setCurrentStep(3);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return; 
    await handleSendOtp();
    setOtpTimer(60);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 md:p-12">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Đăng ký tài khoản mới
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Vui lòng nhập mã OTP để xác thực
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 font-semibold">Đã gửi mã OTP đến bạn</p>
          <p className="text-blue-600">
            Kiểm tra mã OTP tại email:
            <span className="font-semibold"> {formData.email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {values.map((val, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-12 border text-center rounded-lg text-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleResendOtp}
          disabled={otpTimer > 0}
          className={`px-6 py-3 rounded-lg font-semibold w-full mb-4 ${
            otpTimer > 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {otpTimer > 0 
            ? `Gửi lại (${otpTimer < 10 ? `0${otpTimer}` : otpTimer})` 
            : 'Gửi lại OTP'}
        </button>

        <button
          onClick={handleNext}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md"
        >
          Xác nhận OTP
        </button>

        {snackBarOpen && (
          <p className="text-red-500 text-center mt-4">{snackBarMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Step2;