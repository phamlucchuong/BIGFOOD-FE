
export const getStatusMap = (status) => {
  switch (status) {
    case "PENDING":
      return { text: "ĐANG XỬ LÝ", color: "bg-blue-100 text-gray-900" };
    case "PREPARING":
      return { text: "ĐANG CHUẨN BỊ", color: "bg-yellow-100 text-yellow-600" };
    case "DELIVERING":
      return { text: "ĐANG GIAO HÀNG", color: "bg-green-100 text-green-600" };
    case "REJECTED":
      return { text: "BỊ TỪ CHỐI", color: "bg-red-100 text-red-600" };
    case "CANCELLED":
      return { text: "ĐÃ HỦY", color: "bg-gray-100 text-gray-600" };
    case "COMPLETED":
      return { text: "HOÀN THÀNH", color: "bg-gray-100 text-gray-600" };
    default:
      return { text: "CHƯA GIAO", color: "bg-gray-100 text-gray-600" };
  }
};
