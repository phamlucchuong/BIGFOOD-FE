import { removeToken } from "../../services/localStorageService";
import { logoutWithToken } from "../../api/auth/authApi";

export default function useAuth() {
  const logout = async () => {
    try {
        await logoutWithToken();
    } catch (error) {
        console.error("Logout failed:", error);
    }
    removeToken();
  };

  return { logout };
}
