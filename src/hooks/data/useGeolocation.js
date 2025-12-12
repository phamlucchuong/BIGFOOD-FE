import { reverseGeocode } from "../../api/common/mapApi";

export async function getAddressFromCoordinates(latitude, longitude) {
  try {
    const response = await reverseGeocode(latitude, longitude);
    if (response.ok) {
      localStorage.setItem("user_address", response.results);
      return response.results;
    } else {
      return "Không thể tìm thấy địa chỉ cho vị trí này.";
    }
  } catch (error) {
    console.error("Lỗi khi gọi API Geocoding:", error);
    return "Lỗi kết nối đến dịch vụ bản đồ.";
  }
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Trình duyệt không hỗ trợ Geolocation.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Lỗi Geolocation:", error);
          reject("Không thể lấy vị trí. Vui lòng thử lại.");
        }
      );
    }
  });
}
