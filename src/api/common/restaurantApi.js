import { getToken } from "../../services/localStorageService";
import { API_BASE_URL } from '../../config/config';

export async function getRestaurant(categoryId = "", searchText = "", page) {
  try {
    const baseUrl = `${API_BASE_URL}/restaurants`;
    const params = new URLSearchParams();

    // Cách viết chuẩn
    const savedLng = localStorage.getItem("user_longitude");
    const savedLat = localStorage.getItem("user_latitude");

    const lng = savedLng ? parseFloat(savedLng) : null; // Nên dùng null thay vì 0.0
    const lat = savedLat ? parseFloat(savedLat) : null;

    // Thêm location params nếu có
    if (lng !== null && lat !== null) {
      params.append("lng", lat);
      params.append("lat", lng);
    }

    // Ưu tiên categoryId, nếu không có mới dùng searchText
    if (
      categoryId !== "" &&
      categoryId !== null &&
      categoryId !== undefined &&
      categoryId !== 0
    ) {
      params.append("categoryId", categoryId);
    } else if (
      searchText !== "" &&
      searchText !== null &&
      searchText !== undefined
    ) {
      params.append("searchText", searchText);
    }

    // Thêm page nếu có (bao gồm cả page = 0)
    if (page !== undefined && page !== null) {
      params.append("page", page);
    }

    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

    // console.log("API URL:", url); // Debug log

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhà hàng: ", error);
    throw error;
  }
}

export async function getRestaurantDetail(restaurantId) {
  try {
    console.log("API Call - Restaurant ID:", restaurantId);
    const response = await fetch(
      `${API_BASE_URL}/restaurants/detail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: restaurantId }),
      }
    );

    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết nhà hàng: ", error);
  }
}

export async function getRestaurantsByCategory(categoryId, page = 0) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/category/${categoryId}${
        page ? `?page=${page}` : ""
      }`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy nhà hàng theo danh mục: ", error);
  }
}

export async function getRestaurantRequestApi(page = 0) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/request${
        page ? `?page=${page}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy nhà hàng theo danh mục: ", error);
  }
}

export async function approveRestaurantRequestApi(restaurantId, approved) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/request/approve`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ restaurantId, approved }),
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy nhà hàng theo danh mục: ", error);
  }
}

export async function getRestaurantTagApi(categoryId, page) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/category?categoryId=${categoryId || ""}&page=${page ?? 0}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy nhà hàng theo danh mục: ", error);
  }
}


export async function getRestaurantReportApi(page = 0) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/restaurants/report?${page ? `&page=${page}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy nhà hàng theo danh mục: ", error);
  }
}