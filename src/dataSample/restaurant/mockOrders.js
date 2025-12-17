// export const mockOrders = [
//   { id: 1, customer: "Nguyễn Văn A", total: 150000, status: "pending", items: 3, time: "10:30", date: "2025-10-31" },
//   { id: 2, customer: "Trần Thị B", total: 95000, status: "confirmed", items: 2, time: "11:15", date: "2025-10-31" },
//   { id: 3, customer: "Lê Văn C", total: 200000, status: "completed", items: 5, time: "12:00", date: "2025-10-31" },
//   { id: 4, customer: "Phạm Thị D", total: 75000, status: "cancelled", items: 2, time: "13:45", date: "2025-10-31" }
// ];

export const mockOrders = [
  { 
    id: 1, 
    customer: "Nguyễn Văn A", 
    total: 150000, 
    status: "pending", 
    time: "10:30", 
    date: "2025-10-31",
    phone: "0901234567",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    note: "Giao hàng trước 12h, gọi điện trước khi đến",
    items: [
      { id: 1, name: "Phở Bò", price: 50000, quantity: 2, image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300" },
      { id: 2, name: "Trà Sữa", price: 25000, quantity: 2, image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300" }
    ],
    paymentMethod: "Tiền mặt",
    shippingFee: 0
  },
  { 
    id: 2, 
    customer: "Trần Thị B", 
    total: 95000, 
    status: "confirmed", 
    time: "11:15", 
    date: "2025-10-31",
    phone: "0909876543",
    address: "456 Nguyễn Huệ, Quận 1, TP.HCM",
    note: "",
    items: [
      { id: 1, name: "Bún Chả", price: 45000, quantity: 1, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300" },
      { id: 2, name: "Phở Bò", price: 50000, quantity: 1, image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300" }
    ],
    paymentMethod: "Chuyển khoản",
    shippingFee: 0
  },
  { 
    id: 3, 
    customer: "Lê Văn C", 
    total: 200000, 
    status: "completed", 
    time: "12:00", 
    date: "2025-10-31",
    phone: "0912345678",
    address: "789 Võ Văn Tần, Quận 3, TP.HCM",
    note: "Không hành, không rau thơm",
    items: [
      { id: 1, name: "Phở Bò", price: 50000, quantity: 3, image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300" },
      { id: 2, name: "Gỏi Cuốn", price: 30000, quantity: 2, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=300" }
    ],
    paymentMethod: "Tiền mặt",
    shippingFee: 0
  },
  { 
    id: 4, 
    customer: "Phạm Thị D", 
    total: 75000, 
    status: "cancelled", 
    time: "13:45", 
    date: "2025-10-31",
    phone: "0923456789",
    address: "321 Pasteur, Quận 1, TP.HCM",
    note: "",
    items: [
      { id: 1, name: "Trà Sữa", price: 25000, quantity: 3, image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300" }
    ],
    paymentMethod: "Tiền mặt",
    shippingFee: 0,
    cancelReason: "Khách hàng thay đổi ý định"
  }
];

