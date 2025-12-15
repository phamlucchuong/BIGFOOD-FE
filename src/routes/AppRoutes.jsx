// AppRoutes.jsx
import { Route, Routes } from "react-router-dom";

// import layouts
import AdminLayout from "../modules/Admin/layouts/AdminLayout";
import RestaurantLayout from "../modules/Restaurant/layouts/RestaurantLayout";
import LoginPage from "../modules/Restaurant/pages/RegisterAndLogin/LoginPage";
import RegisterPage from "../modules/Restaurant/pages/RegisterAndLogin/RegisterPage";
import UserDefaultLayout from "../modules/User/layouts/UserDefaultLayout";
import StickyLayout from "../modules/User/layouts/StickyLayout";


// import pages
import Home from "../modules/User/pages/Home";
import RestaurantDetail from "../modules/User/pages/RestaurantDetail";

import AdminDashboard from "../modules/Admin/pages/AdminDashboard";
import FinanceReporting from "../modules/Admin/pages/FinanceReporting";
import OrderManagerment from "../modules/Admin/pages/OrderManagerment";
import UserManagerment from "../modules/Admin/pages/UserManagerment";
import ReportingManagerment from "../modules/Admin/pages/restaurant/ReportingManagerment";
import RestaurantManagerment from "../modules/Admin/pages/restaurant/RestaurantManagerment";
import RestaurantRequest from "../modules/Admin/pages/restaurant/RestaurantRequest";

import { AnalyticsPage } from "../modules/Restaurant/pages/AnalyticsPage";
import { MenuManagementPage } from '../modules/Restaurant/pages/MenuManagementPage';
import { OrderManagementPage } from "../modules/Restaurant/pages/OrderManagementPage";
import RestaurantDashboard from "../modules/Restaurant/pages/RestaurantDashboard";
import { RestaurantInfoPage } from "../modules/Restaurant/pages/RestaurantInfoPage";
import { ReviewsManagementPage } from "../modules/Restaurant/pages/ReviewsManagementPage";
import Checkout from "../modules/User/pages/Checkout";
import Collection from "../modules/User/pages/Collection";
import OrderDetail from "../modules/User/pages/OrderDetail";
import Search from "../modules/User/pages/Search";
import OrderAll from "../modules/User/pages/OrderAll";


export default function AppRoutes() {
  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<UserDefaultLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<StickyLayout />}>
        <Route path="/restaurant-detail" element={<RestaurantDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order/detail" element={<OrderDetail />} />
        <Route path="/order/all" element={<OrderAll />} />
      </Route>



      {/* admin routes */}
      <Route path="/admin/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="user-managerment" element={<UserManagerment />} />
        <Route path="restaurant-request" element={<RestaurantRequest />} />
        <Route path="restaurant-managerment" element={<RestaurantManagerment />} />
        <Route path="reporting-managerment" element={<ReportingManagerment />} />
        <Route path="order-managerment" element={<OrderManagerment />} />
        <Route path="finance-reporting" element={<FinanceReporting />} />
      </Route>
      
      
      <Route path="/restaurant/register" element={<RegisterPage />} />
      <Route path="/restaurant/login" element={<LoginPage />} />

      {/* Restaurant Main */}
      <Route path="/restaurant/" element={<RestaurantLayout />}>
        <Route index element={<RestaurantDashboard />} />
        <Route path="info" element={<RestaurantInfoPage />} />
        <Route path="orders" element={<OrderManagementPage />} />
        <Route path="menu" element={<MenuManagementPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="reviews" element={<ReviewsManagementPage />} />
      </Route>
    </Routes>
  );
}
