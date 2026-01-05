import { API_BASE_URL } from '../../config/config';
import { getToken } from "../../services/localStorageService";
export async function createNewReview(orderId, CreateReviewRequest) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reviews/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(CreateReviewRequest),
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng: ", error);
  }
}
export async function updateReviewById(orderId, updateReviewRequest) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reviews/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updateReviewRequest),
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng: ", error);
  }
}
