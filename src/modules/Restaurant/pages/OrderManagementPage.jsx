import React, { useState, useEffect } from 'react';
import { Ban, Check, Download } from "lucide-react";
import { formatCurrency } from "../../../dataSample/restaurant/formatCurrency";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { useOrder } from '../../../hooks/auth/restaurant/useOrder';

export const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [statusFilter, setStatusFilter] = useState("");

  const { listOrderMyRestaurant, updateStatus } = useOrder();

  const handleLoadListOrder = async () => {
    try {
      const data = await listOrderMyRestaurant();
      setOrders(data.results);
      console.log(data.results);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    handleLoadListOrder();
  }, []);

  const handleUpdateStatus = async (statusOrder) => {
    try {
      await updateStatus({
        orderId: statusOrder.orderId,
        status: statusOrder.status,
        reason: statusOrder.reason
      });
      setOrders(orders.map(o => 
        o.id === statusOrder.orderId 
          ? {
              ...o, 
              status: statusOrder.status,
              ...(statusOrder.reason && { 
                cancelReason: statusOrder.reason,
                rejectReason: statusOrder.reason 
              })
            } 
          : o
      ));
      handleLoadListOrder();
      setShowDetailModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleLoadStatusFilter = async() =>{
    
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối!');
      return;
    }

    await handleUpdateStatus({
      orderId: selectedOrder.id,
      status: 'REJECTED',
      reason: rejectReason
    });

    setShowRejectModal(false);
    setRejectReason('');
    setSelectedOrder(null);
  };

  const handleRefund = (orderId) => {
    alert('Đã gửi yêu cầu hoàn tiền cho đơn hàng #' + orderId);
    setShowDetailModal(false);
  };

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-600',
    CONFIRMED: 'bg-blue-100 text-blue-600',
    PREPARING: 'bg-purple-100 text-purple-600',
    DELIVERING: 'bg-indigo-100 text-indigo-600',
    COMPLETED: 'bg-green-100 text-green-600',
    CANCELLED: 'bg-red-100 text-red-600',
    REJECTED: 'bg-red-100 text-red-600'
  };

  const statusLabels = {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    PREPARING: 'Đang chuẩn bị',
    DELIVERING: 'Đang giao',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
    REJECTED: 'Đã từ chối'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản Lý Đơn Hàng</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border rounded-lg"
          value={statusFilter}
          onChange={(e)=>{
              setStatusFilter(e.target.value),
              ha
          }}
          > 
            <option>Tất cả trạng thái</option>
            <option>Chờ xác nhận</option>
            <option>Đang xử lý</option>
            <option>Hoàn thành</option>
            <option>Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Đơn hàng #{order.id}</h3>
                  <p className="text-gray-600 text-sm">
                    {order?.user?.name || 'N/A'} • {order?.createdAt || 'N/A'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">Tổng tiền</p>
                  <p className="text-xl font-bold text-orange-600">{formatCurrency(order.totalAmount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Số món</p>
                  <p className="font-bold">{order.numberDishes} món</p> 
                </div>
                <button 
                  onClick={() => {
                    setSelectedOrder(order.id);
                    setShowDetailModal(true);
                  }} 
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Chi Tiết
                </button> 
              </div>

              {order.status === 'PENDING' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdateStatus({
                      orderId: order.id,
                      status: 'CONFIRMED'
                    })} 
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    <span>Duyệt Đơn</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowRejectModal(true);
                    }} 
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <Ban size={20} />
                    <span>Từ Chối</span>
                  </button>
                </div>
              )}
              
              {order.status === 'CONFIRMED' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdateStatus({
                      orderId: order.id,
                      status: 'PREPARING'
                    })} 
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Bắt Đầu Chuẩn Bị
                  </button>
                </div>
              )}

              {order.status === 'PREPARING' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdateStatus({
                      orderId: order.id,
                      status: 'DELIVERING'
                    })} 
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Giao Hàng
                  </button>
                </div>
              )}

              {order.status === 'DELIVERING' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdateStatus({
                      orderId: order.id,
                      status: 'COMPLETED'
                    })} 
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Hoàn Thành
                  </button>  
                </div>
              )}

              {order.status === 'REJECTED' && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-600">
                    Lý do từ chối: {order.rejectReason || 'Không có lý do'}
                  </p>
                  <button 
                    onClick={() => handleRefund(order.id)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Xử lý hoàn tiền
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold mb-4">Thống Kê Đơn Hàng</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chờ xác nhận</span>
                <span className="font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'PENDING').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đang xử lý</span>
                <span className="font-bold text-blue-600">
                  {orders.filter(o => ['CONFIRMED', 'PREPARING', 'DELIVERING'].includes(o.status)).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hoàn thành</span>
                <span className="font-bold text-green-600">
                  {orders.filter(o => o.status === 'COMPLETED').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đã hủy</span>
                <span className="font-bold text-red-600">
                  {orders.filter(o => ['CANCELLED', 'REJECTED'].includes(o.status)).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetailModal && (
        <OrderDetailModal
          show={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedOrder(null);
          }}
          orderId={selectedOrder}
          onUpdateStatus={handleUpdateStatus}
          onRefund={handleRefund}
        />
      )}

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              Từ Chối Đơn Hàng #{selectedOrder?.id}
            </h3>
            <p className="text-gray-600 mb-4">Vui lòng nhập lý do từ chối đơn hàng:</p>
            <textarea 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4 h-24" 
              placeholder="Nhập lý do..."
            />
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                  setSelectedOrder(null);
                }} 
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button 
                onClick={handleReject} 
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Xác Nhận Từ Chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};