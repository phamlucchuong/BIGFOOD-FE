import { useState } from "react";
import { sendOtp, verifyEmail } from "../../../api/auth/authApi";

export default function useEmail() {
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
      localStorage.setItem("email-verified", response.results);
      console.log("Email verification response:", response.results);
      if (!response.results) {
        return {
          success: false,
          message: "Email đẫ tồn tại"
        };
      } 
      await handleSendOtp();
      return {
        success : true
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      return {
        success: false,
        message: "Lỗi hệ thống"
      };
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
