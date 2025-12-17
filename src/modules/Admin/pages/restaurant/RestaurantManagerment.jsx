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

  const restaurantRequestData = [
    {
      id: 101,
      user: {
        image: "/src/assets/images/user_default.png",
        name: "Kaiya George",
        email: "kaiya.g@biz.com",
      },
      restaurantName: "Kaiya's Kitchen",
      location: "Quận 1, TP HCM",
      category: "Món Á-Âu",
      startedDate: "01/11/2025",
      totalOrders: 10,
      ratings: 5,
    },
    {
      id: 102,
      user: {
        image: "/src/assets/images/user_default.png",
        name: "Abram Schleifer",
        email: "abram@digital.co",
      },
      restaurantName: "Digital Delights",
      location: "Quận 3, TP HCM",
      category: "Đồ ăn nhanh, Đồ uống",
      startedDate: "05/11/2025",
      totalOrders: 12,
      ratings: 4.5,
    },
  ];

  return (
    <>
      <PageMeta
        title="Danh sách nhà hàng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Danh sách nhà hàng" />
      <div className="space-y-6">
        <div className="flex justify-between mx-10 mb-6">
          <CategoryCard
            item={{
              name: "Tất cả",
            }}
            onClick={() => console.log("Category ID: All")}
            size="sm"
          ></CategoryCard>

          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
              onClick={() => console.log("Category ID:", item.id)}
              size="sm"
            />
          ))}
        </div>

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
          actions={[
            { name: "Cảnh báo vi phạm", icon: <CircleAlert size={18} /> },
            { name: "Thông tin chi tiết", icon: <Info size={18} /> },
          ]}
        />
      </div>
    </>
  );
}
