import { useState, useEffect } from "react";

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
    await fetch(
      `http://localhost:8080/bigfood/api/otp/send/email?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleVerify = async () => {
    const otp = values.join("");
    try {
      const response = await fetch(
        `http://localhost:8080/bigfood/api/otp/verify?key=${encodeURIComponent(email)}&otp=${otp}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.results !== true) throw new Error();
      onNext();
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
