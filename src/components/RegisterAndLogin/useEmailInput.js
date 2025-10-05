import { useState } from "react";

export function useEmailInput({ onNextPassword, onNextOtp, setEmail }) {
  const [localEmail, setLocalEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail);

  const handleSendOtp = async () => {
    await fetch(
      `http://localhost:8080/bigfood/api/otp/send/email?email=${encodeURIComponent(localEmail)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/bigfood/api/users/verify-email/${localEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setEmail(localEmail);

      if (data.results === true) {
        onNextPassword();
      } else {
        await handleSendOtp();
        onNextOtp();
      }
    } catch (error) {
      console.error("Lỗi khi xác minh email:", error);
      alert("Có lỗi xảy ra khi kiểm tra email. Vui lòng thử lại!");
    }
  };

  return {
    localEmail,
    setLocalEmail,
    isValidEmail,
    handleVerifyEmail,
  };
}
