import { useState, useEffect ,useRef } from "react";
import { sendOtp, verifyOtp } from "../../../api/auth/authApi";

export default function useOtpVerification(email) {
  const [values, setValues] = useState(["", "","", ""]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const inputRefs = useRef([]);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      console.log("OTP sent to", email);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleChange = async (index , value)=>{
        if(!/^[0-9]?$/.test(value)) return;
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

      if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleVerify = async () => {
    const otp = values.join("");
    console.log("Verifying OTP:", otp);
    try {
      const response = await verifyOtp(email, otp);
      if(response.results == false) {
        setSnackBarOpen(true);
        setSnackBarMessage("Mã OTP sai hoặc đã hết hạn!");
        setValues(["", "", "", ""]);
      }   
       return response;
    } catch {
      setSnackBarMessage("Mã OTP sai hoặc đã hết hạn!");
      setSnackBarOpen(true);
      setValues(["", "", "", ""]);
      setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }, 100);
    }
  };


  return {
    values,
    snackBarOpen,
    snackBarMessage,
    handleSendOtp,
    handleChange,
    handleVerify,
    inputRefs,
  };
}
