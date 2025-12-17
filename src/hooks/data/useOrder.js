import { useState } from "react";
import {
  createNewOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  getSummary,
} from "../../api/common/orderApi";

export default function useOrder() {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderSummary, setOrderSummary] = useState({});

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

  const getAllOrder = async (status = false, page = 0, reset = false) => {
    try {
      const response = await getOrderByUserId(status, page);
      const newData = response.results.orders || [];
      const total = response?.results?.total ?? 0;
      setTotal(total);
      const totalPages =
        response?.results?.totalPages ?? response?.results?.total ?? 1;
      setTotalPages(totalPages);

      if (reset || page === 0) {
        // Nếu là trang đầu hoặc reset -> Ghi đè mới hoàn toàn
        setOrderHistory(newData);
      } else {
        // Nếu là "Xem thêm" -> Nối mảng cũ với mảy mới
        setOrderHistory((prev) => [...prev, ...newData]);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const cancelOrder = async (orderId, updateRequest) => {
    // Implement cancel order logic here
    const response = await updateOrderStatus(orderId, updateRequest);
    if (response.ok) {
      // Optionally refresh order data
      return response.results;
    }
  };

  const getOrderSummary = async () => {
    try {
      const response = await getSummary();
      setOrderSummary(response.results || {});
    } catch (error) {
      console.error("Error fetching order summary:", error);
      return {};
    }
  };

  return {
    createOrder,
    orders,
    getOrder,
    orderHistory,
    getAllOrder,
    total,
    totalPages,
    cancelOrder,
    orderSummary,
    getOrderSummary,
  };
}
