import { getToken } from "../../services/localStorageService";
import { API_BASE_URL } from '../../config/config';

async function getListReview(){
     const response = await fetch(`${API_BASE_URL}/reviews/restaurant/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    return response.json();
}
async function restaurantReplyUser({id , replyText}){
     const response = await fetch(`${API_BASE_URL}/reviews/${id}/reply`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        body :JSON.stringify({replyText})
    });
    return response.json();
}

async function getListReviewSort(filter){
     const response = await fetch(`${API_BASE_URL}/reviews/restaurant/filter?sort=${filter}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    return response.json();
}


export {getListReview , restaurantReplyUser , getListReviewSort}