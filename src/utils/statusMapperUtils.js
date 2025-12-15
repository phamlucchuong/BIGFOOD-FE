export const paymentMethodMap = [
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
  }
];

export const orderStatusMap = {
  PENDING: "Đang chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PREPARING: "Đang chuẩn bị",
  DELIVERING: "Đang giao hàng",
  DELIVERED: "Đã giao",
};
