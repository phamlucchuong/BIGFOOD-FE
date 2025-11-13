import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import BasicTableOne from "../components/tables/BasicTableOne";

export default function UserManagerment() {
  return (
    <>
      <PageMeta
        title="Quản lý người dùng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Quản lý người dùng" />
      <div className="space-y-6">
          <BasicTableOne />
      </div>
    </>
  );
}
