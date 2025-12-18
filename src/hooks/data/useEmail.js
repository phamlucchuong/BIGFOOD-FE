import { sendReport } from "../../api/auth/authApi";

export default function useEmail() {
  // const [ localEmail, setLocalEmail ] = useState("");
    const handleSendReport = async (email) => {
    try {
      await sendReport(email);
      console.log("Email report sent to", email);
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  return {handleSendReport};

}