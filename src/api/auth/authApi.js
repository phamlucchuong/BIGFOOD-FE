import { getToken } from "../../services/localStorageService";
import { API_BASE_URL } from '../../config/config';

async function verifyEmail(email) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/users/verify-email/${email}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi xác minh email:", error);
        alert("Có lỗi xảy ra khi kiểm tra email. Vui lòng thử lại!");
    }
};

async function sendOtp(email) {
    await fetch(
        `${API_BASE_URL}/otp/send/email?email=${encodeURIComponent(email)}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};


async function sendReport(email) {
    await fetch(
        `${API_BASE_URL}/otp/send/report?email=${encodeURIComponent(email)}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${getToken()}`,
            },
        }
    );
};

async function verifyOtp(email, otp) {
    const response = await fetch(
        `${API_BASE_URL}/otp/verify?key=${encodeURIComponent(email)}&otp=${otp}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.json();
}


async function login({email, password}) {
    const response = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    return response.json();
}


async function register(email, name, phone, password) {
    await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
    });
}

async function updateAccount(email, name, phone, password) {
    await fetch(`${API_BASE_URL}/users/${email}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
    });
}


async function logoutWithToken() {
    await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });
}

async function createRestaurant(formData) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/restaurants`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    });
    return response;
}


export { verifyEmail, sendOtp, verifyOtp, login, updateAccount, logoutWithToken, register, createRestaurant, sendReport };
