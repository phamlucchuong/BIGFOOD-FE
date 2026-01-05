import { API_BASE_URL } from '../../config/config';



export async function addNewSearch(newSearch) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/searchs`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSearch)
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi thêm mới tìm kiếm: ", error);
    }
}


export async function getHotSearchList() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/searchs/hot`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tìm kiếm nổi bật: ", error);
    }
}