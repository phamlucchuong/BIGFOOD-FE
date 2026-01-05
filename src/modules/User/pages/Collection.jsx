import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CollectionSection from "../../../sections/CollectionSection";
import useHome from "../../../hooks/data/useRestaurant";
import { useState } from "react";
import TextButton from "../../../components/common/buttons/TextButton";
import RestaurantCard from "../../../components/common/cards/RestaurantCard";
import { useNavigate } from "react-router-dom";

export default function Collection() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const categoryName = searchParams.get("name");
  const [page, setPage] = useState(0);

  const { restaurants, fetchRestaurants, totalPages } = useHome();

  useEffect(() => {
    if (categoryId) {
      const fetchData = async () => {
        await fetchRestaurants(categoryId, "", 0, true);
      };
      fetchData();
    }
  }, []);

  const handleFetchRestaurants = async () => {
    const nextPage = page + 1;
    await fetchRestaurants(categoryId, "", nextPage, false);
    setPage(nextPage);
  };

  const navigate = useNavigate();
  function handleRestaurantClick(restaurant) {
    navigate(
      `/restaurant-detail?id=${restaurant.restaurantId}&name=${restaurant.restaurantName}`
    );
  }

  return (
    <>
      <CollectionSection
        title={categoryName || "Bộ sưu tập"}
        data={restaurants}
        CardComponent={RestaurantCard}
        onItemClick={handleRestaurantClick}
      />
      {page < totalPages - 1 && (
        <TextButton
          name={"Xem thêm"}
          onClick={handleFetchRestaurants}
          className="px-[140px] py-2 mt-9 border border-blue-500 text-blue-500 text-md font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer"
        />
      )}
    </>
  );
}
