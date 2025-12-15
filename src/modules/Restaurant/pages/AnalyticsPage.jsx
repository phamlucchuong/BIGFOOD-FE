 import React, { useState, useEffect } from 'react';
 import {Download , DollarSign , ShoppingBag ,Star } from "lucide-react"
 import {formatCurrency} from "../../../dataSample/restaurant/formatCurrency"
 import {useOrder } from "../../../hooks/auth/restaurant/useOrder"
 import { useRestaurant } from '../../../hooks/auth/restaurant/useRestaurant';

 export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('day');
  const[data , setData] = useState();
  const[dataBestFood , setDataBestFood] = useState();
  const[dataLestFood , setDataLeastFood] = useState();
  const {restaurantStatistical } = useOrder();
  const {listFoodBestSell , listFoodLeast} = useRestaurant();

  const handleLoad = async ()=>{
     const response = await restaurantStatistical();
     console.log( "restaurant Statistical : " ,response);
     if(response.ok){
      setData([response.results]);
     }
  }
   const handleLoadFood = async()=>{
      const listFoodBest = await listFoodBestSell();
      const listFoodLeasts = await listFoodLeast();
     if(listFoodBest.ok || listFoodLeasts.ok){
      setDataBestFood(listFoodBest.results);
      setDataLeastFood(listFoodLeasts.results);
     }
  }

  useEffect(()=> {
    handleLoad();
    handleLoadFood();
  },[])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Báo Cáo Thống Kê</h2>
        <div className="flex gap-3">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="day">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm này</option>
          </select>
          {/* <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={20} />
            <span>Xuất Báo Cáo</span>
          </button> */}
        </div>
      </div>
     {data && data.map(order => (
      <div key={order.id || order.index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Doanh Thu</h3>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">{formatCurrency(order.totalPrice)}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">{order.percentagePrice}%</span>
            <span className="text-gray-600">so với kỳ trước</span>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">Doanh thu TB/đơn</p>
            <p className="text-xl font-bold">
                {formatCurrency(order.averageUnitRevenuePrice)}
              </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Đơn Hàng</h3>
            <ShoppingBag className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">{order.numberOfOrder} đơn</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">{order.percentageOrder}%</span>
            <span className="text-gray-600">so với kỳ trước</span>
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hoàn thành</span>
              <span className="font-medium text-green-600">{order.numberOrderCompleted} </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Đã hủy</span>
              <span className="font-medium text-red-600">{order.numberOrderRejected} </span>
            </div>
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Đánh Giá</h3>
            <Star className="text-yellow-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">{order.averageStars}/5.0</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">{order.percentageStart}%</span>
            <span className="text-gray-600">so với kỳ trước</span>
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-20">Tích cực</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${order.percentagePositive}%` }}></div>
              </div>
              <span className="text-sm font-medium">{order.percentagePositive}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-20">Trung lập</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width:  `${100 - (order.percentagePositive + order.percentNegative) }%` }}></div>
              </div>
              <span className="text-sm font-medium">{100 - (order.percentagePositive +order.percentNegative)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-20">Tiêu cực</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width:  `${order.percentNegative}%`}}></div>
              </div>
              <span className="text-sm font-medium">{order.percentNegative}%</span>
            </div>
          </div>
        </div> 
      </div>
      ))
    }
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-bold mb-6">Biểu Đồ Doanh Thu</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[45, 62, 58, 73, 68, 85, 92].map((height, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-colors cursor-pointer" style={{height: `${height}%`}}></div>
              <span className="text-xs text-gray-600">T{idx + 2}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">Top Món Bán Chạy</h3>
          <div className="space-y-3">
            {dataBestFood&& dataBestFood.map((food, idx) => (
              <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-600">{food.sold} đã bán</p>
                </div>
                <p className="font-bold text-orange-600">{formatCurrency(food.price * food.sold)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">Món Ít Người Mua</h3>
          <div className="space-y-3">
            {dataLestFood && dataLestFood.map((food, idx) => (
              <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-600">{food.sold} đã bán</p>
                </div>
                <button className="px-3 py-1 text-sm border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50">
                  Khuyến mãi
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};