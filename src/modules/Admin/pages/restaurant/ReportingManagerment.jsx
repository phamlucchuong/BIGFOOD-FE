import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableData from "../../components/tables/TableData";
import useRestaurant from "../../../../hooks/data/useRestaurant";
import { useEffect } from "react";
import { CircleAlert, Info } from "lucide-react";
import useEmail from "../../../../hooks/data/useEmail";

export default function ReportingManagerment() {
    const { restaurants, getResutaurantReports, totalPages } = useRestaurant();
    const { handleSendReport } = useEmail();
  useEffect(() => {
    const fetchData = async () => {
      await getResutaurantReports();
    };
    fetchData();
  }, []);

  const handleRestaurantDetail = (restaurantId, restaurantName) => {
    console.log("Restaurant ID:", restaurantId);
    window.open(`/restaurant-detail?id=${encodeURIComponent(restaurantId)}&name=${encodeURIComponent(restaurantName)}`, "_blank");
  }

  const handleSendReportEmail = async (email) => {
    await handleSendReport(email);
  }
  return (
    <>
      <PageMeta
        title="Báo cáo vi phạm"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Báo cáo vi phạm" />
      <TableData
        mode="reports"
        data={restaurants}
        headers={[
          "Tên Nhà hàng",
          "Ngày hoạt động",
          "Đánh giá",
          "Thao tác",
        ]}
        onAction={[handleSendReportEmail,handleRestaurantDetail]}
        actions={[
          { name: "Cảnh báo vi phạm", icon: <CircleAlert size={18} /> },
          { name: "Thông tin chi tiết", icon: <Info size={18} /> },
        ]}
      />
    </>
  );
}
