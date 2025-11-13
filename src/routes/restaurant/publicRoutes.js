
// import page
import RestaurantDashboard from "../../modules/Restaurant/pages/RestaurantDashboard";

//  import layout
import RestaurantLayout from "../../modules/Restaurant/layouts/RestaurantLayout";


export const publicRoutes = [
    {path: "/", component: RestaurantDashboard, layout: RestaurantLayout},
];