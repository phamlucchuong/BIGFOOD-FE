import { useState, useEffect } from "react";
import { food } from "../../../dataSample/food";
import handleLoadCategories from "../../../hooks/data/useFoodCategory";
import TextButton from "../../../components/common/buttons/TextButton";
import CollectionSection from "../../../sections/CollectionSection";
import category from "../../../dataSample/foodCategory";

export default function Home() {
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await handleLoadCategories();
  //     setCategories(data);
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      <CollectionSection title="Bộ sưu tập món ăn" cards={category} typeCard={true} />
      <CollectionSection title="Quán ngon quanh đây" cards={food} typeCard={false} />

      <TextButton
        name={"Xem thêm"}
        onClick={() => console.log("show more")}
        className="px-[140px] py-2 mt-9 border border-blue-500 text-blue-500 text-md font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer"
      />
    </>
  );
}
