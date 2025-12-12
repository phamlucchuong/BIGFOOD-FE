export async function getRestaurant(page) {
  try {
    const response = await fetch(
      `http://localhost:8080/bigfood/api/restaurants${
        page ? `?page=${page}` : ""
      }`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhà hàng: ", error);
  }
}

export async function getRestaurantDetail(restaurantId) {
  try {
    console.log("API Call - Restaurant ID:", restaurantId);
    const response = await fetch(
      `http://localhost:8080/bigfood/api/restaurants/detail`,
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
