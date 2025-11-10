
// import page
import Home from "../modules/User/pages/Home";
import RestaurantDetail from "../modules/User/pages/RestaurantDetail";
import { DashboardPage } from "../modules/Restaurant/pages/DashboardPage";

//  import layout
import RestaurantLayout from "../modules/Restaurant/layouts/RestaurantLayout";
import UserDefaultLayout from "../modules/User/layouts/UserDefaultLayout";


export const publicRoutes = [
    {path: "/", component: Home, layout: UserDefaultLayout},
    {path: "/restaurant-detail", component: RestaurantDetail, layout: UserDefaultLayout},
    {path: "/restaurant-dashboard", component: DashboardPage, layout: RestaurantLayout},
    // {path: "/", component: Home},
];