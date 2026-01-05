import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useEmail from "../../../../hooks/auth/restaurant/useEmail"

const Step1 = ({ formData, setFormData, setCurrentStep }) => {
  const navigate = useNavigate();
  const {localEmail , setLocalEmail, isValidEmail, loading, handleVerifyEmail} = useEmail();
  const goToLogin = () => navigate("/restaurant/login"); 
  const handleNext = async()=>{
    const result =  await handleVerifyEmail();

    if(!result.success){
      alert(result.message)
      return;
    }
    setFormData(pre =>({
      ...pre ,
      email:localEmail
    }));
     setCurrentStep(2);
  }
 
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col items-center justify-center">
            <div className="text-white text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold">Chính sách bảo mật</h2>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>Thông tin cá nhân được bảo mật tuyệt đối</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>Không chia sẻ dữ liệu với bên thứ ba</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>Mã hóa dữ liệu theo tiêu chuẩn quốc tế</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>Tuân thủ các quy định về bảo vệ dữ liệu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Đăng ký tài khoản mới
            </h1>
            <p className="text-gray-500 mb-8">Vui lòng nhập thông tin của bạn</p>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Số điện thoại
                </label>
                <div className="flex gap-2">
                  <div className="w-20 bg-gray-100 border border-gray-300 rounded-lg px-3 py-3 text-center font-medium">
                    +84
                  </div>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Ví dụ: abc@domain.com"
                  value={localEmail}
                  onChange={(e) =>setLocalEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                className={`w-full text-[15px] font-semibold py-3 rounded-lg transition-colors shadow-md
                  ${
                  isValidEmail
                    ? "bg-[#FFC40C] text-[#081F42] cursor-pointer hover:bg-[#ffce2b]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isValidEmail || loading}
                  onClick={handleNext}
              >
               {loading ? "Đang gửi OTP..." : "Tiếp tục"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Hoặc</span>
                </div>
              </div>

              <button
                onClick={goToLogin}
                className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition-colors"
              >
                Đăng nhập bằng tài khoản đã có
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;