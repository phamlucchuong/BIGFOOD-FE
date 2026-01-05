import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOrder from "../../../hooks/data/useOrder";
import {
  Bike,
  ClipboardList,
  Clock,
  CreditCard,
  MapPin,
  Tag,
  Trash2,
} from "lucide-react";

const payment = {
  method: "Tiền mặt",
  promo: "Be khuyến mại",
  subtotal: 0,
  fee: 21000,
  insurance: "Đơn hàng có Bảo hiểm Food Care",
};
import { getToken } from "../../../services/localStorageService";

const paymentMethods = [
  "Tiền mặt",
  "Thẻ ngân hàng",
  "Ví Momo",
  "ZaloPay",
  "VNPay",
];

const formatCurrency = (amount) =>
  amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState(payment.method);
  const [showPopup, setShowPopup] = useState(false); // state cho popup
  const [selectedProduct, setSelectedProduct] = useState(null); // state lưu thông tin sản phẩm khi click
  const [orderItems, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  const user_location = {
    address: localStorage.getItem("user_address") || "Chưa có địa chỉ",
    longitude: localStorage.getItem("user_longitude") || 0,
    latitude: localStorage.getItem("user_latitude") || 0,
  };

  function Themmon() {
    // Quay lại trang restaurant detail với đúng ID
    if (orderData?.restaurantId) {
      navigate(
        `/restaurant-detail?id=${orderData.restaurantId}&name=${orderData.restaurantName}`
      );
    }
  }

  const handleDelete = (id) => {
    const updatedCart = orderItems.filter((item) => item.id !== id);
    setCart(updatedCart);

    // Cập nhật lại orderData trong sessionStorage
    const currentOrderData = JSON.parse(sessionStorage.getItem("orderData"));
    if (currentOrderData) {
      currentOrderData.cart = updatedCart;
      sessionStorage.setItem("orderData", JSON.stringify(currentOrderData));
    }
  };

  const calculateTotal = (cart) => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((sum, item) => {
      const qty = item.quantity ?? item.sold ?? 1;
      return sum + item.price * qty;
    }, 0);
  };

  // Load dữ liệu từ sessionStorage khi mở trang
  useEffect(() => {
    const savedOrderData = sessionStorage.getItem("orderData");

    if (savedOrderData) {
      const data = JSON.parse(savedOrderData);
      setOrderData(data);
      setCart(data.cart || []);
      setTotal(calculateTotal(data.cart));

      console.log("Checkout Data:", {
        cart: data.cart,
        restaurantId: data.restaurantId,
        restaurantName: data.restaurantName,
        restaurantInfo: data.restaurantDetail,
      });
    } else {
      // Không có dữ liệu, có thể redirect về trang chủ
      console.warn("Không có dữ liệu đơn hàng");
    }
  }, []);

  useEffect(() => {
    setTotal(calculateTotal(orderItems));
  }, [orderItems]);

  const { createOrder } = useOrder();
  const handleOrderSubmit = async () => {
    if(getToken() == null) {
      alert("Vui lòng đăng nhập để đặt hàng!");
      navigate("/");
      return;
    }
    // Validation
    if (!orderData || !orderData.restaurant || !orderData.restaurant.id) {
      alert("Thiếu thông tin nhà hàng!");
      console.error("OrderData:", orderData);
      return;
    }
    
    if (!orderItems || orderItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    
    // Kiểm tra địa chỉ hợp lệ (không phải giá trị mặc định)
    if (!user_location.address || user_location.address === "Chưa có địa chỉ" || user_location.address.trim() === "") {
      alert("Vui lòng nhập địa chỉ giao hàng hợp lệ!");
      return;
    }

    // Validate từng item trong orderItems
    const invalidItems = orderItems.filter(item => {
      return !item || !item.id || item.id === null || item.id === undefined || 
             !item.quantity || item.quantity === null || item.quantity === undefined || 
             Number(item.quantity) <= 0 || isNaN(Number(item.quantity));
    });

    if (invalidItems.length > 0) {
      alert("Giỏ hàng có sản phẩm không hợp lệ! Vui lòng kiểm tra lại.");
      console.error("Invalid items:", invalidItems);
      return;
    }

    // Map payment method sang giá trị backend expect (có thể là enum)
    const paymentMethodMap = {
        "Tiền mặt": "CASH",
        "Thẻ ngân hàng": "BANK_CARD",
        "Ví Momo": "MOMO",
        "ZaloPay": "ZALO_PAY",
        "VNPay": "VNPAY"
    };
    
    // Cấu trúc formData theo đúng backend DTO
    const restaurantId = String(orderData.restaurant.id).trim();
    if (!restaurantId || restaurantId === "null" || restaurantId === "undefined") {
      alert("ID nhà hàng không hợp lệ!");
      console.error("Restaurant ID:", restaurantId);
      return;
    }

    const orderDetails = orderItems
      .filter(item => item && item.id && item.quantity) // Lọc lại một lần nữa
      .map(item => {
        const foodId = String(item.id).trim();
        const quantity = Number(item.quantity);
        const notes = "";
        
        // Validate foodId
        if (!foodId || foodId === "null" || foodId === "undefined" || foodId === "") {
          console.error("Invalid foodId:", item);
          return null;
        }
        
        // Validate quantity
        if (isNaN(quantity) || quantity <= 0) {
          console.error("Invalid quantity:", item);
          return null;
        }

        const detail = {
          foodId: foodId,
          quantity: quantity,
          notes: notes
        };
        
        // Chỉ thêm notes nếu có giá trị (tránh @NotBlank validation)
        if (item.note && item.note.trim() && item.note.trim() !== "") {
          detail.notes = item.note.trim();
        }
        
        return detail;
      })
      .filter(detail => detail !== null); // Loại bỏ các detail không hợp lệ

    if (orderDetails.length === 0) {
      alert("Không có sản phẩm hợp lệ trong giỏ hàng!");
      return;
    }

    const formData = {
      restaurantId: restaurantId,
      deliveryAddress: user_location.address.trim(),
      paymentMethod: paymentMethodMap[selectedMethod] || "CASH",
      notes: "",
      orderDetails: orderDetails
    };
    
    
    try {
      const response = await createOrder(formData);
      console.log("Order Results:", response);
      
      if (response && response.ok) {
        alert("Đơn hàng của bạn đã được đặt thành công!");
        sessionStorage.removeItem("orderData");
        // sessionStorage.setItem("orderResponse", response.results);
        localStorage.setItem("last_order_id", response.results.id);
        console.log("Saved last_order_id:", response.results.id);
        navigate("/order/detail");
      } else {
        alert(`Đặt hàng thất bại: ${response.message || "Lỗi không xác định"}`);
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <h1 className="mt-1 text-2xl font-semibold text-gray-800">
            Thanh toán - {orderData?.restaurant.name || "Đang tải..."}
          </h1>
          {orderData?.restaurantDetail?.address && (
            <p className="text-sm text-gray-500 mt-1">
              {orderData.restaurantDetail.address}
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start gap-3">
                <span className="rounded-full bg-gray-100 p-3 text-gray-600">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">
                    Giao tới
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {user_location.address}
                  </p>
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-gray-600">
                  Ghi chú cho tài xế
                </span>
                <input
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  placeholder={"Ví dụ: Bác tài vui lòng gọi trước khi đến giao"}
                />
              </label>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <Bike className="size-5 text-gray-500" />
                <span>Giao hàng tận cửa chỉ với 5.000đ</span>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ClipboardList className="size-5 text-gray-500" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Đơn hàng ({orderItems.length})
                    </p>
                    <p className="text-sm text-gray-500">
                      Giao ngay - Ước tính 25 phút
                    </p>
                  </div>
                </div>
                <button
                  className="text-sm font-medium text-gray-500 hover:text-gray-800"
                  onClick={Themmon}
                >
                  Thêm món
                </button>
              </div>

              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {item.quantity}x
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm italic text-gray-500">
                            {item.note}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            type="button"
                            aria-label="Xoá món"
                            className="text-gray-400 transition hover:text-red-500"
                          >
                            <Trash2 className="size-4" />
                          </button>
                          <p className="text-base font-semibold text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <CreditCard className="size-5 text-gray-500" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Hình thức thanh toán & ưu đãi
                  </p>
                  <p className="text-sm text-gray-500">
                    Bạn có thể áp dụng nhiều mã giảm giá một lúc
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-gray-600">
                  Hình thức thanh toán
                  <div className="mt-2 rounded-xl border border-gray-200 px-4 py-3">
                    <select
                      value={selectedMethod}
                      onChange={(event) =>
                        setSelectedMethod(event.target.value)
                      }
                      className="w-full bg-transparent text-base font-medium text-gray-800 outline-none"
                    >
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block text-sm font-medium text-gray-600">
                  Ưu đãi
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-dashed border-gray-300 px-4 py-3">
                    <Tag className="size-4 text-gray-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {payment.promo}
                      </p>
                      <p className="text-xs text-gray-500">Chưa áp dụng mã</p>
                    </div>
                    <button className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                      Chọn mã
                    </button>
                  </div>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                <Clock className="size-5 text-gray-500" />
                <span>{payment.insurance}</span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phí áp dụng</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(payment.fee)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-4 text-base font-semibold text-gray-900">
                  <span>Tổng số tiền</span>
                  <span>{formatCurrency(total + payment.fee)}</span>
                </div>
              </div>

              <button
                onClick={handleOrderSubmit} 
                className="mt-6 w-full rounded-2xl bg-yellow-400 py-3 text-center text-base font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-300">
                Đặt món ngay
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
