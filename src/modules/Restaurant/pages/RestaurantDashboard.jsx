import React, { useEffect, useState } from 'react';
import { 
  ShoppingBag, Star, DollarSign, TrendingUp,
} from 'lucide-react';
import { formatCurrency } from "../../../dataSample/restaurant/formatCurrency";
import { useRestaurant } from '../../../hooks/auth/restaurant/useRestaurant';
import { useOrder } from "../../../hooks/auth/restaurant/useOrder";

const RestaurantDashboard = () => {
  const { restaurantStatisticalAndSort } = useOrder();
  const { listFoodBestSell, listOrderNew } = useRestaurant();

  const [data, setData] = useState(null);
  const [food, setFood] = useState([]);
  const [order, setOrder] = useState([]);

  const handleLoadFood = async () => {
    const foodData = await listFoodBestSell();
    const listOrder = await listOrderNew();
    if (foodData.ok) setFood(foodData.results);
    if (listOrder.ok) setOrder(listOrder.results);
  };

  const handleLoadSort = async (newTimeRange) => {
    try {
      const response = await restaurantStatisticalAndSort(newTimeRange);
      console.log("restaurant Statistical sort:", response);
      if (response.ok) {
        setData(response.results);
      }
    } catch (error) {
      console.error("Error loading statistics:", error);
    }
  };

  useEffect(() => {
    handleLoadFood();
    handleLoadSort("day");
  }, []);

  const statsConfig = [
    { 
      label: 'Doanh Thu Hôm Nay', 
      getValue: (data) => formatCurrency(data?.totalPrice || 0),
      getChange: (data) => data?.percentagePrice || 0,
      icon: DollarSign, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Đơn Hàng Mới', 
      getValue: (data) => data?.numberOfOrder || 0,
      getChange: (data) => data?.percentageOrder || 0,
      icon: ShoppingBag, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Đánh Giá TB', 
      getValue: (data) => data?.averageStars || 0,
      getChange: (data) => data?.percentageStart || 0,
      icon: Star, 
      color: 'bg-yellow-500' 
    },
    { 
      label: 'Giá Trị TB/Đơn', 
      getValue: (data) => formatCurrency(data?.averageUnitRevenuePrice || 0),
      getChange: (data) => '+0',
      icon: TrendingUp, 
      color: 'bg-orange-500' 
    },
  ];

  const getStatusDisplay = (status) => {
    const statusMap = {
      'COMPLETED': { text: 'Hoàn thành', class: 'bg-green-100 text-green-600' },
      'PENDING': { text: 'Chờ xác nhận', class: 'bg-yellow-100 text-yellow-600' },
      'PROCESSING': { text: 'Đang xử lý', class: 'bg-blue-100 text-blue-600' },
      'SHIPPING': { text: 'Đang giao', class: 'bg-purple-100 text-purple-600' },
      'CANCELLED': { text: 'Đã hủy', class: 'bg-red-100 text-red-600' },
    };
    return statusMap[status] || { text: status, class: 'bg-gray-100 text-gray-600' };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold">Tổng Quan</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <Icon size={24} />
                </div>
                <span className="text-green-600 text-sm font-medium">
                  ↑ {stat.getChange(data)}%
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.getValue(data)}</p>
            </div>
          );
        })}
      </div>
      
      {/* Recent Orders & Top Foods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Đơn Hàng Gần Đây</h3>
          <div className="space-y-3">
            {order && order.length > 0 ? (
              order.map(orderItem => {
                const statusInfo = getStatusDisplay(orderItem.status);
                return (
                  <div key={orderItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">{orderItem.user?.name || 'Khách hàng'}</p>
                      <p className="text-sm text-gray-600">
                        {orderItem.numberDishes || 0} món • {formatDate(orderItem.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600 mb-1">
                        {formatCurrency(orderItem.totalAmount)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center py-8">Chưa có đơn hàng nào</p>
            )}
          </div>
        </div>

        {/* Top Selling Foods */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Top Món Bán Chạy</h3>
          <div className="space-y-3">
            {food && food.length > 0 ? (
              food.map((foodItem, idx) => (
                <div key={foodItem.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className={`text-lg font-bold ${idx < 3 ? 'text-orange-500' : 'text-gray-300'}`}>
                    #{idx + 1}
                  </span>
                  <img 
                    src={foodItem.image} 
                    alt={foodItem.name} 
                    className="w-12 h-12 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <p className="font-medium">{foodItem.name}</p>
                    <p className="text-sm text-gray-600">{foodItem.sold} đã bán</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">
                      {formatCurrency(foodItem.foodOptions?.find(opt => opt.defaultPrice)?.price || 0)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Chưa có dữ liệu món ăn</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;