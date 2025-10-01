
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import CollectionSection from "../../sections/CollectionSection";
import category from "../../dataSample/foodCategory";
import food from "../../dataSample/food";
import Footer from "../../components/Footer/Footer";
import TextButton from "../../components/Buttons/TextButton";
import LocationInput from "../../components/LocationInput/LocationInput";

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150); // scroll quá 150px thì sticky
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header isSticky={isSticky} />
      
      {/* Chỉ render input ở giữa màn hình nếu chưa sticky */}
      {!isSticky && <LocationInput className="mt-[200px]" />}
      
      <CollectionSection title="Bộ sưu tập món ăn" cards={category} typeCard={true} />
      <CollectionSection title="Quán ngon quanh đây" cards={food} typeCard={false} />

      <TextButton 
        name={"Xem thêm"} 
        onClick={() => console.log("show more")} 
        className="px-[175px] py-3 mt-9 border border-blue-500 text-blue-500 text-xl font-bold rounded-xl hover:bg-blue-50 outline-none focus:outline-none active:opacity-70 transition cursor-pointer" />
      
      <Footer />
    </>
  );
}
