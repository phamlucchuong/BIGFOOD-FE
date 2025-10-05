import { useState, useEffect, useRef } from "react";
import { setToken } from "../../services/localStorageService";

export function usePasswordInput({ email, onNextHome, onNextOtp }) {
  const [password, setPassword] = useState(["", "", "", "", "", ""]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (event, index) => {
    const newValues = [...password];
    newValues[index] = event.target.value.slice(-1);
    setPassword(newValues);

    if (event.target.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

 
  const handleSendOtp = async () => {
    await fetch(
      `http://localhost:8080/bigfood/api/otp/send/email?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    await onNextOtp();
  };

  useEffect(() => {
    const isFull = password.every((p) => p !== "");
    if (isFull) {
      handleVerify();
    }
  }, [password]);

  const handleVerify = async () => {
    const passwordString = password.join("");
    try {
      const response = await fetch("http://localhost:8080/bigfood/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: passwordString }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sai mật khẩu, vui lòng thử lại!");
      }

      setToken(data.results?.token);
      setSnackBarOpen(false);
      onNextHome();
    } catch (error) {
      setSnackBarMessage("Sai mật khẩu, vui lòng thử lại!");
      setSnackBarOpen(true);
      setPassword(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  return {
    password,
    handleChange,
    handleSendOtp,
    inputRefs,
    snackBarOpen,
    snackBarMessage,
  };
}
