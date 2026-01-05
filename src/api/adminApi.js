import { getToken } from "../services/localStorageService";


export async function getAllUser(page) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/users/page/${page}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`,
                }
            }
        );
        return response.json();

    } catch (error) {
        console.error("Lỗi khi tải danh mục món ăn:", error);
    }

}



export async function getUserSummary() {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/users/summary`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`,
                }
            }
        );
        return response.json();

    } catch (error) {
        console.error("Lỗi khi lấy thống kê người dùng:", error);
    }

}

export async function changeUserStatusById(id) {
    try {
        await fetch(
            `http://localhost:8080/bigfood/api/users/${id}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`,
                }
            }
        );
    } catch (error) {
        console.error("Lỗi khi thay đổi trạng thái người dùng:", error);
    }
}

export async function addAdminRoleToUser(id) {
    try {
        await fetch(
            `http://localhost:8080/bigfood/api/users/${id}/admin-role`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${getToken()}`,
                }
            }
        );
    } catch (error) {
        console.error("Lỗi khi thay đổi trạng thái người dùng:", error);
    }
}