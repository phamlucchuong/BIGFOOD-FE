import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTableOne";

export default function ReportingManagerment() {
  return (
    <>
      <PageMeta
        title="Báo cáo vi phạm"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Báo cáo vi phạm" />
      <div className="space-y-6">
          <BasicTableOne />
      </div>
    </>
  );
}
