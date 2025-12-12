import { useState, useMemo } from "react";
import { setToken } from "../../services/localStorageService";
import { login, register, updateAccount, verifyEmail } from "../../api/auth/authApi";

export default function useRegister({ email, onNext }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const password = localStorage.getItem("password") || "";
  const [touched, setTouched] = useState({ name: false, phone: false });

  const errors = useMemo(() => {
    const errs = {};
    if (!/^[a-zA-ZÀ-ỹ\s]{1,40}$/.test(name.trim())) {
      errs.name = "Tên không hợp lệ (tối đa 40 ký tự, không chứa số/ký tự đặc biệt)";
    }
    if (!/^[0-9]{9,10}$/.test(phone.trim())) {
      errs.phone = "Số điện thoại phải có 9-10 chữ số";
    }
    return errs;
  }, [name, phone]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleVerifyLogin = async () => {
    const response = await login({email, password});
    setToken(response.results?.token);
    onNext('/');
  };

  const handleUpdate = async () => {
    await updateAccount(email, name, phone, password);
    await handleVerifyLogin();
  };

  const handleRegister = async () => {
    await register(email, name, phone, password);
    await handleVerifyLogin();
  };

  const handleVerify = async () => {
    try {
      const response = await verifyEmail(email);
      if (!response.results) {
        await handleUpdate();
      } else {
        await handleRegister();
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký/cập nhật:", error);
      alert(error.message);
    }
  };

  return {
    name, setName,
    phone, setPhone,
    touched, setTouched,
    isFormValid,
    errors,
    handleVerify,
  };
}
