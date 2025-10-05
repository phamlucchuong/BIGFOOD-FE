import { useState } from "react";
import Home from "../pages/Home/Home.jsx";
import EmailInputScreen from "../components/RegisterAndLogin/EmailInputScreen.jsx";
import PasswordInputScreen from "../components/RegisterAndLogin/PasswordInputScreen.jsx";
import OtpVerificationScreen from "../components/RegisterAndLogin/OtpVerificationScreen.jsx";
import CompletedRegisterScreen from "../components/RegisterAndLogin/CompletedRegisterScreen.jsx";

export default function ScreenRouter() {
  const [screen, setScreen] = useState("Home");
  const [email, setEmail] = useState("");

  switch (screen) {
    case "email":
      return (
        <EmailInputScreen
          onClose={() => setScreen("Home")}
          onNextPassword={() => setScreen("password")}
          onNextOtp={() => setScreen("otp")}
          setEmail={setEmail}
        />
      );
    case "password":
      return (
        <PasswordInputScreen
          email={email}
          onClose={() => setScreen("Home")}
          onNextHome={() => setScreen("Home")}
          onNextOtp={() => setScreen("otp")}
        />
      );
    case "otp":
      return (
        <OtpVerificationScreen
          email={email}
          onClose={() => setScreen("Home")}
          onNext={() => setScreen("completedRegister")}
        />
      );
    case "completedRegister":
      return (
        <CompletedRegisterScreen
          email={email}
          onClose={() => setScreen("Home")}
          onNext={() => setScreen("Home")}
        />
      );
    default:
      return (
        <Home
          onLoginClick={() => setScreen("email")}
          onNextPassword={() => setScreen("password")}
          onNextOtp={() => setScreen("otp")}
        />
      );
  }
}
