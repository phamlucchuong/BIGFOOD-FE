import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Check, X } from 'lucide-react';
import TableData from "../../components/tables/TableData";

export default function RestaurantRequest() {

  const restaurantRequestData = [
    {
      id: 101,
      user: { image: "/src/assets/images/user_default.png", name: "Kaiya George", email: "kaiya.g@biz.com" },
      restaurantName: "Kaiya's Kitchen",
      location: "Quận 1, TP HCM",
      dateRequested: "01/11/2025",
      email: "lucchuongg@gmail.com", // Trạng thái xét duyệt
    },
    {
      id: 102,
      user: { image: "/src/assets/images/user_default.png", name: "Abram Schleifer", email: "abram@digital.co" },
      restaurantName: "Digital Delights",
      location: "Quận 3, TP HCM",
      dateRequested: "05/11/2025",
      email: "lucchuongg@gmail.com",
    },
  ];


  return (
    <>
      <PageMeta
        title="Xét duyệt nhà hàng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Yêu cầu xét duyệt" />
      <div className="space-y-6">
        <TableData
          mode="request"
          data={restaurantRequestData}
          headers={['Tên Nhà hàng', 'Người yêu cầu', 'Ngày gửi', 'Email', 'Thao tác']}
          actions={[
            { name: "Xét duyệt yêu cầu", icon: <Check size={18} /> },
            { name: "Từ chối yêu cầu", icon: <X size={18} /> },
          ]}
        />
      </div>
    </>
  );
}
