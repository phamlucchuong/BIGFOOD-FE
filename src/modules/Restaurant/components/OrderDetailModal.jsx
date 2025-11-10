import React, { useState, useEffect } from 'react';
import {Ban , Check , Package, Clock ,CreditCard , DollarSign , UtensilsCrossed , MapPin , Phone , Users , X} from "lucide-react"
import { formatCurrency } from '../../../dataSample/restaurant/formatCurrency';

export const OrderDetailModal = ({ show, onClose, order, onUpdateStatus, onReject, onRefund }) => {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

   if (!show || !order) return null;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-600',
    confirmed: 'bg-blue-100 text-blue-600',
    preparing: 'bg-purple-100 text-purple-600',
    delivering: 'bg-indigo-100 text-indigo-600',
    completed: 'bg-green-100 text-green-600',
    cancelled: 'bg-red-100 text-red-600'
  };

  const statusLabels = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    preparing: 'Đang chuẩn bị',
    delivering: 'Đang giao',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-xl z-10">
          <div>
            <h3 className="text-2xl font-bold">Đơn hàng #{order.id}</h3>
            <p className="text-gray-600">{order.time} - {order.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 pt-[160px]">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Users size={20} className="text-orange-600" />
              Thông Tin Khách Hàng
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Tên khách hàng</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone size={16} />
                  {order.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                <p className="font-medium flex items-center gap-2">
                  <MapPin size={16} />
                  {order.address}
                </p>
              </div>
              {order.note && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Ghi chú</p>
                  <p className="font-medium text-orange-600">{order.note}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <UtensilsCrossed size={20} className="text-orange-600" />
              Chi Tiết Đơn Hàng
            </h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(item.price)} x {item.quantity}</p>
                  </div>
                  <p className="font-bold text-orange-600">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <DollarSign size={20} className="text-orange-600" />
              Thanh Toán
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính ({order.items.length} món)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>{order.shippingFee === 0 ? 'Miễn phí' : formatCurrency(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Tổng cộng</span>
                <span className="text-orange-600">{formatCurrency(order.total)}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-gray-600">Phương thức thanh toán</span>
                <span className="font-medium flex items-center gap-2">
                  <CreditCard size={16} />
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {order.status === 'cancelled' && order.cancelReason && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="font-medium text-red-600 mb-1">Lý do hủy đơn:</p>
              <p className="text-gray-700">{order.cancelReason}</p>
            </div>
          )}

          {showRejectForm && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-bold text-red-600 mb-3">Từ Chối Đơn Hàng</h4>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-3"
                rows="3"
                placeholder="Nhập lý do từ chối..."
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRejectForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-white"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    onReject(order.id, rejectReason);
                    setShowRejectForm(false);
                    setRejectReason('');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Xác Nhận Từ Chối
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            {order.status === 'pending' && (
              <>
                <button
                  onClick={() => onUpdateStatus(order.id, 'confirmed')}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
                >
                  <Check size={20} />
                  Duyệt Đơn
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium"
                >
                  <Ban size={20} />
                  Từ Chối
                </button>
              </>
            )}

            {order.status === 'confirmed' && (
              <button
                onClick={() => onUpdateStatus(order.id, 'preparing')}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-medium"
              >
                <Clock size={20} />
                Bắt Đầu Chuẩn Bị
              </button>
            )}

            {order.status === 'preparing' && (
              <button
                onClick={() => onUpdateStatus(order.id, 'delivering')}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 font-medium"
              >
                <Package size={20} />
                Giao Hàng
              </button>
            )}

            {order.status === 'delivering' && (
              <button
                onClick={() => onUpdateStatus(order.id, 'completed')}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
              >
                <Check size={20} />
                Hoàn Thành
              </button>
            )}

            {order.status === 'cancelled' && (
              <button
                onClick={() => onRefund(order.id)}
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2 font-medium"
              >
                <DollarSign size={20} />
                Xử Lý Hoàn Tiền
              </button>
            )}

            {order.status === 'completed' && (
              <div className="flex-1 text-center p-3 bg-green-50 text-green-600 rounded-lg font-medium">
                ✓ Đơn hàng đã hoàn thành
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
