import { 
  ShoppingBag, Menu ,Search
} from 'lucide-react';
import { useState , useEffect } from "react"; 
import  {useRestaurant}  from "../../../hooks/auth/restaurant/useRestaurant"

export default function Header  ({ setSidebarOpen })  {
   const [restaurant, setRestaurant] = useState({});
    const { fetchRestaurantDetails} = useRestaurant();
   useEffect(() => {
      const loadData = async () => {
        try {
          const data = await fetchRestaurantDetails();
          setRestaurant(data.results);
        } catch (error) {
          console.error(error);
        }
      };
      loadData();
    }, []);
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30">
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu size={24} />
      </button>
      <div className="flex-1 max-w-xl ">
         <div className="flex items-center gap-3 flex-1 ml-4">
        <h1 className="text-lg font-semibold text-gray-800 truncate">{restaurant.restaurantName || "Nhà Hàng"}</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={restaurant.avatar} alt="Avatar"
         className="w-10 h-10 rounded-full border-2 border-orange-100 object-cover flex-shrink-0"  />
          <span className="hidden md:block font-medium"></span>
        </div>
      </div>
    </header>
  );
};