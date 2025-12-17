import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import usePassword from "../../../../hooks/auth/restaurant/usePassword";

const Step3 = ({
  formData,
  setFormData,
  setCurrentStep,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    touched, 
    setTouched,
    isFormValid,
    errors,
    handleRegister,
  } = usePassword(
    formData.name, 
    formData.email, 
    formData.phone, 
    formData.password,
    () => setCurrentStep(4)
  );

  const handleNext = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu không trùng khớp");
      return;
    }

    if (!isFormValid) {
      setErrorMessage("Vui lòng kiểm tra lại thông tin");
      setTouched({ name: true, password: true });
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      await handleRegister();
    } catch (error) {
      setErrorMessage(error.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Đăng ký trở thành đối tác
        </h1>
        <p className="text-gray-500 text-center mb-8">Tạo mật khẩu bảo mật cho tài khoản</p>
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tên</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setTouched({ ...touched, name: true });
                }}
                onBlur={() => setTouched({ ...touched, name: true })}
                className={`w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:border-transparent ${
                  touched.name && errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setTouched({ ...touched, password: true });
                }}
                onBlur={() => setTouched({ ...touched, password: true })}
                className={`w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:border-transparent ${
                  touched.password && errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </button>
            </div>
            {touched.password && errors.password ? (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            ) : (
              <p className="text-sm text-gray-500 mt-1"></p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {/* {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </button>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isLoading}
            className={`w-full font-semibold py-3 rounded-lg transition-colors shadow-md ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {isLoading ? "Đang xử lý..." : "Tiếp tục"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;