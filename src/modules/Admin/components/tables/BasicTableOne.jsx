import React from 'react';
import { Edit2, Lock, Trash2, UserCog, Check, X, ArrowUp } from 'lucide-react';
import Badge from '../ui/Badge';

// --- Custom UI Components (Giữ nguyên) ---
const Table = ({ children }) => <table className="w-full">{children}</table>;
const TableBody = ({ children, className }) => <tbody className={className}>{children}</tbody>;
const TableCell = ({ children, isHeader, className }) => isHeader ? <th className={className}>{children}</th> : <td className={className}>{children}</td>;
const TableHeader = ({ children, className }) => <thead className={className}>{children}</thead>;
const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>;

// --- Dữ liệu Mẫu ---

// Dữ liệu cho Quản lý User (Chỉ role 'User')
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

// ---------------------------------------------

export default function AdminCustomTable({ mode = 'users' }) { // Thêm prop mode
    
    const data = mode === 'users' ? userData : restaurantApprovalData;

    const handleAction = (action, item) => {
        if (mode === 'users') {
            alert(`${action} người dùng ${item.user.name}`);
        } else {
            alert(`${action} yêu cầu của nhà hàng ${item.restaurantName}`);
        }
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
    const renderActionCell = (item) => {
        if (mode === 'users') {
            return (
                <div className="flex items-center gap-3">
                    {/* Nâng cấp Role */}
                    <button
                        onClick={() => handleAction('Nâng cấp Role', item)}
                        className="text-gray-500 hover:text-brand-500 transition-colors"
                        title="Nâng cấp thành Admin"
                    >
                        <ArrowUp size={18} />
                    </button>
                    {/* Khóa/Mở khóa */}
                    {item.accountStatus === 'Active' ? (
                        <button
                            onClick={() => handleAction('Khóa', item)}
                            className="text-gray-500 hover:text-error-500 transition-colors"
                            title="Khóa tài khoản"
                        >
                            <Lock size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAction('Mở khóa', item)}
                            className="text-gray-500 hover:text-success-500 transition-colors"
                            title="Mở khóa tài khoản"
                        >
                            <UserCog size={18} />
                        </button>
                    )}
                </div>
            );
        }

        if (mode === 'approvals') {
            return (
                <div className="flex items-center gap-3">
                    {/* Xét duyệt */}
                    <button
                        onClick={() => handleAction('Xét duyệt', item)}
                        className="text-gray-500 hover:text-success-500 transition-colors"
                        title="Xét duyệt yêu cầu"
                    >
                        <Check size={18} />
                    </button>
                    {/* Từ chối */}
                    <button
                        onClick={() => handleAction('Từ chối', item)}
                        className="text-gray-500 hover:text-error-500 transition-colors"
                        title="Từ chối yêu cầu"
                    >
                        <X size={18} />
                    </button>
                </div>
            );
        }
        return null;
    };
    
    // --- RENDER NỘI DUNG TỪNG DÒNG DỰA TRÊN MODE ---
    const renderTableRows = () => {
        if (mode === 'users') {
            return data.map((user) => (
                <TableRow key={user.id}>
                    {/* Người dùng (Tên & Email) */}
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <img width={40} height={40} src={user.user.image} alt={user.user.name} />
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{user.user.name}</span>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{user.user.email}</span>
                            </div>
                        </div>
                    </TableCell>
                    {/* Vai trò */}
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">{user.role}</TableCell>
                    {/* Ngày tham gia */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.dateJoined}</TableCell>
                    {/* Tổng đơn hàng */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{user.totalOrders}</TableCell>
                    {/* Trạng thái */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge size="sm" color={getStatusColor(user.accountStatus)}>{user.accountStatus}</Badge>
                    </TableCell>
                    {/* Thao tác */}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {renderActionCell(user)}
                    </TableCell>
                </TableRow>
            ));
        }

        if (mode === 'approvals') {
            return data.map((approval) => (
                <TableRow key={approval.id}>
                    {/* Tên Nhà hàng */}
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{approval.restaurantName}</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{approval.location}</span>
                    </TableCell>
                    {/* Người gửi yêu cầu */}
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-white/90">{approval.user.name}</TableCell>
                    {/* Ngày yêu cầu */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{approval.dateRequested}</TableCell>
                    {/* Trạng thái (Pending) */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge size="sm" color={getStatusColor(approval.status)}>{approval.status}</Badge>
                    </TableCell>
                    {/* Thao tác */}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {renderActionCell(approval)}
                    </TableCell>
                </TableRow>
            ));
        }
        return null;
    };


    // --- RENDER HEADER DỰA TRÊN MODE ---
    const renderTableHeader = () => {
        let headers;
        if (mode === 'users') {
            headers = ['Người dùng', 'Vai trò', 'Ngày tham gia', 'Tổng đơn hàng', 'Trạng thái', 'Thao tác'];
        } else if (mode === 'approvals') {
            headers = ['Tên Nhà hàng', 'Người yêu cầu', 'Ngày gửi', 'Trạng thái', 'Thao tác'];
        } else {
            return null;
        }

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
                <Table>
                    {renderTableHeader()}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {renderTableRows()}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}