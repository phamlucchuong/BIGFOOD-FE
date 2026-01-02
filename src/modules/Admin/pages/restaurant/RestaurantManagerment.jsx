import React, { useState, useEffect } from "react";
import handleLoadCategories from "../../../../hooks/data/useFoodCategory";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { CircleAlert, Info } from "lucide-react";
import TableData from "../../components/tables/TableData";
import CategoryCard from "../../../../components/common/cards/CategoryCard";
import useRestaurant from "../../../../hooks/data/useRestaurant";

export default function RestaurantManagerment() {
  const [categories, setCategories] = useState([]);
  const { restaurants, getRestaurantTag, totalPages } = useRestaurant();
  useEffect(() => {
    const fetchData = async () => {
      const data = await handleLoadCategories();
      setCategories(data);
      await getRestaurantTag();
    };
    fetchData();
  }, []);

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
    await getRestaurantTag(categoryId);
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
      </div>
    </>
  );
}
