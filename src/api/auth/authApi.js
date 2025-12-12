import { getToken } from "../../services/localStorageService";

async function verifyEmail(email) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/users/verify-email/${email}`,
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
        `http://localhost:8080/bigfood/api/otp/send/email?email=${encodeURIComponent(email)}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};


async function verifyOtp(email, otp) {
    const response = await fetch(
        `http://localhost:8080/bigfood/api/otp/verify?key=${encodeURIComponent(email)}&otp=${otp}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.json();
}

async function login(email, password) {
    const response = await fetch("http://localhost:8080/bigfood/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    return response.json();
}


export async function register(email, name, phone, password) {
     const response =  await fetch("http://localhost:8080/bigfood/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });
      console.log("Register response:", response);
      return response.json();
}

async function updateAccount(email, name, phone, password) {
    await fetch(`http://localhost:8080/bigfood/api/users/${email}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
}

async function createRestaurant(formData) {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/bigfood/api/restaurants`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    });
    return response;
}






export { verifyEmail, sendOtp, verifyOtp, login , updateAccount ,createRestaurant }