import React from "react";
import Badge from "../ui/Badge";
import { formatDate } from "../../../../utils/dateUtils";
import { useUser } from "../../hooks/useUser";
import { formatISOToReadable } from "../../../../utils/dateTimeFormatUtils";

const Table = ({ children }) => <table className="w-full">{children}</table>;
const TableBody = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);
const TableCell = ({ children, isHeader, className }) =>
  isHeader ? (
    <th className={className}>{children}</th>
  ) : (
    <td className={className}>{children}</td>
  );
const TableHeader = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);
const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>;

export default function AdminCustomTable({
  data,
  headers,
  actions,
  onAction,
  mode = "users",
}) {
  // Thêm prop mode

  const handleAction = (action, item) => {
    if (mode === "users") {
      alert(`${action} người dùng ${item.name}`);
    } else {
      alert(`${action} yêu cầu của nhà hàng ${item.restaurantName}`);
    }
  };

  const { changeUserStatus, addAdminRole } = useUser();
  const handleChangeUserStatus = (userId) => {
    alert(`Xóa người dùng với ID: ${userId}`);
    changeUserStatus(userId);
  };

  const handleAddAdminRole = (userId) => {
    alert(`Thêm vai trò Admin cho người dùng với ID: ${userId}`);
    addAdminRole(userId);
  };

  const handleRequestsAction = (restaurantId, isApproved) => {
    onAction(restaurantId, isApproved);
  }


  const openFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
      case "Approved":
        return "success";
      case "Locked":
      case "Rejected":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  // --- RENDER HÀNH ĐỘNG DỰA TRÊN MODE ---
  const renderActionCell = (user) => {
    if (mode === "users") {
      return (
        <div className="flex items-center gap-3">
          {/* Button 1 */}
          {!user.roles.some((role) => role.name === "ADMIN") && (
            <button
              onClick={() => handleAddAdminRole(user.id)}
              className="text-gray-500 hover:text-brand-500 transition-colors"
              title={actions[0].name}
            >
              {actions[0].icon}
            </button>
          )}

          {/* Button 2 */}
          {user.isDeleted === false ? (
            <button
              onClick={() => handleChangeUserStatus(user.id)}
              className="text-gray-500 hover:text-error-500 transition-colors"
              title={actions[1].name}
            >
              {actions[1].icon}
            </button>
          ) : (
            <button
              onClick={() => handleChangeUserStatus(user.id)}
              className="text-gray-500 hover:text-success-500 transition-colors"
              title={actions[2].name}
            >
              {actions[2].icon}
            </button>
          )}
        </div>
      );
    }

    if (mode === "request") {
      return (
        <div className="flex items-center gap-3">
          {/* Button 1 */}
            <button
              onClick={() => handleRequestsAction(user.id, true)}
              className="text-gray-500 hover:text-green-500 hover:scale-110 transition-colors"
              title={actions[0].name}
            >
              {actions[0].icon}
            </button>

          {/* Button 2 */}
          <button
            onClick={() => handleRequestsAction(user.id, false)}
            className="text-gray-500 hover:text-red-500 hover:scale-100 transition-colors"
            title={actions[1].name}
          >
            {actions[1].icon}
          </button>
        </div>
      );
    }

    if (mode === "restaurants") {
      return (
        <div className="flex items-center gap-3">
          {/* Button 1 */}
          {user.role !== "Admin" && (
            <button
              onClick={() => handleAction("Nâng cấp Role", user)}
              className="text-gray-500 hover:text-brand-500 transition-colors"
              title={actions[0].name}
            >
              {actions[0].icon}
            </button>
          )}

          {/* Button 2 */}
          <button
            onClick={() => handleAction("Khóa", user)}
            className="text-gray-500 hover:text-error-500 transition-colors"
            title={actions[1].name}
          >
            {actions[1].icon}
          </button>
        </div>
      );
    }

    return null;
  };

  // --- RENDER NỘI DUNG TỪNG DÒNG DỰA TRÊN MODE ---
  const renderTableRows = () => {
    if (mode === "users") {
      return data?.map((user) => (
        <TableRow key={user.id}>
          {/* Người dùng (Tên & Email) */}
          <TableCell className="px-5 py-4 sm:px-6 text-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                {user.image ? (
                  <img
                    width={40}
                    height={40}
                    src={user.user.image}
                    alt={user.user.name}
                  />
                ) : (
                  <img
                    width={40}
                    height={40}
                    src="/src/assets/images/user_default.png"
                    alt={"Default user image"}
                  />
                )}
              </div>
              <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {user.name}
                </span>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {user.email}
                </span>
              </div>
            </div>
          </TableCell>

          {/* Vai trò */}
          <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
            {/* 1. Kiểm tra xem user.roles có tồn tại và là mảng không */}
            {user.roles && user.roles.length > 0 && (
              <span>{user.roles.map((role) => role.name).join(" ")}</span>
            )}
          </TableCell>

          {/* Ngày tham gia */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            {formatDate(user.createdAt)}
          </TableCell>

          {/* Tổng đơn hàng */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            0
          </TableCell>

          {/* Trạng thái */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            <Badge size="sm">
              {user.isDeleted === true ? "Đã khóa" : "Hoạt động"}
            </Badge>
          </TableCell>

          {/* Thao tác */}
          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
            {renderActionCell(user)}
          </TableCell>
        </TableRow>
      ));
    }

    if (mode === "request") {
      return data?.map((request) => (
        <TableRow key={request.id}>
          {/* Tên Nhà hàng */}
          <TableCell className="px-5 py-4 sm:px-6 text-start">
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {request.restaurantName}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {request.location}
            </span>
          </TableCell>
          {/* Người gửi yêu cầu */}
          <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
            {request.userName}
          </TableCell>
          {/* Ngày yêu cầu */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            {formatISOToReadable(request.createdAt)}
          </TableCell>
          {/* Trạng thái (Pending) */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            {request.email}
          </TableCell>
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            <div onClick={() => openFile(request.lisence)} className="cursor-pointer hover:scale-105 transition-transform">
              <i className="fa-solid fa-file-arrow-up"></i>
            </div>
          </TableCell>
          {/* Thao tác */}
          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
            {renderActionCell(request)}
          </TableCell>
        </TableRow>
      ));
    }

    if (mode === "restaurants") {
      return data.map((restaurant) => (
        <TableRow key={restaurant.id}>
          {/* Tên Nhà hàng */}
          <TableCell className="px-5 py-4 sm:px-6 text-start">
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {restaurant.restaurantName}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {restaurant.location}
            </span>
          </TableCell>
          {/* Người gửi yêu cầu */}
          <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
            {restaurant.startedDate}
          </TableCell>
          <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">
            {restaurant.category}
          </TableCell>
          {/* Ngày yêu cầu */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            {restaurant.totalOrders}
          </TableCell>
          {/* Trạng thái (Pending) */}
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
            {restaurant.ratings}
          </TableCell>
          {/* Thao tác */}
          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
            {renderActionCell(restaurant)}
          </TableCell>
        </TableRow>
      ));
    }

    return null;
  };

  const renderTableHeader = () => {
    return (
      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
        <TableRow>
          {headers.map((title, index) => (
            <TableCell
              key={index}
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {data.length ? (
          <Table>
            {renderTableHeader()}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {renderTableRows()}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full py-32 flex justify-center items-center">
            <p className="text-gray-500 text-lg">
              Không có yêu cầu xét duyệt nào.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}