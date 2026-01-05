import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TableData from "../components/tables/TableData";
import { CircleFadingArrowUp, Lock, UserCog } from 'lucide-react';
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";



export default function UserManagerment() {

  const { users, fetchUsers , currentPage , total , totalPages , pageSize  } = useUser();
  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleListUser = async (page)  =>{
     fetchUsers(page);
  }


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
                {/* Pagination */}
                  <div className="bg-white p-4 rounded-xl  flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Hiển thị{" "}
                      {total > 0 ? (currentPage - 1) * pageSize + 1 : 0} đến{" "}
                      {Math.min(currentPage * pageSize, total)} trong {total} người dùng
                    </div>
        
                    <div className="flex gap-2 items-center">
                      {/* Prev */}
                      <button
                        onClick={() => {
                          if (currentPage > 1) {
                            handleListUser(currentPage - 1);
                          }
                        }}
                        disabled={currentPage === 1}
                        className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>
        
                      {/* Page numbers */}
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
        
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
        
                          // Guard an toàn
                          if (pageNum < 1 || pageNum > totalPages) return null;
        
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handleListUser(pageNum)}
                              className={`px-3 py-1 rounded-lg ${
                                currentPage === pageNum
                                  ? "bg-orange-600 text-white"
                                  : "border hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
        
                      {/* Next */}
                      <button
                        onClick={() => {
                          if (currentPage < totalPages) {
                            handleListUser(currentPage + 1);
                          }
                        }}
                        disabled={currentPage === totalPages}
                        className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
      </div>
    </>
  );
}
