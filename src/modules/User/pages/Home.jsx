import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handleLoadCategories from "../../../hooks/data/useFoodCategory";
import TextButton from "../../../components/common/buttons/TextButton";
import CollectionSection from "../../../sections/CollectionSection";
import useHome from "../../../hooks/data/useRestaurant";
import CategoryCard from "../../../components/common/cards/CategoryCard";
import RestaurantCard from "../../../components/common/cards/RestaurantCard";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { restaurants, fetchRestaurants, totalPages } = useHome();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleLoadCategories();
      setCategories(data);
    };
    fetchData();
    fetchRestaurants("", "", 0, true);
  }, []);

  const handleFetchRestaurants = async () => {
    const nextPage = page + 1;
    await fetchRestaurants("", "", nextPage, false);
    setPage(nextPage);
  };

  function handleCategoryClick(category) {
    navigate(`/collection?id=${category.id}&name=${category.name}`);
  }

  function handleRestaurantClick(restaurant) {
    navigate(`/restaurant-detail?id=${restaurant.id}&name=${restaurant.restaurantName}`);
  }

  return (
    <div className="mb-12">
      <CollectionSection
        title="Bộ sưu tập món ăn"
        size="lg"
        data={categories}
        CardComponent={CategoryCard}
        onItemClick={handleCategoryClick}
      />
      <CollectionSection
        title="Quán ngon quanh đây"
        size="lg"
        data={restaurants}
        CardComponent={RestaurantCard}
        onItemClick={handleRestaurantClick}
      />

      {/* Chỉ hiện nút nếu chưa đến trang cuối cùng */}
      {page < totalPages - 1 && (
        <TextButton
          name={"Xem thêm"}
          onClick={handleFetchRestaurants}
          className="px-[140px] py-2 mt-9 border border-blue-500 text-blue-500 text-md font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer"
        />
      )}
    </div>
  );
}
