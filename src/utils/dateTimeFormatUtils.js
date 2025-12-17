/**
 * Format Date object hoặc timestamp thành chuỗi ISO datetime (không timezone)
 * @param {Date|string|number} date - Date object, ISO string, hoặc timestamp
 * @returns {string} Chuỗi datetime dạng "YYYY-MM-DDTHH:mm:ss"
 * @example formatDateTime(new Date()) => "2025-12-13T16:28:59"
 */
export const formatDateTime = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

/**
 * Format ngày theo định dạng Việt Nam
 * @param {Date|string|number} date - Date object, ISO string, hoặc timestamp
 * @returns {string} Chuỗi ngày dạng "DD/MM/YYYY"
 * @example formatDate(new Date()) => "13/12/2025"
 */
export const formatDate = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format giờ
 * @param {Date|string|number} date - Date object, ISO string, hoặc timestamp
 * @returns {string} Chuỗi giờ dạng "HH:mm"
 * @example formatTime(new Date()) => "16:28"
 */
export const formatTime = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * Format ngày giờ đầy đủ theo định dạng Việt Nam
 * @param {Date|string|number} date - Date object, ISO string, hoặc timestamp
 * @returns {string} Chuỗi ngày giờ dạng "DD/MM/YYYY HH:mm"
 * @example formatFullDateTime(new Date()) => "13/12/2025 16:28"
 */
export const formatFullDateTime = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  return `${formatTime(dateObj)} ${formatDate(dateObj)}`;
};

/**
 * Format ngày giờ tương đối (vừa xong, 5 phút trước, v.v.)
 * @param {Date|string|number} date - Date object, ISO string, hoặc timestamp
 * @returns {string} Chuỗi thời gian tương đối
 * @example formatRelativeTime(new Date(Date.now() - 300000)) => "5 phút trước"
 */
export const formatRelativeTime = (date) => {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return "Vừa xong";
  } else if (diffMin < 60) {
    return `${diffMin} phút trước`;
  } else if (diffHour < 24) {
    return `${diffHour} giờ trước`;
  } else if (diffDay < 7) {
    return `${diffDay} ngày trước`;
  } else {
    return formatDate(dateObj);
  }
};

/**
 * Chuyển ISO datetime string sang định dạng dễ đọc
 * @param {string} isoString - ISO datetime string (ví dụ: "2025-12-13T16:28:59")
 * @returns {string} Chuỗi ngày giờ dễ đọc (ví dụ: "13/12/2025 16:28")
 * @example formatISOToReadable("2025-12-13T16:28:59") => "13/12/2025 16:28"
 */
export const formatISOToReadable = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return formatFullDateTime(date);
};

/**
 * Chuyển ISO datetime string sang định dạng ngắn (chỉ ngày)
 * @param {string} isoString - ISO datetime string (ví dụ: "2025-12-13T16:28:59")
 * @returns {string} Chuỗi ngày (ví dụ: "13/12/2025")
 * @example formatISOToDate("2025-12-13T16:28:59") => "13/12/2025"
 */
export const formatISOToDate = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return formatDate(date);
};

/**
 * Chuyển ISO datetime string sang định dạng giờ
 * @param {string} isoString - ISO datetime string (ví dụ: "2025-12-13T16:28:59")
 * @returns {string} Chuỗi giờ (ví dụ: "16:28")
 * @example formatISOToTime("2025-12-13T16:28:59") => "16:28"
 */
export const formatISOToTime = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return formatTime(date);
};

/**
 * Parse ISO datetime string thành Date object
 * @param {string} dateTimeString - Chuỗi datetime dạng "2025-12-13T16:28:59"
 * @returns {Date|null} Date object hoặc null nếu invalid
 */
export const parseDateTime = (dateTimeString) => {
  if (!dateTimeString) return null;

  const date = new Date(dateTimeString);

  return isNaN(date.getTime()) ? null : date;
};

/**
 * Lấy ngày giờ hiện tại theo format ISO
 * @returns {string} Chuỗi datetime hiện tại dạng "2025-12-13T16:28:59"
 */
export const getCurrentDateTime = () => {
  return formatDateTime(new Date());
};

export const calculateDeliveryTime = (distance) => {
  const minSpeed = 15; // km/h (Kẹt xe)
  const maxSpeed = 30; // km/h (Đường thoáng)
  const prepTime = 15; // Phút (Thời gian nhà hàng làm món)

  // 1. Tính thời gian di chuyển (đổi ra phút)
  // Đi nhanh nhất (maxSpeed) -> Tốn ít thời gian nhất (minTime)
  const minTravelTimeMinutes = (distance / maxSpeed) * 60;

  // Đi chậm nhất (minSpeed) -> Tốn nhiều thời gian nhất (maxTime)
  const maxTravelTimeMinutes = (distance / minSpeed) * 60;

  // 2. Cộng thêm thời gian làm món
  const totalMinMinutes = minTravelTimeMinutes + prepTime;
  const totalMaxMinutes = maxTravelTimeMinutes + prepTime;

  // 3. Tính ra Timestamp (ms)
  // Date.now() + số phút * 60 giây * 1000 ms
  const minTimeMs = Date.now() + totalMinMinutes * 60 * 1000;
  const maxTimeMs = Date.now() + totalMaxMinutes * 60 * 1000;

  // 4. Hàm helper để format ra giờ:phút (VD: 12:30)
  const formatTime = (ms) => {
    const date = new Date(ms);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return {
    // Trả về chuỗi hiển thị luôn (hoặc trả về timestamp tùy nhu cầu)
    min: formatTime(minTimeMs),
    max: formatTime(maxTimeMs),
    // Trả thêm timestamp raw nếu muốn tính toán tiếp
    minMs: minTimeMs,
    maxMs: maxTimeMs,
  };
};
