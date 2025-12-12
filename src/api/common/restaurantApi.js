





export async function getRestaurant(page) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/restaurants${page ? `?page=${page}` : ""}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà hàng: ", error);
    }
}

