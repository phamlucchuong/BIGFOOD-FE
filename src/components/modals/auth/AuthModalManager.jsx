
import { useState } from "react";
import EmailModal from "./EmailModal";
import OtpModal from "./OtpModal";
import PasswordModal from "./PasswordModal";
import RegisterModal from "./RegisterModal";


function setModal(screen, setScreen, authData, setAuthData, onClose) {
    switch (screen) {
        case "email":
            return (
                <EmailModal
                    setEmail={(email) => setAuthData((prev) => ({ ...prev, email }))}
                    onClose={onClose}
                    onNext={(next) => setScreen(next)}
                />
            );
        case "otp":
            return (
                <OtpModal
                    email={authData.email}
                    onNext={(next) => setScreen(next)}
                    onClose={onClose}
                />
            );
        case "password":
            return (
                <PasswordModal
                    email={authData.email}
                    setPasswordGlobal={(password) =>
                        setAuthData((prev) => ({ ...prev, password }))
                    }
                    onClose={onClose}
                    onNext={(next) => setScreen(next)}
                />
            );
        case "register":
            return (
                <RegisterModal
                    email={authData.email}
                    password={authData.password}
                    onClose={onClose}
                    onNext={onClose}
                />
            );
    }
}


export default function AuthModalManager({ onClose }) {
    const [screen, setScreen] = useState("email");
    const [authData, setAuthData] = useState({ email: "", password: "" });

    return setModal(screen, setScreen, authData, setAuthData, onClose);
}