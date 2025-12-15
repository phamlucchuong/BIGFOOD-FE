import { useRef, useState } from "react";
import { getAddressFromCoordinates, getCurrentPosition } from "../../../hooks/data/useGeolocation";

export default function LocationInput({ insideHeader }) {
  const [address, setAddress] = useState(""); 
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null); 

  // Cập nhật hàm xử lý khi nhập liệu
  const handleInputChange = (event) => {
    const value = event.target.value;
    setAddress(value); 
    setIsTyping(value.trim() !== "");
  };

  // Cập nhật hàm xử lý nút xóa
  const handleClearInput = () => {
    setAddress("");
    setIsTyping(false);
    inputRef.current.focus();
  };

const handleGetLocation = async () => {
    setAddress("Đang lấy vị trí...");
    try {
      const { latitude, longitude } = await getCurrentPosition();
      const locationName = await getAddressFromCoordinates(latitude, longitude);
      localStorage.setItem("user_address", locationName);
      localStorage.setItem("user_latitude", latitude);
      localStorage.setItem("user_longitude", longitude);
      setAddress(locationName);
      setIsTyping(locationName.trim() !== "");
    } catch (error) {
      setAddress(error);
      setIsTyping(false);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${insideHeader
        ? "w-full ml-6"
        : "mt-[60px] mb-[200px] ml-[250px]"
        }`}
    >
      {
        !insideHeader && <p className="text-2xl mb-7 font-medium">Địa chỉ bạn muốn giao món</p>
      }
      <div className="px-5 border border-gray-300 rounded-lg text-gray-500 focus-within:border-blue-700 w-[390px] flex items-center">
        {
          insideHeader && <span className="font-medium mr-1">GIAO TỚI</span>
        }

        <i className="fa-solid fa-location-dot"></i>

        <input
          ref={inputRef}
          value={address} 
          onChange={handleInputChange} 
          type="text"
          placeholder="Nhập địa chỉ của bạn"
          className="px-5 py-2 flex-1 outline-none"
        />

        {isTyping && (
          <i
            className="fa-solid fa-circle-xmark text-gray-700 mr-2 cursor-pointer"
            onClick={handleClearInput}
          ></i>
        )}

        <i 
            className="fa-solid fa-crosshairs cursor-pointer" 
            onClick={handleGetLocation} 
        ></i>
      </div>
    </div>
  );
}