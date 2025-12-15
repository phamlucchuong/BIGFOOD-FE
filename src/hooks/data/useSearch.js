import { useState, useEffect } from "react";
import { getHotSearchList } from "../../api/common/searchApi";
import useHome from "./useRestaurant";

const STORAGE_KEY = "history_search";

export default function useSearch(limit = 5) {
  const [historySearch, setHistorySeach] = useState([]);
  const [hotSearch, setHotSearch] = useState([]);
  const { restaurants, fetchRestaurants, isLoading } = useHome();

  // Load lịch sử từ localStorage khi component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setHistorySeach(saved);
  }, []);

  // ✅ Mới: Tự động lấy danh sách hot search khi hook được sử dụng lần đầu
  useEffect(() => {
    const fetchHotSearch = async () => {
      try {
        const response = await getHotSearchList();
        // Giả sử API trả về mảng trực tiếp, nếu không cần chỉnh lại response.result
        if (response) {
          setHotSearch(response.results);
        }
      } catch (error) {
        // Ghi log lỗi ra console để debug, không làm crash app
        console.error("Lỗi khi lấy danh sách hot search:", error);
      }
    };

    fetchHotSearch(); // Gọi hàm
  }, []); // Mảng rỗng đảm bảo chỉ chạy 1 lần

  // Hàm thêm từ khóa mới và tìm kiếm
  const addSearch = async (search, page = 0, isReset = false) => {
    if (!search.trim()) return;

    // Thêm vào lịch sử
    let newHistory = [search, ...historySearch.filter(item => item !== search)];
    if (newHistory.length > limit) newHistory = newHistory.slice(0, limit);

    setHistorySeach(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

    // Gọi API tìm kiếm nhà hàng: getRestaurant(lng, lat, categoryId, searchText, page)
    try {
      await fetchRestaurants("", search.trim(), page, isReset);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm nhà hàng:", error);
    }
  };

  // Hàm xóa lịch sử
  const clearHistorySearch = () => {
    setHistorySeach([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { 
    historySearch, 
    hotSearch, 
    addSearch, 
    clearHistorySearch,
    restaurants,
    isLoading
  };
}
