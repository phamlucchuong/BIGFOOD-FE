import {getListOrder , getOrderDetail , updateStatusOrder , 
    getOrderRestaurantByStatus , getRestaurantStatistical , getRestaurantStatisticalAndSort} from "../../../api/restaurant/orderAPI"

export function useOrder(){
   const listOrderMyRestaurant = async () =>{
       const response = await getListOrder();
       if(!response.ok){
          throw new Error(`Failed to fetch list order : ${response.status}`);
       }
       return response;
   }
   const orderDetail = async (orderId) =>{
       const response = await getOrderDetail(orderId);
       if(!response.ok){
          throw new Error(`Failed to fetch order detail : ${response.status}`);
       }
       return response;
   }
  const updateStatus = async ({orderId , status , reason}) => {
    const response = await updateStatusOrder({orderId , status , reason});
    if(!response.ok){
        throw new Error(`Failed to fetch update status order : ${response.status}`);
    }
    return response;
  }
   const listOrderByStatus = async(status) =>{
      const response = await getOrderRestaurantByStatus(status);
    if(!response.ok){
        throw new Error(`Failed to fetch update status order : ${response.status}`);
    }
    return response;
   }

   const restaurantStatistical = async() => {
      const response = await getRestaurantStatistical();
    if(!response.ok){
        throw new Error(`Failed to fetch restaurant statistical order : ${response.status}`);
    }
    return response;
   }

   const restaurantStatisticalAndSort = async(timeRange) => {
    const response = await getRestaurantStatisticalAndSort(timeRange);
    if(!response.ok){
        throw new Error(`Failed to fetch restaurant statistical order : ${response.status}`);
    }
    return response;
   }


   return {
    listOrderMyRestaurant ,orderDetail , updateStatus , listOrderByStatus , restaurantStatistical,restaurantStatisticalAndSort
   }
}