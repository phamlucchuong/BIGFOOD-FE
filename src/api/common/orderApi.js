import { getToken } from "../../services/localStorageService";


export async function createNewOrder(formData) {
    try { 
        const response = await fetch(
            `http://localhost:8080/bigfood/api/orders`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(formData),
            }
        );

        if(response.ok) {
            return await response.json();
        }
        
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng: ", error);
        
        // Xử lý các loại lỗi khác nhau
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            // Lỗi kết nối (server không chạy hoặc không thể kết nối)
            return {
                ok: false,
                status: 0,
                error: "CONNECTION_ERROR",
                message: "Không thể kết nối đến server. Vui lòng kiểm tra xem backend đã chạy chưa."
            };
        }
        
        // Các lỗi khác
        return {
            ok: false,
            status: 0,
            error: "UNKNOWN_ERROR",
            message: error.message || "Có lỗi xảy ra khi kết nối đến server"
        };
    }
}


export async function getOrderById(orderId) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/orders/${orderId}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`
                },
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà hàng: ", error);
    }
}


export async function getOrderByUserId(status, page) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/orders/user/all?status=${status}&page=${page}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`
                },
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng: ", error);
    }
}


export async function updateOrderStatus(orderId, request) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/orders/${orderId}/status`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(request),
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng: ", error);
    }
}

