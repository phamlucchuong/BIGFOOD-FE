


export async function createNewOrder(formData) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/orders`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    authhorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData),
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng: ", error);
    }
}