import { useState } from "react";
import { sendOtp, verifyEmail } from "../../api/auth/authApi";

export default function useEmail({ onNext, setEmail }) {
  const [localEmail, setLocalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await sendOtp(localEmail);
      console.log("OTP sent to", localEmail);
    } catch (err) {
      console.error("Error sending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const response = await verifyEmail(localEmail);

      // cập nhật email lên AuthModalManager
      setEmail(localEmail);
      localStorage.setItem("email-verified", response.results);
      console.log("email-verified: ", response.results);

      if (response.results === true) {
        onNext("password");
      } else {
        await handleSendOtp();
        onNext("otp");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    localEmail,
    setLocalEmail,
    isValidEmail,
    loading,
    handleVerifyEmail,
  };
}
