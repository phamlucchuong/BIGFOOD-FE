import { useState } from "react";
import {
  getRestaurant,
  getRestaurantDetail,
  getRestaurantRequestApi,
  approveRestaurantRequestApi,
} from "../../api/common/restaurantApi";

export default function useHome() {
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurants = async (
    categoryId,
    searchText,
    pageIndex,
    isReset = false
  ) => {
    setIsLoading(true);
    try {
      const response = await getRestaurant(categoryId, searchText, pageIndex);
      const newRestaurants = response.results.restaurants; // Lấy mảng nhà hàng từ response
      setTotalPages(response.results.total); // Lưu tổng số trang

      if (isReset || pageIndex === 0) {
        // Nếu là trang đầu hoặc reset -> Ghi đè mới hoàn toàn
        setRestaurants(newRestaurants);
      } else {
        // Nếu là "Xem thêm" -> Nối mảng cũ với mảng mới
        setRestaurants((prev) => [...prev, ...newRestaurants]);
      }
    } catch (error) {
      console.error("Lỗi fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const fetchRestaurantDetail = async (restaurantId) => {
    setIsLoading(true);
    try {
      const response = await getRestaurantDetail(restaurantId);
      setRestaurantDetail(response.results);
    } catch (error) {
      console.error("Lỗi fetch chi tiết nhà hàng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRestaurantsByCategory = async (
    categoryId,
    pageIndex = 0,
    isReset = false
  ) => {
    setIsLoading(true);
    try {
      // getRestaurant(lng, lat, categoryId, searchText, page)
      const response = await getRestaurant(categoryId, "", pageIndex);
      const newRestaurants = response.results.restaurants;
      setTotalPages(response.results.total);

      if (isReset || pageIndex === 0) {
        setRestaurants(newRestaurants);
      } else {
        setRestaurants((prev) => [...prev, ...newRestaurants]);
      }
    } catch (error) {
      console.error("Lỗi fetch nhà hàng theo danh mục:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [restaurantRequests, setRestaurantRequests] = useState([]);
  const fetchRestaurantRequests = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await getRestaurantRequestApi(page);
      if (response.ok) {
        setRestaurantRequests(response.results.restaurants);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const approveRequest = async (requestId, isApproved) => {
    setIsLoading(true);
    try {
      const response = await approveRestaurantRequestApi(requestId, isApproved);
      if(response.ok) {
        alert("Phê duyệt thành công");
      } else {
        alert("Phê duyệt thất bại");
      }
    } catch (error) {
      console.error("Lỗi phê duyệt yêu cầu:", error);
    }
  };

  return {
    restaurants,
    fetchRestaurants,
    totalPages,
    isLoading,
    restaurantDetail,
    fetchRestaurantDetail,
    fetchRestaurantsByCategory,
    restaurantRequests,
    fetchRestaurantRequests,
    approveRequest
  };
}
