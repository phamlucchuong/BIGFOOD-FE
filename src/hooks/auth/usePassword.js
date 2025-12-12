import { useState, useEffect, useRef } from "react";
import { setToken } from "../../services/localStorageService";
import { login, sendOtp } from "../../api/auth/authApi";

export default function usePassword({ email, onNext, setPasswordGlobal, onClose }) {
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

  useEffect(() => {
    const isFull = password.every((p) => p !== "");
    if (isFull) {
      handleVerifyPassword();
    }
  }, [password]);

  const handleVerifyPassword = async () => {
    const passwordString = password.join("");
    try {
      if (localStorage.getItem("email-verified") !== "true") {
        const response = await login({ email, password: passwordString });
        if (response.ok) {
          setToken(response?.results?.token);
          setSnackBarOpen(false);
          console.log("Login success");
          onClose();
        }
        if (localStorage.getItem("email-verified") === "true") {
          const response = await login(email, passwordString);
          if (response.data.code == 1001) {
            setSnackBarMessage("Sai mật khẩu hoặc tài khoản chưa tồn tại!");
            setSnackBarOpen(true);
            setPassword(["", "", "", "", "", ""]);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
          } else {
            setToken(response.results?.token);
            setSnackBarOpen(false);
            console.log("Login success");
            onNext("home");
          }
        } else {
          setPasswordGlobal(passwordString);
          localStorage.setItem("password", passwordString);
          onNext("register");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }


    const handleSendOtp = async () => {
      try {
        await sendOtp(email);
        console.log("Otp sent for reset password");
        onNext("otp");
      } catch (err) {
        console.error("Error sending otp:", err);
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
}
