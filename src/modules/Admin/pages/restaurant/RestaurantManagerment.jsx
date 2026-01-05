import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import handleLoadCategories from "../../../../hooks/data/useFoodCategory";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { CircleAlert, Info } from "lucide-react";
import TableData from "../../components/tables/TableData";
import CategoryCard from "../../../../components/common/cards/CategoryCard";
import useRestaurant from "../../../../hooks/data/useRestaurant";

export default function RestaurantManagerment() {
  const [categories, setCategories] = useState([]);
  const { restaurants, getRestaurantTag, currentPage ,totalPages ,pageSize, total } = useRestaurant();
  useEffect(() => {
    const fetchData = async () => {
      const data = await handleLoadCategories();
      setCategories(data);
      await getRestaurantTag("" , 1);
    };
    fetchData();
  }, []);

  const handleListRestaurant = async (page)  =>{
     getRestaurantTag("" , page);
  }

  const handleRestaurantDetail = (restaurantId, restaurantName) => {
    console.log("Restaurant ID:", restaurantId);
    window.open(
      `/restaurant-detail?id=${encodeURIComponent(
        restaurantId
      )}&name=${encodeURIComponent(restaurantName)}`,
      "_blank"
    );
  };

  const handleFetchByCategory = async (categoryId) => {
    await getRestaurantTag(categoryId, 1);
  };

  return (
    <>
      <PageMeta
        title="Danh sách nhà hàng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Danh sách nhà hàng" />
      <div className="space-y-6">
        {categories.length > 0 && (
          <div className="flex justify-between mx-10 mb-6">
            <CategoryCard
              item={{
                name: "Tất cả",
              }}
              onClick={() => handleFetchByCategory("")}
              size="sm"
            ></CategoryCard>

            {categories.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onClick={() => handleFetchByCategory(item.id)}
                size="sm"
              />
            ))}
          </div>
        )}

        <TableData
          mode="restaurants"
          data={restaurants}
          headers={[
            "Tên Nhà hàng",
            "Ngày hoạt động",
            "Loại hình",
            "Tổng đơn hàng",
            "Đánh giá",
            "Thao tác",
          ]}
          onAction={handleRestaurantDetail}
          actions={[
            { name: "Cảnh báo vi phạm", icon: <CircleAlert size={18} /> },
            { name: "Thông tin chi tiết", icon: <Info size={18} /> },
          ]}
        />
             {/* Pagination */}
                  <div className="bg-white p-4 rounded-xl  flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Hiển thị{" "}
                      {total > 0 ? (currentPage - 1) * pageSize + 1 : 0} đến{" "}
                      {Math.min(currentPage * pageSize, total)} trong {total} nhà hàng
                    </div>
        
                    <div className="flex gap-2 items-center">
                      {/* Prev */}
                      <button
                        onClick={() => {
                          if (currentPage > 1) {
                            handleListRestaurant(currentPage - 1);
                          }
                        }}
                        disabled={currentPage === 1}
                        className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>
        
                      {/* Page numbers */}
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
        
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
        
                          // Guard an toàn
                          if (pageNum < 1 || pageNum > totalPages) return null;
        
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handleListRestaurant(pageNum)}
                              className={`px-3 py-1 rounded-lg ${
                                currentPage === pageNum
                                  ? "bg-orange-600 text-white"
                                  : "border hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
        
                      {/* Next */}
                      <button
                        onClick={() => {
                          if (currentPage < totalPages) {
                            handleListRestaurant(currentPage + 1);
                          }
                        }}
                        disabled={currentPage === totalPages}
                        className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
      </div>
    </>
  );
}
