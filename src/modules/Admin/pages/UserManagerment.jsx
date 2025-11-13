import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableData from "../components/tables/TableData";
import { CircleFadingArrowUp, Lock, UserCog } from 'lucide-react';


export default function UserManagerment() {

  const userData = [
    {
      id: 1,
      user: { image: "/src/assets/images/user_default.png", name: "Lindsey Curtis", email: "lindsey@example.com" },
      role: "User",
      dateJoined: "12/03/2024",
      totalOrders: 45,
      accountStatus: "Active",
    },
    {
      id: 2,
      user: { image: "/src/assets/images/user_default.png", name: "Lindsey Curtis", email: "lindsey@example.com" },
      role: "Admin",
      dateJoined: "12/03/2024",
      totalOrders: 45,
      accountStatus: "Active",
    },
    {
      id: 3,
      user: { image: "/src/assets/images/user_default.png", name: "Zain Geidt", email: "zain.g@example.com" },
      role: "User",
      dateJoined: "05/01/2024",
      totalOrders: 5,
      accountStatus: "Locked",
    },
  ];

  return (
    <>
      <PageMeta
        title="Quản lý người dùng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Quản lý người dùng" />
      <div className="space-y-6">
        <TableData
          data={userData}
          headers={['Người dùng', 'Vai trò', 'Ngày tham gia', 'Tổng đơn hàng', 'Trạng thái', 'Thao tác']}
          actions={[
            {name: "Nâng cấp thành Admin", icon: <CircleFadingArrowUp size={18}/>},
            {name: "Khóa tài khoản", icon: <Lock size={18} />},
            {name: "Mở khóa tài khoản", icon: <UserCog size={18} />}
          ]}
        />
      </div>
    </>
  );
}
