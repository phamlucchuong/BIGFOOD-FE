import React, { useState, useEffect } from 'react';
import {Save , Edit2 , Camera , Upload , MapPin , Phone , Mail ,CreditCard , AlertCircle} from "lucide-react"
import  {useRestaurant}  from "../../../hooks/auth/restaurant/useRestaurant"

export function RestaurantInfoPage() {
  const [restaurant, setRestaurant] = useState({});
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const { fetchRestaurantDetails, updateRestaurant } = useRestaurant();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRestaurantDetails();
        setRestaurant(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setRestaurant({ ...restaurant, avatar: URL.createObjectURL(file) });
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setRestaurant({ ...restaurant, bannerId: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        restaurantName: restaurant.restaurantName,
        address: restaurant.address,
        phone: restaurant.phone,
        email: restaurant.email,
        nameBank: restaurant.nameBank,
        bankNumber: restaurant.bankNumber,
        bankAccountName: restaurant.bankAccountName,
        avatar: avatarFile ? avatarFile : null,
        banner: bannerFile ? bannerFile : null
      };

      const response = await updateRestaurant(payload);
      console.log("update : " ,response);
      alert("Cập nhật thành công");
      setEditing(false);
      setAvatarFile(null);
      setBannerFile(null);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật nhà hàng");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Thông Tin Nhà Hàng</h2>
        <button
          onClick={() => {
            if (editing) handleSave();
            setEditing(!editing);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          {editing ? <Save size={20} /> : <Edit2 size={20} />}
          <span>{editing ? "Lưu" : "Chỉnh Sửa"}</span>
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-orange-500 to-red-500">
          <img
            src={restaurant.banner}
            alt="Cover"
            className="w-full h-full object-cover"
          />

          {editing && (
            <label className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer">
              <Camera size={20} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleBannerUpload}
              />
            </label>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative -mt-16">
              <img
                src={restaurant.avatar}
                alt="Logo"
                className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
              />

              {editing && (
                <label className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-lg text-white shadow-lg hover:bg-orange-700 cursor-pointer">
                  <Upload size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              )}
            </div>

            <div className="flex-1">
              {editing ? (
                <input
                  type="text"
                  value={restaurant.restaurantName || ""}
                  onChange={(e) =>
                    setRestaurant({
                      ...restaurant,
                      restaurantName: e.target.value,
                    })
                  }
                  className="text-2xl font-bold border-b-2 border-orange-500 focus:outline-none mb-2 w-full"
                />
              ) : (
                <h3 className="text-2xl font-bold mb-2">
                  {restaurant.restaurantName}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <MapPin className="text-orange-600" size={20} />
            Địa Chỉ & Liên Hệ
          </h3>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Địa chỉ</label>
            {editing ? (
              <input
                value={restaurant.address || ""}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, address: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{restaurant.address}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Số điện thoại</label>
            {editing ? (
              <input
                value={restaurant.phone || ""}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, phone: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{restaurant.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Email</label>
            {editing ? (
              <input
                value={restaurant.email || ""}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{restaurant.email}</p>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CreditCard className="text-orange-600" size={20} />
            Thông Tin Thanh Toán
          </h3>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Ngân hàng</label>
            {editing ? (
              <input
                value={restaurant.nameBank || ""}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, nameBank: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{restaurant.nameBank}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Số tài khoản</label>
            {editing ? (
              <input
                value={restaurant.bankNumber || ""}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, bankNumber: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{restaurant.bankNumber}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Chủ tài khoản</label>
            {editing ? (
              <input
                value={restaurant.bankAccountName || ""}
                onChange={(e) =>
                  setRestaurant({
                    ...restaurant,
                    bankAccountName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{restaurant.bankAccountName}</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
          <AlertCircle size={20} /> Vùng Nguy Hiểm
        </h3>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Xóa Tài Khoản
        </button>
      </div>
    </div>
  );
}