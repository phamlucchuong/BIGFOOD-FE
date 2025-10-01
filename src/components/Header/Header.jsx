
import IconButton from "../Buttons/IconButton";
import LocationInput from "../LocationInput/LocationInput";
import "./Header.css";

function Header({ isSticky }) {
    return (
        <header className="header sticky top-0 z-50 flex items-center justify-between px-4 bg-white shadow">
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
                    onClick={() => console.log("Search clicked")}
                />
                <IconButton
                    icon={<i className="fa fa-user"></i>}
                    label="Đăng nhập/Đăng ký"
                    variant="secondary"
                    size="md"
                    color={"#081F42"}
                    bgColor="#FFC40C"
                    iconPosition="left"
                    onClick={() => console.log("Login clicked")}
                />
            </div>
        </header>
    );
}

export default Header;
