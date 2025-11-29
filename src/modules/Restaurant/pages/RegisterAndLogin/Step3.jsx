import React from "react";
import { Eye, EyeOff } from "lucide-react";

const Step3 = ({
  formData,
  setFormData,
  setCurrentStep,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl border-2 border-blue-500 rounded-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-yellow-400 rounded"></div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Đăng ký trở thành đối tác
        </h1>

        <div className="space-y-6">
          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-4 py-3 pr-12 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-gray-700 mb-2">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-4 py-3 pr-12 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded transition"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
