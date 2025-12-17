import { useEffect } from "react";
import CollectionSection from "../../../sections/CollectionSection";
import { useState } from "react";
import TextButton from "../../../components/common/buttons/TextButton";
import OrderCard from "../../../components/common/cards/OrderCard";
import useOrder from "../../../hooks/data/useOrder";

export default function OrderAll() {
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState(false);
  const { orderHistory, getAllOrder, totalPages, total } = useOrder();

  useEffect(() => {
    const fetchData = async () => {
      await getAllOrder(activeTab, 0, true);
    };
    fetchData();
  }, []);

  const handleFetchOrders = async (status) => {
    if (status !== activeTab) {
      setActiveTab(status);
      setPage(0);
      await getAllOrder(status, 0, true);
      return;
    }
    const nextPage = page + 1;
    await getAllOrder(activeTab, nextPage, false);
    setPage(nextPage);
  };

  return (
    <>
      <div className="flex gap-3 mb-3 justify-start mx-[200px] py-6 border-b">
        <button
          onClick={() => handleFetchOrders(false)}
          className={`px-4 py-2 rounded-full font-medium text-xs transition ${
            activeTab === false
              ? "bg-gray-200 text-gray-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          CHƯA GIAO
          {!activeTab && <span className="ml-2 text-xs">{total}</span>}
        </button>
        <button
          onClick={() => handleFetchOrders(true)}
          className={`px-4 py-1 rounded-full font-medium text-xs transition ${
            activeTab === true
              ? "bg-blue-900 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          ĐÃ GIAO {activeTab && <span className="ml-2 text-xs">{total}</span>}
        </button>
      </div>

      <div className="bg-blue-50 py-[3px] pb-12">
        <CollectionSection
          size="sm"
          grid={1}
          data={orderHistory}
          CardComponent={OrderCard}
        />

        {page < totalPages - 1 && (
          <TextButton
            name={"Xem thêm"}
            onClick={() => handleFetchOrders(activeTab)}
            className="px-[140px] py-2 mt-9 border border-blue-500 text-blue-500 text-md font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
