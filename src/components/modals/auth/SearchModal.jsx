import { useState } from "react";
import { search, hotMeal } from "../../../dataSample/food";
import TextLabel from "../../common/labels/TextLabel";
import ModalWrapper from "../ModalWrapper";


export default function SearchModal({ onClose }) {
    const [searchHistory, setSearchHistory] = useState(search);

    const handleClearSearch = () => {
        setSearchHistory([]);
    };

    return (
        <ModalWrapper onClose={onClose}>
            <div className="flex items-center border border-gray-300 focus-within:border-blue-500 rounded-lg px-3 py-2 w-full">
                <i className="fa fa-search text-gray-400 mr-2"></i>
                <input
                    type="text"
                    placeholder="Tìm món ăn hoặc nhà hàng"
                    className="flex-1 focus:outline-none"
                />
            </div>

            {
                searchHistory.length > 0 &&
                <div className="mt-5 pb-5 border-b border-gray-300">
                    <div className="flex justify-between">
                        <h3 className="font-medium">TÌM KIẾM GẦN ĐÂY</h3>
                        <span className="font-medium text-blue-500 cursor-pointer" onClick={handleClearSearch}>Xóa hết</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {
                            search.map((item, index) => (
                                <TextLabel key={index} name={item} onclick={() => console.log(item)}></TextLabel>
                            ))
                        }
                    </div>
                </div>
            }

            <div className="mt-5">
                <h3 className="font-medium">MÓN GÌ ĐANG HOT</h3>
                <div className="flex flex-wrap gap-3 mt-4">
                    {
                        hotMeal.map((item, index) => (
                            <TextLabel key={index} name={item} onclick={() => console.log(item)}></TextLabel>
                        ))
                    }
                </div>
            </div>
        </ModalWrapper>
    );
}
