import { removeToken } from "../../services/localStorageService";
import { login, logoutWithToken } from "../../api/auth/authApi";
import { setToken } from "../../services/localStorageService";
export default function useAuth() {

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const resposne = await login({email, password});
      if(resposne.ok) {
        // Lưu token vào localStorage
        const token = resposne.results.token;
        console.log("Received token:", token);
        setToken(token);
      }
    } catch (error) {
      onsole.error("Logout failed:", error);
    }
  }



  const logout = async () => {
    try {
        await logoutWithToken();
    } catch (error) {
        console.error("Logout failed:", error);
    }
    removeToken();
  };

  return { loginWithEmailAndPassword, logout };
}
