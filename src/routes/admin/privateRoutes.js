

//  import layout
import AppLayout from "../../modules/Admin/layout/AppLayout";

// import page
import AdminDashboard from "../../modules/Admin/pages/AdminDashboard";


export const privateRoutes = [
    {path: "/admin", component: AdminDashboard, layout: AppLayout},
];