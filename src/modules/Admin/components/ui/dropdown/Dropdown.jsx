import React, { useEffect, useRef } from "react";

// Xóa định nghĩa interface DropdownProps

// Xóa khai báo kiểu React.FC<DropdownProps> và bỏ kiểu cho props
export const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  // Xóa khai báo kiểu <HTMLDivElement>(null)
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Xóa khai báo kiểu sự kiện (event: MouseEvent)
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        // Xóa khai báo kiểu 'as Node' và 'as HTMLElement'
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 right-0 mt-2 rounded-xl bg-[#1A2231] shadow-theme-lg border-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};