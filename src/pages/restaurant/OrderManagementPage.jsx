import React, { useState, useEffect } from 'react';
import {Ban , Check , Download } from "lucide-react"
import { mockOrders } from "../../dataSample/restaurant/mockOrders";
import {formatCurrency} from "../../dataSample/restaurant/formatCurrency"
import { OrderDetailModal } from"./OrderDetailModal"

export const OrderManagementPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

   const handleUpdateStatus = (orderId, newStatus) => {
     setOrders(orders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
     setShowDetailModal(false);
   };
 
   const handleReject = (orderId, reason) => {
     setOrders(orders.map(o => o.id === orderId ? {...o, status: 'cancelled', cancelReason: reason} : o));
     setShowDetailModal(false);
   };
 
   const handleRefund = (orderId) => {
     alert('Đã gửi yêu cầu hoàn tiền cho đơn hàng #' + orderId);
     setShowDetailModal(false);
   };
 
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
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold">Quản Lý Đơn Hàng</h2>
         <div className="flex gap-3">
           <select className="px-4 py-2 border rounded-lg">
             <option>Tất cả trạng thái</option>
             <option>Chờ xác nhận</option>
             <option>Đang xử lý</option>
             <option>Hoàn thành</option>
             <option>Đã hủy</option>
           </select>
           <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
             <Download size={20} />
             <span>Xuất Excel</span>
           </button>
         </div>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-4">
           {orders.map(order => (
             <div key={order.id} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow">
               <div className="flex items-start justify-between mb-4">
                 <div>
                   <h3 className="font-bold text-lg">Đơn hàng #{order.id}</h3>
                   <p className="text-gray-600 text-sm">{order.customer} • {order.time} - {order.date}</p>
                 </div>
                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                   {statusLabels[order.status]}
                 </span>
               </div>
               
               <div className="flex items-center justify-between mb-4 pb-4 border-b">
                 <div>
                   <p className="text-sm text-gray-600">Tổng tiền</p>
                   <p className="text-xl font-bold text-orange-600">{formatCurrency(order.total)}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-sm text-gray-600">Số món</p>
                    <p className="font-bold">{order.items.length} món</p> 
                 </div>
                 <button onClick={()=> {setSelectedOrder(order);   setShowDetailModal(true) }} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                       Chi Tiết
                 </button> 
               </div>
                 
               { showDetailModal && (
                   <OrderDetailModal
                   show ={showDetailModal}
                   onClose ={()=> setShowDetailModal(false)}
                   order ={selectedOrder}
                   onUpdateStatus={handleUpdateStatus}
                   onReject={handleReject}
                   onRefund={handleRefund}
                   />
                 )
               }
               {order.status === 'pending' && (
                 <div className="flex gap-3">
                   <button onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'confirmed'} : o))} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                     <Check size={20} />
                     <span>Duyệt Đơn</span>
                   </button>
                   <button onClick={() => { setSelectedOrder(order); setShowRejectModal(true); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                     <Ban size={20} />
                     <span>Từ Chối</span>
                   </button>
                 </div>
               )}
               
               {order.status === 'confirmed' && (
                 <div className="flex gap-3">
                   <button onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'preparing'} : o))} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                     Bắt Đầu Chuẩn Bị
                   </button>
                 </div>
               )}
 
               {order.status === 'preparing' && (
                 <div className="flex gap-3">
                   <button onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'delivering'} : o))} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                     Giao Hàng
                   </button>
                 </div>
               )}
 
               {order.status === 'delivering' && (
                 <div className="flex gap-3">
                   <button onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'completed'} : o))} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                     Hoàn Thành
                   </button>  
                 </div>
               )}
 
               {order.status === 'cancelled' && (
                 <div className="bg-red-50 p-3 rounded-lg">
                   <p className="text-sm text-red-600">Lý do hủy: Khách hàng thay đổi ý định</p>
                   <button className="mt-2 text-sm text-red-600 hover:underline">Xử lý hoàn tiền</button>
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
                 <span className="font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-gray-600">Đang xử lý</span>
                 <span className="font-bold text-blue-600">{orders.filter(o => ['confirmed', 'preparing', 'delivering'].includes(o.status)).length}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-gray-600">Hoàn thành</span>
                 <span className="font-bold text-green-600">{orders.filter(o => o.status === 'completed').length}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-gray-600">Đã hủy</span>
                 <span className="font-bold text-red-600">{orders.filter(o => o.status === 'cancelled').length}</span>
               </div>
             </div>
           </div>
 
           <div className="bg-white p-6 rounded-xl border">
             <h3 className="font-bold mb-4">Giờ Cao Điểm</h3>
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-gray-600">11:00 - 13:00</span>
                 <div className="flex items-center gap-2">
                   <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div className="h-full bg-orange-500" style={{width: '85%'}}></div>
                   </div>
                   <span className="text-sm font-medium">85%</span>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-gray-600">18:00 - 20:00</span>
                 <div className="flex items-center gap-2">
                   <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div className="h-full bg-orange-500" style={{width: '92%'}}></div>
                   </div>
                   <span className="text-sm font-medium">92%</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
 
       {showRejectModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-xl p-6 max-w-md w-full">
             <h3 className="text-xl font-bold mb-4">Từ Chối Đơn Hàng #{selectedOrder?.id}</h3>
             <p className="text-gray-600 mb-4">Vui lòng nhập lý do từ chối đơn hàng:</p>
             <textarea className="w-full px-3 py-2 border rounded-lg mb-4 h-24" placeholder="Nhập lý do..."></textarea>
             <div className="flex gap-3">
               <button onClick={() => setShowRejectModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Hủy</button>
               <button onClick={() => { setOrders(orders.map(o => o.id === selectedOrder.id ? {...o, status: 'cancelled'} : o)); setShowRejectModal(false); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Xác Nhận Từ Chối</button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };