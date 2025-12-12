// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// import layouts
import AdminLayout from "../modules/Admin/layouts/AdminLayout";
import UserDefaultLayout from "../modules/User/layouts/UserDefaultLayout";
import RestaurantLayout from "../modules/Restaurant/layouts/RestaurantLayout";
import RegisterPage from "../modules/Restaurant/pages/RegisterAndLogin/RegisterPage";
import LoginPage from "../modules/Restaurant/pages/RegisterAndLogin/LoginPage";


// import pages
import Home from "../modules/User/pages/Home";
import RestaurantDetail from "../modules/User/pages/RestaurantDetail";

import AdminDashboard from "../modules/Admin/pages/AdminDashboard";
import UserManagerment from "../modules/Admin/pages/UserManagerment";
import RestaurantRequest from "../modules/Admin/pages/restaurant/RestaurantRequest";
import RestaurantManagerment from "../modules/Admin/pages/restaurant/RestaurantManagerment";
import ReportingManagerment from "../modules/Admin/pages/restaurant/ReportingManagerment";
import OrderManagerment from "../modules/Admin/pages/OrderManagerment";
import FinanceReporting from "../modules/Admin/pages/FinanceReporting";

import RestaurantDashboard from "../modules/Restaurant/pages/RestaurantDashboard";
import { RestaurantInfoPage } from "../modules/Restaurant/pages/RestaurantInfoPage"
import { MenuManagementPage } from '../modules/Restaurant/pages/MenuManagementPage';
import { AnalyticsPage } from "../modules/Restaurant/pages/AnalyticsPage"
import { OrderManagementPage } from "../modules/Restaurant/pages/OrderManagementPage"
import {ReviewsManagementPage} from "../modules/Restaurant/pages/ReviewsManagementPage"


export default function AppRoutes() {
  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<UserDefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/restaurant-detail" element={<RestaurantDetail />} />
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
