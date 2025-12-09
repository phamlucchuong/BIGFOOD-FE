import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Eye, EyeOff } from "lucide-react";
import usePassword from "../../../../hooks/auth/restaurant/usePassword";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const goToDashboard = () => navigate("/restaurant");
  const goToRegister = () => navigate("/restaurant/register"); 
  const { errors, apiError, handleVerifyLogin } = usePassword(
    undefined, 
    email, 
    "", 
    password, 
    goToDashboard
  );

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }
    await handleVerifyLogin();
  };
  const displayError = apiError || errors.email || errors.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Đăng nhập đối tác BeFood
        </h1>
        {displayError && (
          <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg text-center">
            {displayError}
          </div>
        )}

        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          className={`w-full p-3 mb-4 border rounded-lg ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-gray-700 mb-2">Mật khẩu</label>
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            className={`w-full p-3 border rounded-lg ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()} 
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
        >
          Đăng nhập
        </button>

        <button
          onClick={goToRegister}
          className="w-full mt-4 text-gray-600 hover:underline text-center"
        >
          Đăng ký tài khoản
        </button>
      </div>
    </div>
  );
};

export default Login;