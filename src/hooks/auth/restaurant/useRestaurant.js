import { restaurantDetail, fetchCategoriesFoods, addCategory, updateCategory, deleteCategory ,
     createFood , getListFood , updateFood , deleteFood , updateFoodIsAvailable , getListFoodByCategoryId , updateRes ,
     getListFoodBestSell , getListFoodLeast , getListOrderNew
    } from "../../../api/restaurant/restaurantAPI";

export function useRestaurant() {
    const fetchRestaurantDetails = async () => {
        const response = await restaurantDetail();
        if (!response.ok) throw new Error("Failed to fetch restaurant details");
        return response;
    }

    const updateRestaurant = async (restaurant) => {
        const formData = new FormData();
        formData.append("restaurantName", restaurant.restaurantName);
        formData.append("address", restaurant.address);
        formData.append("phone", restaurant.phone);
        formData.append("email", restaurant.email);
        formData.append("nameBank", restaurant.nameBank);
        formData.append("bankNumber", restaurant.bankNumber);
        formData.append("bankAccountName", restaurant.bankAccountName);

        if (restaurant.avatar instanceof File) {
            formData.append("avatar", restaurant.avatar);
        } else if (typeof restaurant.avatar === "string") {
            const res = await fetch(restaurant.avatar);
            const blob = await res.blob();
            formData.append("avatar", blob, `avatar_${Date.now()}.png`);
        }

        if (restaurant.banner instanceof File) {
            formData.append("banner", restaurant.banner);
        } else if (typeof restaurant.banner === "string") {
            const res = await fetch(restaurant.banner);
            const blob = await res.blob();
            formData.append("banner", blob, `banner_${Date.now()}.png`);
        }
        const response = await updateRes(formData);
        if (!response.ok) {
            throw new Error("Failed to update restaurant");
        }
        return response;
    };
    
    
    const getCategorieFoods = async () => {
        const response = await fetchCategoriesFoods();
         if (!response.ok) {
            throw new Error(`Failed to fetch category food: ${response.status}`);
        }
        return response;
    }

    const createCategory = async (name, iconIndex) => {
        const response = await addCategory(name, iconIndex);
         if (!response.ok) {
            throw new Error(`Failed to fetch create restaurant : ${response.status}`);
        }
        return response;
    }

    const editCategory = async (category) => {
        const response = await updateCategory({ id :category.id, name : category.name, iconIndex : category.iconIndex });
         if (!response.ok) {
            throw new Error(`Failed to fetch edit category : ${response.status}`);
        }
        return response;
    }

    const removeCategory = async (id) => {
        const response = await deleteCategory(id);
         if (!response.ok) {
            throw new Error(`Failed to fetch delete category : ${response.status}`);
        }
        return response;
    }

    const addFood = async ( foodData) => {
        const response = await createFood(foodData);
            if (!response.ok) {
            throw new Error(`Failed to fetch create food : ${response.status}`);
        }
        return response;
    }

    const listFood = async () => {
        const response = await getListFood();    
        if (!response.ok) {
            throw new Error(`Failed to fetch list food : ${response.status}`);
        }
        return response;
    }
    const removeFood = async (id) => {
        const response = await deleteFood(id);
            if (!response.ok) {
            throw new Error(`Failed to fetch create food : ${response.status}`);
        }
        return response;
    }

   const updateFoodItem = async (foodData) => {
        try {
            const response = await updateFood(foodData);
            return response;
        } catch (error) {
            console.error('Error updating food:', error);
            throw error;
        }
    };
    
    const updateFoodItemIsAvailable = async (foodData) => {
        try {
            const response = await updateFoodIsAvailable(foodData);
            return response;
        } catch (error) {
            console.error('Error updating food:', error);
            throw error;
        }
    };
  
    const listFoodByCatogoryId = async (categoryId) => {
        try {
            const response = await getListFoodByCategoryId(categoryId);
            return response;
        } catch (error) {
            console.error('Error updating food:', error);
            throw error;
        }
    };

    const listFoodBestSell = async() =>{
        const response = await getListFoodBestSell();
        if(!response.ok){
            throw new Error(`Failed to fetch get top 5 food best seller: ${response.status}`);
        }
        return response;
    }
    const listFoodLeast= async() =>{
        const response = await getListFoodLeast();
        if(!response.ok){
            throw new Error(`Failed to fetch get top 5 food least: ${response.status}`);
        }
        return response;
    }
     const listOrderNew = async() =>{
        const response = await getListOrderNew();
        if(!response.ok){
            throw new Error(`Failed to fetch get top 5 order new : ${response.status}`);
        }
        return response;
    }



    return { 
        fetchRestaurantDetails, 
        getCategorieFoods,
        createCategory,
        editCategory,
        removeCategory,
        addFood ,
        listFood,
        removeFood ,
        updateFoodItem,
        updateFoodItemIsAvailable,
        listFoodByCatogoryId,
        updateRestaurant ,
        listFoodBestSell,
        listFoodLeast ,
        listOrderNew
    };
}