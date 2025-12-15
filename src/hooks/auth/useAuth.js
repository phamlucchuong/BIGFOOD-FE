import { removeToken } from "../../services/localStorageService";
import { logoutUser } from "../../api/auth/authApi";

export default function useAuth() {
  const logout = async () => {
    try {
        await logoutUser();
    } catch (error) {
        console.error("Logout failed:", error);
    }
    removeToken();
  };

  return { logout };
}
