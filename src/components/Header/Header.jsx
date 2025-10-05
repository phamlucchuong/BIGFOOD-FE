
import {useEffect,  useState } from "react";
import IconButton from "../Buttons/IconButton";
import LocationInput from "../LocationInput/LocationInput";
import icon_avt from "../../assets/images/icon_avt.png"
import "./Header.css";
import { getToken , removeToken } from "../../services/localStorageService";

function Header({ isSticky, onToggleSearch ,onLoginClick     }) {
    // const [showSearchPopup, setShowSearchPopup] = useState(false)
    // const handleSearchPopup = () => {
    //     setShowSearchPopup(!showSearchPopup)
    // }
  const [token, setToken] = useState(null);
    useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []); 
  const handleLogout = () => {
    removeToken();
    setToken(null); // Cập nhật lại UI
  };

    return (
        <header className="header sticky top-0 z-50 flex items-center justify-between px bg-white shadow">
            <div className="flex items-center gap-1">
                <span className="left-section font-bold text-lg">beFood</span>

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
               {!token ? (
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
                <button onClick={handleLogout} className="btn w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                   <img src={icon_avt} alt="img" />
                </button>
                )}
            </div>
        </header>
    );
}

export default Header;
