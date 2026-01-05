// Tự động nhận diện môi trường: nếu có biến VITE_API_BASE_URL thì dùng, không thì dùng localhost
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/bigfood/api';