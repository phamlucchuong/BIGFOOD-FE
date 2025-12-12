import { useState } from "react";
import { createRestaurant } from "../../../api/auth/authApi";

export default function useInfoRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitRestaurant = async (data) => {
    setLoading(true);
    setError(null);

    try {

      const validationError = validateRestaurantData(data);
      if (validationError) {
        setError(validationError);
        return { success: false, message: validationError };
      }
      const formData = createFormData(data);
      console.log("Form Data to be sent:", formData);
      const response = await createRestaurant(formData);
      console.log("Response from createRestaurant:", response.json());
      if (!response.ok) {
         return response.message = "Lỗi khi tạo nhà hàng .Vui lòng thử lại";
      }
      return { 
        success: true, 
        data: response.data 
      };
    } catch (err) {
      console.error("Error creating restaurant:", err);
      const errorMessage = err.message || "Đã có lỗi xảy ra, vui lòng thử lại";
      setError(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };


  const validateRestaurantData = (data) => {
    if (!data.businessField || data.businessField.length === 0) {
      return "Vui lòng chọn ít nhất 1 lĩnh vực kinh doanh";
    }

    if (!data.storeName || data.storeName.trim() === "") {
      return "Vui lòng nhập tên cửa hàng";
    }

    if (!data.storeAddress || data.storeAddress.trim() === "") {
      return "Vui lòng nhập địa chỉ cửa hàng";
    }

    if (!data.bankName || data.bankName.trim() === "") {
      return "Vui lòng nhập tên ngân hàng";
    }

    if (!data.accountNumber || data.accountNumber.trim() === "") {
      return "Vui lòng nhập số tài khoản";
    }

    if (!data.accountName || data.accountName.trim() === "") {
      return "Vui lòng nhập tên chủ tài khoản";
    }

    if (!data.businessLicenseFile) {
      return "Vui lòng tải lên giấy phép kinh doanh";
    }

    if (data.businessLicenseFile.size > 5 * 1024 * 1024) {
      return "File không được vượt quá 5MB";
    }

    return null;
  };

  const createFormData = (data) => {
    const formData = new FormData();
    const categoryIds = data.businessField.map(field => field.id);
    
    categoryIds.forEach(id => {
      formData.append("categoryIds", id);
    });
    formData.append("restaurantName", data.storeName);
    formData.append("address", data.storeAddress);
    formData.append("nameBank", data.bankName);
    formData.append("bankNumber", data.accountNumber);
    formData.append("bankAccountName", data.accountName);
    formData.append("licenseFile", data.businessLicenseFile);
    return formData;
  };

  return {
    loading,
    error,
    handleSubmitRestaurant,
  };
}
