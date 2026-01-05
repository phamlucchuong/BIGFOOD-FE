import { getToken } from "../../services/localStorageService";
import { API_BASE_URL } from '../../config/config';


async function restaurantDetail() {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/restaurants/detail`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
       
    });
    return response.json();
}

async function updateRes(formData) {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/restaurants/update`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body : formData
       
    });
    return response.json();
}

async function fetchCategoriesFoods() {
    const response = await fetch(`${API_BASE_URL}/food-categories/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
    });
    return response.json();
}

async function addCategory(name , iconIndex) {
    const response = await fetch(`${API_BASE_URL}/food-categories`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`},
        body: JSON.stringify({name , iconIndex}),
    });
    return response.json();
}
async function updateCategory({id , name , iconIndex}) {
    const response = await fetch(`${API_BASE_URL}/food-categories`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`},
        body: JSON.stringify({id , name , iconIndex}),
    });
    return response.json();
}

async function deleteCategory(id) {
    const response = await fetch(`${API_BASE_URL}/food-categories/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}

async function createFood(foodData) {
    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description || "");
    foodData.foodOptions.forEach((opt, index) => {
        formData.append(`foodOptions[${index}].name`, opt.name);
        formData.append(`foodOptions[${index}].price`, opt.price);
        formData.append(`foodOptions[${index}].defaultPrice`, opt.defaultPrice);
    });
    if (foodData.imageFile) {
        formData.append("image", foodData.imageFile);
    } else if (foodData.image && typeof foodData.image === "string") {
        const res = await fetch(foodData.image);
        const blob = await res.blob();
        formData.append("image", blob, `image_${Date.now()}.png`);
    }
    const response = await fetch(`${API_BASE_URL}/foods/${foodData.categoryId}`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${getToken()}`
        },
       body: formData
    });
    return response.json();
}
async function getListFood(page) {
    const response = await fetch(`${API_BASE_URL}/foods/all/page/${page}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}
async function getListFoodByCategoryId(categoryId) {
    const response = await fetch(`${API_BASE_URL}/foods/list?categoryId=${categoryId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}
async function updateFood(foodData) {
      const formData = new FormData();
    formData.append("foodId", foodData.idFood);
    formData.append("name", foodData.name);
    formData.append("categoryId", foodData.categoryId);
    formData.append("description", foodData.description || "");
    formData.append("available" ,foodData.available);
    foodData.foodOptions.forEach((opt, index) => {
        formData.append(`foodOptions[${index}].name`, opt.name);
        formData.append(`foodOptions[${index}].price`, opt.price);
        formData.append(`foodOptions[${index}].defaultPrice`, opt.defaultPrice);
    });
    if (foodData.imageFile) {
        formData.append("image", foodData.imageFile);
    } else if (foodData.image && typeof foodData.image === "string") {
        const res = await fetch(foodData.image);
        const blob = await res.blob();
        formData.append("image", blob, `image_${Date.now()}.png`);
    }

      const response = await fetch(`${API_BASE_URL}/foods/update`, {
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${getToken()}`
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error(`Failed to update food: ${response.status}`);
    }
    return response.json();
}
async function deleteFood(id) {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}

async function updateFoodIsAvailable(foodData) {
    const formData = new FormData();
    formData.append("foodId", foodData.id)
    formData.append("available" ,foodData.available);
      const response = await fetch(`${API_BASE_URL}/foods/update`, {
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${getToken()}`
        },
        body: formData
    });
    if (!response.ok) {
        throw new Error(`Failed to update food: ${response.status}`);
    }
    return response.json();
}

async function  getListFoodBestSell(){
     const response = await fetch(`${API_BASE_URL}/foods/list/best-sell`, {
        method: "GET",
        headers: { 
             "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}
async function  getListFoodLeast(){
     const response = await fetch(`${API_BASE_URL}/foods/list/least-sell`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}

async function  getListOrderNew(){
     const response = await fetch(`${API_BASE_URL}/orders/restaurant/list-order-new`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}

export { restaurantDetail ,fetchCategoriesFoods , addCategory , updateCategory , deleteCategory ,
         createFood , getListFood, updateFood , deleteFood , updateFoodIsAvailable ,getListFoodByCategoryId ,
        updateRes , getListFoodBestSell , getListFoodLeast , getListOrderNew };