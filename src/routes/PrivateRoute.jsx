import { Navigate } from "react-router-dom";

/**
 * Hàm kiểm tra trạng thái đăng nhập.
 * Trong ứng dụng thực tế, bạn sẽ kiểm tra token, thông tin user trong Redux/Context...
 * @returns {boolean}
 */
const isAuthenticated = () => {
  // Ví dụ: kiểm tra sự tồn tại của token trong localStorage
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
};

export default PrivateRoute;