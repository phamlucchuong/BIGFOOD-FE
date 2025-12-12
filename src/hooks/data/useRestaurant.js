import { useState } from "react";
import { getRestaurant, getRestaurantDetail } from "../../api/common/restaurantApi";



export default function useHome() {
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurants = async (pageIndex, isReset = false) => {
    setIsLoading(true);
    try {
      const response = await getRestaurant(pageIndex);
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



  const [ restaurantDetail, setRestaurantDetail ] = useState(null);
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

  return { restaurants, fetchRestaurants, totalPages, isLoading, restaurantDetail, fetchRestaurantDetail };
}