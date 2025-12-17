import { useState } from "react";
import { getAllUser, getUserSummary, changeUserStatusById, addAdminRoleToUser } from "../../../api/adminApi";

export const useUser = () => {

    const [ users, setUsers ] = useState([]);
    const fetchUsers = async () => {
        const response = await getAllUser();
        if (response) {
            setUsers(response.results);
        }
    }


    // lấy thống kê người dùng bao gồm: tổng số người dùng, % tăng trưởng so với cùng kì tháng trước
    const [ userSummary, setUsersSummary ] = useState([]);
    const handleUserSummary = async () => {
        const response = await getUserSummary();
        if (response) {
            setUsersSummary(response.results);
        }
    }


    // hàm chuyển trạn thái người dùng, isDeleted true -> false , false -> true
    const changeUserStatus = async (userId) => {
        try {
            await changeUserStatusById(userId);
            await fetchUsers();
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
        }
    };


    const addAdminRole = async (userId) => {
        try {
            await addAdminRoleToUser(userId);
            await fetchUsers();
        } catch (error) {
            console.error("Lỗi khi thêm vai trò quản trị:", error);
        }
    };

    



  return { users, fetchUsers, userSummary, handleUserSummary, changeUserStatus, addAdminRole };
};
