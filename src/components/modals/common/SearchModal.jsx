import { useState, useRef } from "react";
import TextLabel from "../../common/labels/TextLabel";
import ModalWrapper from "../ModalWrapper";
import useSearch from "../../../hooks/data/useSearch";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ onClose }) {
  const [page, setPage] = useState(0);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const { historySearch, hotSearch, addSearch, clearHistorySearch } = useSearch(5);
  const navigate = useNavigate();

  const isTyping = query.trim() !== "";

  const handleClearInput = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSearch = (value = query) => {
    if (!value.trim()) return;
    if (page == 0) {
      addSearch(value, page, true);
    } else {
      addSearch(value, page, false);
    }
    const nextPage = page + 1;
    setPage(nextPage);
    console.log("Tìm kiếm:", value);
    setQuery("");
    inputRef.current?.focus();
    onClose();
    navigate(`/search?query=${value}`);
  };

  return (
    <ModalWrapper onClose={onClose}>
      {/* Ô tìm kiếm */}
      <div className="flex items-center border border-gray-300 focus-within:border-blue-500 rounded-lg px-3 py-[5px] w-full">
        <i className="fa fa-search text-gray-400 mr-2"></i>

        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm món ăn hoặc nhà hàng"
          className="flex-1 focus:outline-none text-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {isTyping && (
          <i
            className="fa-solid fa-circle-xmark mr-2 cursor-pointer text-gray-500 text-sm"
            onClick={handleClearInput}
          ></i>
        )}
      </div>

      {/* Lịch sử tìm kiếm gần đây */}
      {historySearch.length > 0 && (
        <div className="text-sm mt-5 pb-5 border-b border-gray-300">
          <div className="flex justify-between">
            <h3 className="font-medium">TÌM KIẾM GẦN ĐÂY</h3>
            <span
              className="font-medium text-blue-500 cursor-pointer"
              onClick={clearHistorySearch}
            >
              Xóa hết
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {historySearch.map((item, index) => (
              <TextLabel
                key={index}
                name={item}
                onclick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Món hot */}
      <div className="mt-5">
        <h3 className="text-sm font-medium">MÓN GÌ ĐANG HOT</h3>
        <div className="flex flex-wrap gap-3 mt-4">
          {hotSearch.map((item, index) => (
            <TextLabel
              key={index}
              name={item.content}
              onclick={() => {
                setQuery(item.content);
                handleSearch(item.content);
              }}
            />
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
}
