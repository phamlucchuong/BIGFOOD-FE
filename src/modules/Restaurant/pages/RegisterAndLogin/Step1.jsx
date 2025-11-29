import React from "react";

const Step1 = ({ formData, setFormData, setCurrentStep }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Đăng ký tài khoản mới
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">Số điện thoại</label>
            <div className="flex gap-2">
              <div className="w-20 bg-gray-100 border border-gray-300 rounded px-3 py-3 text-center">
                +84
              </div>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="Ví dụ: abc@domain.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded transition"
          >
            Tiếp tục
          </button>

          <div className="text-center">
            <span className="text-gray-500">Hoặc</span>
          </div>

          <button   onClick={() => setCurrentStep("login")} className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded transition">
            Đăng nhập bằng tài khoản đã có
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
