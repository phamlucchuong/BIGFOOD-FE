import { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../../api/auth/authApi";

export default function useOtpVerification(email, onNext, inputRefs) {
  const [values, setValues] = useState(["", "", "", ""]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleChange = (event, index) => {
    const newValues = [...values];
    newValues[index] = event.target.value.slice(-1);
    setValues(newValues);

    if (event.target.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSendOtp = async () => {
    try {
        await sendOtp(email);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerify = async () => {
    const otp = values.join("");
    try {
      const response = await verifyOtp(email, otp);

      if (response.results !== true) throw new Error();
      onNext("password");
      
    } catch {
      setSnackBarMessage("Mã OTP sai hoặc đã hết hạn!");
      setSnackBarOpen(true);
      setValues(["", "", "", ""]);
      setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }, 100);
    }
  };

  useEffect(() => {
    const isFull = values.every((p) => p !== "");
    if (isFull) handleVerify();
  }, [values]);

  return {
    values,
    snackBarOpen,
    snackBarMessage,
    handleChange,
    handleSendOtp,
  };
}
