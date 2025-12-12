import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/common/cards/CategoryCard";
import RestaurantCard from "../components/common/cards/RestaurantCard";

export default function CollectionSection({ title, cards, typeCard }) {

  const navigate = useNavigate();

  function handleSubmit(restaurantId, restaurantName) {
    navigate("/restaurant-detail?name=" + restaurantName);
  }

  return (
    <div className="mb-8 mx-[200px] mt-12">
      <h1 className="text-5xl mb-7">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((item) => (
          typeCard
            ? <CategoryCard key={item.id}
              {...item}
              onClick={() => console.log("Category ID:", item.id)}
            />
            : <RestaurantCard key={item.restaurantId}
              item={item}
              onClick={() => handleSubmit(item.restaurantId, item.restaurantName)}
            />
        ))}
      </div>
    </div>
  );
}