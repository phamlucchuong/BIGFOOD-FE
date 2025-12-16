export const paymentMethodMapper = [
  {
    "Tiền mặt": "CASH",
    "Thẻ ngân hàng": "BANK_CARD",
    "Ví Momo": "MOMO",
    ZaloPay: "ZALO_PAY",
    VNPay: "VNPAY",
  },
  {
    CASH: "tiền mặt",
    BANK_CARD: "thẻ ngân hàng",
    MOMO: "ví Momo",
    ZALO_PAY: "ZaloPay",
    VNPAY: "VNPay",
  },
];

export const orderStatusMapper = {
  PENDING: {
    text: "Đang chờ xác nhận",
    color: "bg-[#FEF9C3] text-[#CD8A04]",
  },
  CONFIRMED: {
    text: "Đã xác nhận",
    color: "bg-[#DBEAFE] text-[#2563EB]",
  },
  PREPARING: {
    text: "Đang chuẩn bị",
    color: "bg-[#F3E8FF] text-[#9333EA]",
  },
  DELIVERING: {
    text: "Đang giao hàng",
    color: "bg-[#E0E7FF] text-[#4F46E5]",
  },
  COMPLETED: {
    text: "Đã hoàn thành",
    color: "bg-[#DCFCE7] text-[#16A34A]",
  },
  CANCELLED: {
    text: "Đã hủy",
    color: "bg-[#fce8d4] text-[#ff880a]",
  },
  REJECTED: {
    text: "Bị từ chối",
    color: "bg-[#FEE2E2] text-[#DC2626]",
  },
};
