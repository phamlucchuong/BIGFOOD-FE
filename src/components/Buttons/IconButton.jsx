
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
      className={`btn btn-${variant} ${size}  outline-none focus:outline-none active:opacity-70 px-[30px] py-[13px]`}
      onClick={onClick}
      disabled={disabled || loading}
      style={{color: color, backgroundColor: bgColor, margin: '0 10px', borderRadius: '8px'}}
    >
      {icon && iconPosition === "left" && <span className="btn-icon">{icon}</span>}
      {loading ? <span className="btn-loading">Loading...</span> : <span>{label}</span>}
    </button>
  );
}
