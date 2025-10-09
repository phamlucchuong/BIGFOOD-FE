
import { food } from "../dataSample/food";
import category from "../dataSample/foodCategory";
import TextButton from "../components/common/buttons/TextButton";
import CollectionSection from "../sections/CollectionSection";

export default function Home() {
  return (
    <>
      <CollectionSection title="Bộ sưu tập món ăn" cards={category} typeCard={true} />
      <CollectionSection title="Quán ngon quanh đây" cards={food} typeCard={false} />

      <TextButton 
        name={"Xem thêm"} 
        onClick={() => console.log("show more")} 
        className="px-[175px] py-3 mt-9 border border-blue-500 text-blue-500 text-xl font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer" 
      />
    </>
  );
}
