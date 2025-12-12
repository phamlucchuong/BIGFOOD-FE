import {getListOrder , getOrderDetail , updateStatusOrder} from "../../../api/restaurant/orderAPI"

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


   return {
    listOrderMyRestaurant ,orderDetail , updateStatus
   }
}