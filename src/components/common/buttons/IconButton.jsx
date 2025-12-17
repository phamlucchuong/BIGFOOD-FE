
import React from "react";

export default function IconButton({
  icon,
  label,
  onClick,
  variant = "primary",
  size,
  color,
  bgColor,
  iconPosition = "left",
  disabled = false,
  loading = false,
}) {
  return (
    <button
      className={`btn btn-${variant} ${size} text-sm mx-[10px] rounded-[8px]  outline-none focus:outline-none active:opacity-70 px-[20px] py-[8px]`}
      onClick={onClick}
      disabled={disabled || loading}
      style={{color: color,backgroundColor: bgColor}}
    >
      {icon && iconPosition === "left" && <span className="btn-icon mr-2">{icon}</span>}
      {loading ? <span className="btn-loading">Loading...</span> : <span>{label}</span>}
    </button>
  );
}
