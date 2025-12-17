import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableData from "../components/tables/TableData";
import { CircleFadingArrowUp, Lock, UserCog } from 'lucide-react';
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";



export default function UserManagerment() {

  const { users, fetchUsers } = useUser();
  useEffect(() => {
    fetchUsers();
  }, []);



  return (
    <>
      <PageMeta
        title="Quản lý người dùng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Quản lý người dùng" />
      <div className="space-y-6">
        <TableData
          data={users}
          headers={['Người dùng', 'Vai trò', 'Ngày tham gia', 'Tổng đơn hàng', 'Trạng thái', 'Thao tác']}
          actions={[
            { name: "Nâng cấp thành Admin", icon: <CircleFadingArrowUp size={18} /> },
            { name: "Khóa tài khoản", icon: <Lock size={18} /> },
            { name: "Mở khóa tài khoản", icon: <UserCog size={18} /> }
          ]}
        />
      </div>
    </>
  );
}
