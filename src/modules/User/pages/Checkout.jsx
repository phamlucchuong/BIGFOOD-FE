import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bike,
    ClipboardList,
    Clock,
    CreditCard,
    MapPin,
    Tag,
    Trash2,
} from "lucide-react";
import phoImage from "../../../assets/images/pho.png";

const address = {
    label: "Giao tới",
    detail:
        "Điểm Đón Trả - Trường Đại Học Giao Thông Vận Tải - Phân Hiệu TP.Hồ Chí Minh, 450 Lê Văn Việt, Thủ Đức",
    notePlaceholder: "Ví dụ: Bác tài vui lòng gọi trước khi đến giao",
    shippingMessage: "Giao hàng tận cửa chỉ với 5.000đ",
};

// const orderItems = [
//     {
//         id: 1,
//         name: "Bánh bao sữa tươi chiên",
//         quantity: 1,
//         price: 25000,
//         image: phoImage,
//     },
//     {
//         id: 2,
//         name: "Bánh bao sữa",
//         quantity: 1,
//         price: 4000,
//         image: phoImage,
//     },
// ];

const payment = {
    method: "Tiền mặt",
    promo: "Be khuyến mại",
    subtotal: 0,
    fee: 21000,
    insurance: "Đơn hàng có Bảo hiểm Food Care",
};

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
    const navigate = useNavigate();

    function Themmon() {
      navigate("/restaurant-detail");
    }

     const handleDelete = (id) => {
        const updatedCart = orderItems.filter(item => item.id !== id);
        setCart(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      };

      const calculateTotal = (cart) => {
        return cart.reduce((sum, item) => {
          const qty = item.quantity ?? item.sold ?? 1;
          return sum + item.price * qty;
        }, 0);
      };


    // load từ sessionStorage khi mở trang
    useEffect(() => {
      const saved = JSON.parse(sessionStorage.getItem("cart"));
      if (saved) setCart(saved); 
        setTotal(calculateTotal(saved));
    }, []);

    useEffect(() => {
        setTotal(calculateTotal(orderItems));

      }, [orderItems]);
    

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                        Thanh toán
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-gray-800">
                        Thanh toán - Gà Nướng Di Ba - Cơm Lam & Bánh Bao - Đinh Phong Phú
                    </h1>
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
                                        {address.label}
                                    </p>
                                    <p className="mt-1 text-base font-medium text-gray-900">
                                        {address.detail}
                                    </p>
                                </div>
                            </div>

                            <label className="block">
                                <span className="text-sm font-medium text-gray-600">
                                    Ghi chú cho tài xế
                                </span>
                                <input
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                    placeholder={address.notePlaceholder}
                                />
                            </label>

                            <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                                <Bike className="size-5 text-gray-500" />
                                <span>{address.shippingMessage}</span>
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
                                <button className="text-sm font-medium text-gray-500 hover:text-gray-800" 
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
                                            {/* <button 
                                                onClick={() => {
                                                handleProductClick(item);
                                                }}
                                             className="mt-3 text-sm font-medium text-gray-500 hover:text-gray-800">
                                                Chỉnh sửa món
                                            </button> */}
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
                                            onChange={(event) => setSelectedMethod(event.target.value)}
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
                                            <p className="text-xs text-gray-500">
                                                Chưa áp dụng mã
                                            </p>
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
                                    <span>
                                        {formatCurrency(total + payment.fee)}
                                    </span>
                                </div>
                            </div>

                            <button className="mt-6 w-full rounded-2xl bg-yellow-400 py-3 text-center text-base font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-300">
                                Đặt món ngay
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}