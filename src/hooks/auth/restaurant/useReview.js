import { useState } from "react";
import { getListReview , restaurantReplyUser , getListReviewSort} from "../../../api/restaurant/reviewAPI";

export default function useReview(){
    const listReview = async () => {
        const response = await getListReview();
        if(!response.ok){
            throw new Error(`Failed to fetch get list review new : ${response.status}`);
        }
        return response;
    }

      const replyUser = async ({id , replyText}) => {
        const response = await restaurantReplyUser({id , replyText});
        if(!response.ok){
            throw new Error(`Failed to fetch reply user : ${response.status}`);
        }
        return response;
    }

    
      const listReviewSort = async (filter) => {
        const response = await getListReviewSort(filter);
        if(!response.ok){
            throw new Error(`Failed to fetch reply user : ${response.status}`);
        }
        return response;
    }

   return {listReview , replyUser , listReviewSort};
}
 