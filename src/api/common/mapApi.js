import { API_BASE_URL } from '../../config/config';


export async function reverseGeocode(latitude, longitude) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/goong/reverse-geocoding`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat: latitude, lng: longitude }),
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà hàng: ", error);
    }
}