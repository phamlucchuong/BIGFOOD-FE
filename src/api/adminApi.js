import { getToken } from "../services/localStorageService";
import { API_BASE_URL } from '../config/config';


export async function getAllUser(page) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/users/page/${page}`,
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
            `${API_BASE_URL}/users/summary`,
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
            `${API_BASE_URL}/users/${id}/status`,
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
            `${API_BASE_URL}/users/${id}/admin-role`,
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