import { useState } from "react";
import {
  createNewOrder,
  getOrderById,
  getOrderByUserId,
} from "../../api/common/orderApi";

export default function useOrder() {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const createOrder = async (formData) => {
    return await createNewOrder(formData);
  };

  const getOrder = async (orderId) => {
    try {
      const response = await getOrderById(orderId);
      setOrders(response.results || []);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const getAllOrder = async (page = 0, reset = false) => {
    try {
      const response = await getOrderByUserId();
      const newData = response.results || [];
      
      if (reset || page === 0) {
        // Nếu là trang đầu hoặc reset -> Ghi đè mới hoàn toàn
        setOrderHistory(newData);
      } else {
        // Nếu là "Xem thêm" -> Nối mảng cũ với mảy mới
        setOrderHistory((prev) => [...prev, ...newData]);
      }
      
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return { 
    createOrder, 
    orders, 
    getOrder, 
    orderHistory, 
    getAllOrder, 
    totalPages 
  };
}
