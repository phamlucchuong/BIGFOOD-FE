import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    name: "",
    password: "",
    confirmPassword:"",
    businessField: [],
    bankName: "",
    ccountNumber: "",
    accountName: "",
  });
      const goToLogin = () => navigate("/restaurant/login");
      const goToDashboard = () => navigate("/restaurant");
  return (
    <div>
      {currentStep === 1 && (
        <Step1 formData={formData} 
        setFormData={setFormData} 
        setCurrentStep={setCurrentStep}  
        goToLogin={goToLogin} />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          setCurrentStep={setCurrentStep}
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
          // setCurrentStep={setCurrentStep}
          // onSuccess={goToLogin}
        />
      )}

    </div>
  );
};

export default RegisterPage;
