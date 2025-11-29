import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ setCurrentStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }


    console.log("Đăng nhập:", { email, password });

    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Đăng nhập đối tác BeFood
        </h1>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      
        <label className="block text-gray-700 mb-2">Mật khẩu</label>
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            className="w-full p-3 border rounded-lg"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff /> : <Eye />}
          </div>
        </div>

   
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
        >
          Đăng nhập
        </button>

     
        <button
          onClick={() => setCurrentStep(1)}
          className="w-full mt-4 text-gray-600 hover:underline text-center"
        >
          ← Quay lại đăng ký
        </button>
      </div>
    </div>
  );
};

export default Login;
