async function verifyEmail(email) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/users/verify-email/${email}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.json(); // hoặc return void nếu backend không trả dữ liệu
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

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    console.log(e)
  }
  return { data };
}


export async function register(email, name, phone, password) {
    await fetch("http://localhost:8080/bigfood/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });
}

async function updateAccount(email, name, phone, password) {
    await fetch(`http://localhost:8080/bigfood/api/users/${email}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
}



export { verifyEmail, sendOtp, verifyOtp, login, updateAccount }