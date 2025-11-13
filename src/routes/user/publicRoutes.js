
// import page
import Home from "../../modules/User/pages/Home";
import RestaurantDetail from "../../modules/User/pages/RestaurantDetail";

//  import layout
import UserDefaultLayout from "../../modules/User/layouts/UserDefaultLayout";


export const publicRoutes = [
    {path: "/", component: Home, layout: UserDefaultLayout},
    {path: "/restaurant-detail", component: RestaurantDetail, layout: UserDefaultLayout},
];