import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTableOne";

export default function RestaurantRequest() {
  return (
    <>
      <PageMeta
        title="Xét duyệt nhà hàng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Yêu cầu xét duyệt" />
      <div className="space-y-6">
          <BasicTableOne />
      </div>
    </>
  );
}
