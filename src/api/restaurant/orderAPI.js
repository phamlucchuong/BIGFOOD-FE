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

export {getListOrder , getOrderDetail , updateStatusOrder}