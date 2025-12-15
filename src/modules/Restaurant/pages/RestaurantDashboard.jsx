import { 
  ShoppingBag, Star, DollarSign, TrendingUp,
} from 'lucide-react';

import {mockOrders  } from  "../../../dataSample/restaurant/mockOrders"
import {formatCurrency} from "../../../dataSample/restaurant/formatCurrency"
import {mockFoods} from "../../../dataSample/restaurant/mockFoods"
import { useRestaurant } from '../../../hooks/auth/restaurant/useRestaurant';
import { useEffect, useState } from 'react';

const RestaurantDashboard = () => {
  const [food , setFood] = useState();
  const [order, setOrder] = useState();
  const {listFoodBestSell , listOrderNew} =useRestaurant();

  const handleLoadFood = async () => {
    const data = await listFoodBestSell();
    const listOrder = await listOrderNew();
    setFood(data.results);
    setOrder(listOrder.results);
  }

  useEffect(() => {
   handleLoadFood();
  },[])

  const stats = [
    { label: 'Doanh Thu Hôm Nay', value: '12.5M', change: '+12%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Đơn Hàng Mới', value: '28', change: '+5%', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Món Bán Chạy', value: '156', change: '+18%', icon: TrendingUp, color: 'bg-orange-500' },
    { label: 'Đánh Giá TB', value: '4.8', change: '+0.2', icon: Star, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tổng Quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-lg font-bold mb-4">Đơn Hàng Gần Đây</h3>
          <div className="space-y-3">
            {order&&order.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{order.user.name}</p>
                  <p className="text-sm text-gray-600">{order.numberDishes} món • {order.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">{formatCurrency(order.totalAmount)}</p>
                  <span className={`text-xs px-2 py-1 rounded ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {order.status === 'COMPLETED' ? 'Hoàn thành' : 'Đang xử lý'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-lg font-bold mb-4">Top Món Bán Chạy</h3>
          <div className="space-y-3">
            {food && food.map((food, idx) => (
              <div key={food.id} className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-300">#{idx + 1}</span>
                <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-600">{food.sold} đã bán</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(food.price)}</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{4.7}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;