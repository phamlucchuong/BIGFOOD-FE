import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Check, X } from 'lucide-react';
import TableData from "../../components/tables/TableData";
import useRestaurant from "../../../../hooks/data/useRestaurant";
import { useEffect } from "react";

export default function RestaurantRequest() {

  const { restaurantRequests, fetchRestaurantRequests, approveRequest } = useRestaurant();

  useEffect(() => {
    const fetchData = async () => {
      await fetchRestaurantRequests();
    };
    fetchData();
  }, []);

  const handleApproveRequest = async (requestId, isApproved) => {
    if (isApproved) {
      await approveRequest(requestId, true);
    } else {
      await approveRequest(requestId, false);
    }
    await fetchRestaurantRequests();
  }



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
          data={restaurantRequests}
          onAction={handleApproveRequest}
          headers={['Tên Nhà hàng', 'Người yêu cầu', 'Ngày gửi', 'Email', 'Giấy phép', 'Thao tác']}
          actions={[
            { name: "Xét duyệt yêu cầu", icon: <Check size={18} /> },
            { name: "Từ chối yêu cầu", icon: <X size={18} /> },
          ]}
        />
      </div>
    </>
  );
}
