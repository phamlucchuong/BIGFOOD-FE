import { useState } from "react";
import { setToken } from "../../services/localStorageService";

export function useCompletedRegister({ email, onNext }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false, password: false });


  const isValidName =
    name.trim().length > 0 &&
    name.trim().length <= 40 &&
    /^[a-zA-ZÀ-ỹ\s]+$/.test(name.trim());
  const isValidPhone = /^[0-9]{9,10}$/.test(phone.trim());
  const isValidPassword = password.trim().length === 6;
  const isFormValid = isValidName && isValidPhone && isValidPassword;


  const handleVerifyLogin = async (email, password) => {
    const response = await fetch("http://localhost:8080/bigfood/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Lỗi không thể đăng nhập");
    setToken(data.results?.token);
    onNext();
  };


  const handleVerify = async () => {
    const response = await fetch(`http://localhost:8080/bigfood/api/users/verify-email/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.results === true) {
      handleUpdate();
    } else {
      handleSave();
    }
  };


  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/bigfood/api/users/${email}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await handleVerifyLogin(email, password);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      alert(error.message);
    }
  };


  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/bigfood/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await handleVerifyLogin(email, password);
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
      alert(error.message);
    }
  };

  return {
    name, setName,
    phone, setPhone,
    password, setPassword,
    touched, setTouched,
    isValidName,
    isValidPhone,
    isValidPassword,
    isFormValid,
    handleVerify,
  };
}
