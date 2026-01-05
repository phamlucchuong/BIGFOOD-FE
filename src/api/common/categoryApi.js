
export async function getCategories() {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/restaurant-categories`,
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