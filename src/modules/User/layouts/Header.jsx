import { useEffect, useState } from "react";
import IconButton from "../../../components/common/buttons/IconButton";
import LocationInput from "../../../components/common/inputs/LocationInput";
import user_icon from "../../../assets/images/user_icon.png";
import { getToken } from "../../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";

function Header({ isSticky, onToggleSearch, onLoginClick }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);

  const handleLogout = async () => {
    setDropdown(false);
    await logout();
  };

  const handleItemDropdown = () => {
    setDropdown(true);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-[220px] py-[20px] bg-white shadow">
      <div className="flex items-center gap-1">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="left-section font-bold text-lg cursor-pointer"
        >
          beFood
        </span>

        {/* Nếu sticky thì input sẽ hiện trong header */}
        {isSticky && (
          <div className="px-2">
            <LocationInput insideHeader={true} />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <IconButton
          icon={<i className="fa fa-search"></i>}
          label="Tìm món ăn hoặc nhà hàng"
          variant="secondary"
          size="xl"
          color="#909AAA"
          bgColor="#F2F5F7"
          iconPosition="left"
          onClick={onToggleSearch}
        />
        {token === null ? (
          <IconButton
            icon={<i className="fa-solid fa-user"></i>}
            label="Đăng nhập/Đăng ký"
            variant="secondary"
            size="md"
            color={"#081F42"}
            bgColor="#FFC40C"
            iconPosition="left"
            onClick={onLoginClick}
          />
        ) : (
          // Nếu có token → hiển thị avatar
          <button
            onClick={handleItemDropdown}
            className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center"
          >
            <img src={user_icon} alt="img" className="p-[1px] rounded-[50%]" />
          </button>
        )}
        {dropdown && (
          <div className="absolute top-[70px] right-[220px] w-40 bg-white border border-gray-300 rounded-md shadow-lg p-3 w-48">
            <ul>
              <li
                className="py-1 text-gray-700 cursor-pointer"
                onClick={() => alert("nhà hàng yêu thích")}
              >
                Nhà hàng yêu thích
              </li>
              <li
                className="py-1 text-gray-700 cursor-pointer"
                onClick={() => {
                  setDropdown(false);
                  navigate("/order/all");
                }}
              >
                Lịch sử mua hàng
              </li>
              <li
                className="py-1 text-gray-700 cursor-pointer"
                onClick={handleLogout}
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
