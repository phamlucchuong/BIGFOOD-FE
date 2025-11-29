import React from "react";

const Step2 = ({ formData, setFormData, setCurrentStep, otpTimer }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => setCurrentStep(1)}
          className="mb-4 text-gray-600 hover:text-gray-800"
        >
          ← Quay lại
        </button>

        <h1 className="text-3xl font-bold text-center mb-8">
          Đăng ký tài khoản mới
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <p className="text-blue-800 font-semibold">Đã gửi mã OTP đến bạn</p>
          <p className="text-blue-600">
            Kiểm tra mã OTP từ{" "}
            <span className="font-semibold">@gmail.com</span> mà chúng tôi vừa
            gửi cho bạn
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">Mã OTP</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                className="flex-1 border border-blue-500 rounded px-4 py-3 focus:outline-none focus:border-blue-600"
              />

              <button className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded font-semibold whitespace-nowrap">
                Gửi lại OTP ({otpTimer < 10 ? "0" : ""}
                {otpTimer})
              </button>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(3)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded transition"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
