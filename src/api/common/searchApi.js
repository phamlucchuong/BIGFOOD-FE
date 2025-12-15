


export async function addNewSearch(newSearch) {
    try {
        const response = await fetch(
            `http://localhost:8080/bigfood/api/searchs`,
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
            `http://localhost:8080/bigfood/api/searchs/hot`,
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