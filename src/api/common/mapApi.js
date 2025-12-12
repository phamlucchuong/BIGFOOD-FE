


export async function reverseGeocode(latitude, longitude) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/goong/reverse-geocoding`,
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