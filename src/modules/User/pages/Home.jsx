import { useState, useEffect } from "react";
import handleLoadCategories from "../../../hooks/data/useFoodCategory";
import TextButton from "../../../components/common/buttons/TextButton";
import CollectionSection from "../../../sections/CollectionSection";
import useHome from "../../../hooks/data/useRestaurant";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const { restaurants, fetchRestaurants, totalPages } = useHome();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleLoadCategories();
      setCategories(data);
    };
    fetchData();
    fetchRestaurants(0, true);
  }, []);

  const handleFetchRestaurants = async () => {
    const nextPage = page + 1;
    await fetchRestaurants(nextPage, false);
    setPage(nextPage);
  }

  return (
    <>
      <CollectionSection title="Bộ sưu tập món ăn" cards={categories} typeCard={true} />
      <CollectionSection title="Quán ngon quanh đây" cards={restaurants} typeCard={false} />

      {/* Chỉ hiện nút nếu chưa đến trang cuối cùng */}
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
