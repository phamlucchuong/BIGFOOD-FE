import { getToken } from "../../services/localStorageService";


async function restaurantDetail() {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/bigfood/api/restaurants/detail`, {
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
    const response = await fetch(`http://localhost:8080/bigfood/api/restaurants/update`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body : formData
       
    });
    return response.json();
}

async function fetchCategoriesFoods() {
    const response = await fetch("http://localhost:8080/bigfood/api/food-categories/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
    });
    return response.json();
}

async function addCategory(name , iconIndex) {
    const response = await fetch(`http://localhost:8080/bigfood/api/food-categories`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`},
        body: JSON.stringify({name , iconIndex}),
    });
    return response.json();
}
async function updateCategory({id , name , iconIndex}) {
    const response = await fetch(`http://localhost:8080/bigfood/api/food-categories`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`},
        body: JSON.stringify({id , name , iconIndex}),
    });
    return response.json();
}

async function deleteCategory(id) {
    const response = await fetch(`http://localhost:8080/bigfood/api/food-categories/${id}`, {
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
    formData.append("price", foodData.price);
    formData.append("description", foodData.description || "");
    if (foodData.imageFile) {
        formData.append("image", foodData.imageFile);
    } else if (foodData.image && typeof foodData.image === "string") {
        const res = await fetch(foodData.image);
        const blob = await res.blob();
        formData.append("image", blob, `image_${Date.now()}.png`);
    }
    const response = await fetch(`http://localhost:8080/bigfood/api/foods/${foodData.categoryId}`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${getToken()}`
        },
       body: formData
    });
    return response.json();
}
async function getListFood() {
    const response = await fetch(`http://localhost:8080/bigfood/api/foods/all`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`}
    });
    return response.json();
}
async function getListFoodByCategoryId(categoryId) {
    const response = await fetch(`http://localhost:8080/bigfood/api/foods/list?categoryId=${categoryId}`, {
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
    formData.append("price", foodData.price);
    formData.append("available" ,foodData.available);
    if (foodData.imageFile) {
        formData.append("image", foodData.imageFile);
    } else if (foodData.image && typeof foodData.image === "string") {
        const res = await fetch(foodData.image);
        const blob = await res.blob();
        formData.append("image", blob, `image_${Date.now()}.png`);
    }

      const response = await fetch(`http://localhost:8080/bigfood/api/foods/update`, {
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
    const response = await fetch(`http://localhost:8080/bigfood/api/foods/${id}`, {
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
      const response = await fetch(`http://localhost:8080/bigfood/api/foods/update`, {
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
export { restaurantDetail ,fetchCategoriesFoods , addCategory , updateCategory , deleteCategory ,
         createFood , getListFood, updateFood , deleteFood , updateFoodIsAvailable ,getListFoodByCategoryId ,
        updateRes };