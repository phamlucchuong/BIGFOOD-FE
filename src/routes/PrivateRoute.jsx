import { Navigate } from "react-router-dom";

/**
 * Hàm kiểm tra trạng thái đăng nhập.
 * Trong ứng dụng thực tế, bạn sẽ kiểm tra token, thông tin user trong Redux/Context...
 * @returns {boolean}
 */
const isAuthenticated = () => {
  // Ví dụ: kiểm tra sự tồn tại của authToken trong localStorage
  return localStorage.getItem("authToken") !== null;
};

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;