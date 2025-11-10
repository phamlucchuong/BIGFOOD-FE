import React, { useState, useEffect } from 'react';
import {Save , Edit2 , Camera , Upload , MapPin , Phone , Mail ,CreditCard , AlertCircle} from "lucide-react"
import { mockRestaurantData } from '../../dataSample/restaurant/mockRestaurantData';

export  function RestaurantInfoPage ()  {
  const [restaurant, setRestaurant] = useState(mockRestaurantData);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Thông Tin Nhà Hàng</h2>
        <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          {editing ? <Save size={20} /> : <Edit2 size={20} />}
          <span>{editing ? 'Lưu' : 'Chỉnh Sửa'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-orange-500 to-red-500">
          <img src={restaurant.coverImage} alt="Cover" className="w-full h-full object-cover" />
          {editing && (
            <button className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
              <Camera size={20} />
            </button>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative -mt-16">
              <img src={restaurant.logo} alt="Logo" className="w-24 h-24 rounded-xl border-4 border-white shadow-lg" />
              {editing && (
                <button className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-lg text-white shadow-lg hover:bg-orange-700">
                  
                  <Upload size={16} />
                </button>
              )}
            </div>
            <div className="flex-1">
              {editing ? (
                <input type="text" value={restaurant.name} onChange={(e) => setRestaurant({...restaurant, name: e.target.value})} className="text-2xl font-bold border-b-2 border-orange-500 focus:outline-none mb-2 w-full" />
              ) : (
                <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
              )}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Đang hoạt động</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Xác thực email</span>
              </div>
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
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Địa chỉ</label>
              {editing ? (
                <input type="text" value={restaurant.address} onChange={(e) => setRestaurant({...restaurant, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="font-medium">{restaurant.address}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1 flex items-center gap-2">
                <Phone size={16} />
                Số điện thoại
              </label>
              {editing ? (
                <input type="tel" value={restaurant.phone} onChange={(e) => setRestaurant({...restaurant, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="font-medium">{restaurant.phone}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              {editing ? (
                <input type="email" value={restaurant.email} onChange={(e) => setRestaurant({...restaurant, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="font-medium">{restaurant.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CreditCard className="text-orange-600" size={20} />
            Thông Tin Thanh Toán
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Ngân hàng</label>
              {editing ? (
                <input type="text" value={restaurant.bankAccount.bankName} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="font-medium">{restaurant.bankAccount.bankName}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Số tài khoản</label>
              {editing ? (
                <input type="text" value={restaurant.bankAccount.accountNumber} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="font-medium">{restaurant.bankAccount.accountNumber}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Chủ tài khoản</label>
              {editing ? (
                <input type="text" value={restaurant.bankAccount.accountName} className="w-full px-3 py-2 border rounded-lg" />
              ) : (
                <p className="font-medium">{restaurant.bankAccount.accountName}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
          <AlertCircle size={20} />
          Vùng Nguy Hiểm
        </h3>
        <p className="text-sm text-gray-600 mb-4">Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.</p>
        <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Xóa Tài Khoản
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Xác Nhận Xóa Tài Khoản</h3>
            <p className="text-gray-600 mb-4">Vui lòng nhập email để xác nhận xóa tài khoản:</p>
            <input type="email" placeholder={restaurant.email} className="w-full px-3 py-2 border rounded-lg mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Hủy</button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Xác Nhận Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};