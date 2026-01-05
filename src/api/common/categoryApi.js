import { API_BASE_URL } from '../../config/config';

export async function getCategories() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/restaurant-categories`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return response.json();

    } catch (error) {
        console.error("Lỗi khi tải danh mục món ăn:", error);
    }

}