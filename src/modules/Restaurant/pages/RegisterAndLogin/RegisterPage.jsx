import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Login from "./LoginPage";

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(45);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",

    businessType: "Doanh nghiệp",
    businessField: "",
    storeName: "",
    storeAddress: "",
    city: "Thành phố Hồ Chí Minh",
    district: "Quận 6",
    ward: "Phường 05",
    storePhone: "",
    storeEmail: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    bankBranch: "",
    bankCity: "Hồ Chí Minh",
  });

  return (
    <div>
      {currentStep === 1 && (
        <Step1 formData={formData} setFormData={setFormData} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          otpTimer={otpTimer}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      )}
      {currentStep === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === "login" && (
        <Login setCurrentStep={setCurrentStep} />
      )}
    </div>
  );
};

export default RegisterPage;
