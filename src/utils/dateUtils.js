// dateUtils.js
export const formatDate = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';

    // 1. Tạo đối tượng Date từ chuỗi ISO (LocalDateTime)
    const dateObject = new Date(dateTimeString);

    // 2. Định nghĩa options để chỉ hiển thị ngày, tháng, năm
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    // 3. Sử dụng toLocaleDateString() với ngôn ngữ Việt Nam
    return dateObject.toLocaleDateString('vi-VN', options);
};