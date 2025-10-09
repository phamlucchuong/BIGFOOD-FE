import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/common/cards/CategoryCard";
import FoodCard from "../components/common/cards/FoodCard";

export default function CollectionSection({ title, cards, typeCard }) {

  const navigate = useNavigate();

  function handleSubmit() {
    // e.preventDefault();
    // Giả sử login thành công
    navigate("/restaurant-detail");
  }

  return (
    <div className="mb-8 mx-[200px] mt-12">
      <h1 className="text-5xl mb-7">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((item, index) => (
          typeCard
            ? <CategoryCard key={index}
              {...item}
              onclick={() => { console.log("key: " + index) }}
            />
            : <FoodCard key={index}
              {...item}
              onClick={handleSubmit}
            />
        ))}
      </div>
    </div>
  );
}