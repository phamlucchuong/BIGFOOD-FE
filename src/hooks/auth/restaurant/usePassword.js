import { useState, useMemo } from "react";
import { setToken } from "../../../services/localStorageService";
import { login, verifyEmail , register } from "../../../api/auth/authApi";

export default function usePassword(name, email, phone, password, onNext) {
  const [touched, setTouched] = useState({ 
    name: false,
    password: false 
  });
  
  const [apiError, setApiError] = useState("");
  const errors = useMemo(() => {
    const errs = {};
    
    if (name !== undefined) {
      if (!name || !name.trim()) {
        errs.name = "Vui lòng nhập tên";
      } else if (!/^[a-zA-ZÀ-ỹ\s]{1,40}$/.test(name.trim())) {
        errs.name = "Tên không hợp lệ (tối đa 40 ký tự, không chứa số/ký tự đặc biệt)";
      }
    }
    
    if (!email || !email.trim()) {
      errs.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Email không hợp lệ";
    }
    
  
    if (!password) {
      errs.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 8) {
      errs.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    
    return errs;
  }, [name, email, password]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleVerifyLogin = async () => {
    try {
      setApiError(""); 
      const response = await login({email, password});
      if (response.results?.token) {
        setToken(response.results.token);
        onNext();
        return true;
      } else {
        setApiError(response.message || "Đăng nhập thất bại");
        return false;
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setApiError(error.response?.data?.message || "Lỗi kết nối server");
      return false;
    }
  };
 
  const handleRegister = async () => {
       const response = await register(email, name, phone, password);
       if (response.ok) {
          await handleVerifyLogin();
       }else{
        setApiError(response.message || "Đăng ký thất bại");
        return false;
       }
      
  }
  return {
    touched, 
    setTouched,
    isFormValid,
    errors,
    apiError, 
    setApiError,
    handleVerifyLogin,
    handleRegister,
  };
}