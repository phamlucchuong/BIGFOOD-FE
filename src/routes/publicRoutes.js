
import DefaultLayout from "../components/Layout/DefaultLAyout";
import Home from "../pages/Home";
import Pickfood from "../pages/Pickfood/Pickfood";

export const publicRoutes = [
    {path: "/", component: Home, layout: DefaultLayout},
    {path: "/restaurant-detail", component: Pickfood, layout: DefaultLayout},
    // {path: "/", component: Home},
];