import { createNewOrder } from "../../api/common/orderApi";

export default function useOrder() {
  const createOrder = async (formData) => {
    const response = await createNewOrder(formData);
    if (response.ok) {
      console.log("Đơn hàng đã được đặt!");
      return response.results;
    }
  };

  return { createOrder };
}
