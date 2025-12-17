import { getToken } from "../../services/localStorageService";

async function getListOrder() {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/bigfood/api/orders/restaurant/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

async function getOrderDetail(orderId) {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/bigfood/api/orders/restaurant/detail/${orderId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}
async function getOrderRestaurantByStatus(status) {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/bigfood/api/orders/restaurant?status=${status}`, {
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
    const response = await fetch(`http://localhost:8080/bigfood/api/orders/${orderId}/status`, {
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
    const response = await fetch(`http://localhost:8080/bigfood/api/orders/restaurant/statistital`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    return response.json();
}

async function getRestaurantStatisticalAndSort(timeRange) {
     const response = await fetch(`http://localhost:8080/bigfood/api/orders/restaurant/statistics?timeRange=${timeRange}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    return response.json();
}


export {getListOrder , getOrderDetail , updateStatusOrder , getOrderRestaurantByStatus , getRestaurantStatistical ,getRestaurantStatisticalAndSort}