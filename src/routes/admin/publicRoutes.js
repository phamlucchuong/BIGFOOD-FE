
// import page
import AdminDashboard from "../../modules/Admin/pages/AdminDashboard";

//  import layout
import AppLayout from "../../modules/Admin/layout/AppLayout";


export const publicRoutes = [
    {path: "/admin", component: AdminDashboard, layout: AppLayout},
];