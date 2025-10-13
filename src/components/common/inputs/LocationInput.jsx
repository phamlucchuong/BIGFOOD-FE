import { useRef, useState } from "react";

export default function LocationInput({ insideHeader }) {
  const inputRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false);

  const handleCloseBtn = () => {
    const value = inputRef.current.value
    setIsTyping(value.trim() !== "")
  }


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
          onChange={handleCloseBtn}
          type="text"
          placeholder="Nhập địa chỉ của bạn"
          className="px-5 py-2 flex-1 outline-none"
        />

        {isTyping && (
          <i
            className="fa-solid fa-circle-xmark text-gray-700 mr-2 cursor-pointer"
            onClick={() => {
              inputRef.current.value = "";
              setIsTyping(false);
            }}
          ></i>
        )}

        <i className="fa-solid fa-crosshairs cursor-pointer" onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("Vĩ độ:", position.coords.latitude);
              console.log("Kinh độ:", position.coords.longitude);
            },
            (error) => {
              console.error("Lỗi khi lấy vị trí:", error);
            }
          );
        }}></i>
      </div>
    </div>
  );
}
