import { restaurantDetail } from "../../../api/auth/authApi";

export function useRestaurant() {

    const fetchRestaurantDetails = async () => {
        const response = await restaurantDetail();
        if (!response.ok) throw new Error("Failed to fetch restaurant details");
        return await response.json();
    }

    return { fetchRestaurantDetails };
    
}