import { getToken } from "../../services/localStorageService";
import { API_BASE_URL } from '../../config/config';

async function getListOrder(page) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/orders/restaurant/page/${page}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

async function getOrderDetail(orderId) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/orders/restaurant/detail/${orderId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}
async function getOrderRestaurantByStatus(status) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/orders/restaurant?status=${status}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

async function updateStatusOrder({orderId , status , reason}) {
    reason = reason ?? "";
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body : JSON.stringify({status , reason})
    });
    return response.json();
}


async function getRestaurantStatistical() {
    const response = await fetch(`${API_BASE_URL}/orders/restaurant/statistital`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    return response.json();
}

async function getRestaurantStatisticalAndSort(timeRange) {
     const response = await fetch(`${API_BASE_URL}/orders/restaurant/statistics?timeRange=${timeRange}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    return response.json();
}


export {getListOrder , getOrderDetail , updateStatusOrder , getOrderRestaurantByStatus , getRestaurantStatistical ,getRestaurantStatisticalAndSort}