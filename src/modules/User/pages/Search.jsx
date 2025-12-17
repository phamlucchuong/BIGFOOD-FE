import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CollectionSection from "../../../sections/CollectionSection";
import useHome from "../../../hooks/data/useRestaurant";
import { useState } from "react";
import TextButton from "../../../components/common/buttons/TextButton";
import RestaurantCard from "../../../components/common/cards/RestaurantCard";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [page, setPage] = useState(0);
  const { restaurants, fetchRestaurants, totalPages } = useHome();

  const handleSearchTail = () => {
    if (localStorage.getItem("user_address") !== null) {
      return ` gần ${localStorage.getItem("user_address")}`;
    } else return "";
  };

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        await fetchRestaurants("", query, 0, true);
      };
      fetchData();
    }
  }, []);

  const handleFetchRestaurants = async () => {
    const nextPage = page + 1;
    await fetchRestaurants("", query, nextPage, false);
    setPage(nextPage);
  };

  const navigate = useNavigate();
    function handleRestaurantClick(restaurant) {
    navigate(`/restaurant-detail?id=${restaurant.restaurantId}&name=${restaurant.restaurantName}`);
  }

  return (
    <>
      <CollectionSection
        title={`Kết quả tìm kiếm cho`}
        highlight={query}
        size="sm"
        tail={handleSearchTail()}
        color={"#ff4c4cff"}
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
