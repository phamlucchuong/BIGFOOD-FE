import { useState, useEffect } from "react";
import { addNewSearch, getHotSearchList } from "../../api/common/searchApi";

const STORAGE_KEY = "history_search";

export default function useSearch(limit = 5) {
  const [historySearch, setHistorySeach] = useState([]);
  const [hotSearch, setHotSearch] = useState([]);

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

  // Hàm thêm từ khóa mới
  const addSearch = async (search) => {
    if (!search.trim()) return;

    let newHistory = [search, ...historySearch.filter(item => item !== search)];
    if (newHistory.length > limit) newHistory = newHistory.slice(0, limit);

    setHistorySeach(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

    // ✅ Cải thiện: Gọi API với xử lý lỗi
    try {
      await addNewSearch(search.trim());
    } catch (error) {
      console.error("Lỗi khi thêm từ khóa tìm kiếm mới:", error);
    }
  };

  // Hàm xóa lịch sử
  const clearHistorySearch = () => {
    setHistorySeach([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { historySearch, hotSearch, addSearch, clearHistorySearch };
}
