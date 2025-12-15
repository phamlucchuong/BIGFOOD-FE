import { useEffect } from "react";
import CollectionSection from "../../../sections/CollectionSection";
import { useState } from "react";
import TextButton from "../../../components/common/buttons/TextButton";
import OrderCard from "../../../components/common/cards/OrderCard";
import useOrder from "../../../hooks/data/useOrder";

export default function OrderAll() {
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState("pending");
  const { orderHistory, getAllOrder, totalPages } = useOrder();

  useEffect(() => {
    const fetchData = async () => {
      await getAllOrder(0, true);
    };
    fetchData();
  }, []);

  const handleFetchOrders = async () => {
    const nextPage = page + 1;
    await getAllOrder(nextPage, false);
    setPage(nextPage);
  };

  return (
    <>
      <div className="flex gap-3 mb-3 justify-start mx-[200px] py-6 border-b">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-full font-medium text-xs transition ${
            activeTab === "pending"
              ? "bg-gray-200 text-gray-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          CHƯA GIAO <span className="ml-2 text-xs">0</span>
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`px-4 py-1 rounded-full font-medium text-xs transition ${
            activeTab === "delivered"
              ? "bg-blue-900 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          ĐÃ GIAO
        </button>
      </div>

      <div className="bg-blue-50 py-[3px]">
        <CollectionSection
          size="sm"
          grid={1}
          data={orderHistory}
          CardComponent={OrderCard}
        />

        {page < totalPages - 1 && (
          <TextButton
            name={"Xem thêm"}
            onClick={handleFetchOrders}
            className="px-[140px] py-2 mt-9 border border-blue-500 text-blue-500 text-md font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
