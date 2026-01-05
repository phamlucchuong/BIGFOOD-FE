import React, { useState, useEffect } from 'react';
import { Download, DollarSign, ShoppingBag, Star } from "lucide-react";
import { formatCurrency } from "../../../dataSample/restaurant/formatCurrency";
import { useOrder } from "../../../hooks/auth/restaurant/useOrder";
import { useRestaurant } from '../../../hooks/auth/restaurant/useRestaurant';

export const AnalyticsPage = () => {
  const [data, setData] = useState();
  const [dataBestFood, setDataBestFood] = useState();
  const [dataLeastFood, setDataLeastFood] = useState();
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  
  const { restaurantStatistical, restaurantStatisticalAndSort, getChartData } = useOrder();
  const { listFoodBestSell, listFoodLeast } = useRestaurant();

  const handleLoad = async () => {
    const response = await restaurantStatistical();
    if (response.ok) {
      setData([response.results]);
    }
  };

  const handleLoadFood = async () => {
    const listFoodBest = await listFoodBestSell();
    const listFoodLeasts = await listFoodLeast();
    if (listFoodBest.ok || listFoodLeasts.ok) {
      setDataBestFood(listFoodBest.results);
      setDataLeastFood(listFoodLeasts.results);
    }
  };

  const handleLoadSort = async (newTimeRange) => {
    console.log("newTimeRange : " , newTimeRange);
    try {
      setTimeRange(newTimeRange);
      const response = await restaurantStatisticalAndSort(newTimeRange);
      console.log("restaurant Statistical sort: ", response);
      if (response.ok) {
        setData([response.results]);
        
        // Nếu API có trả về dữ liệu biểu đồ
        if (response.results.chartData) {
          setChartData(response.results.chartData);
        }
      }
    } catch (error) {
      console.error("Error loading statistics:", error);
    }
  };

  useEffect(() => {
    handleLoad();
    handleLoadFood();
    handleLoadSort(timeRange);
  }, []);

  // Tính toán giá trị max cho biểu đồ
  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => d.value || 0), 1) : 1;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Báo Cáo Thống Kê</h2>
        <div className="flex gap-3">
          <select 
            onChange={(e) => handleLoadSort(e.target.value)} 
            value={timeRange}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="day">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm này</option>
          </select>
        </div>
      </div>

      {data && data.map((order, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Doanh Thu</h3>
              <DollarSign className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">{formatCurrency(order.totalPrice)}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 font-medium">↑ {order.percentagePrice}%</span>
              <span className="text-gray-600">so với kỳ trước</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">Doanh thu TB/đơn</p>
              <p className="text-xl font-bold">
                {formatCurrency(order.averageUnitRevenuePrice)}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Đơn Hàng</h3>
              <ShoppingBag className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">{order.numberOfOrder} đơn</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 font-medium">↑ {order.percentageOrder}%</span>
              <span className="text-gray-600">so với kỳ trước</span>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Hoàn thành</span>
                <span className="font-medium text-green-600">{order.numberOrderCompleted}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Đã hủy</span>
                <span className="font-medium text-red-600">{order.numberOrderRejected}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Đánh Giá</h3>
              <Star className="text-yellow-500" size={24} fill="currentColor" />
            </div>
            <p className="text-3xl font-bold mb-2">{order.averageStars}/5.0</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 font-medium">↑ {order.percentageStart}%</span>
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
                  <div className="h-full bg-yellow-500" style={{ width: `${100 - (order.percentagePositive + order.percentNegative)}%` }}></div>
                </div>
                <span className="text-sm font-medium">{100 - (order.percentagePositive + order.percentNegative)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-20">Tiêu cực</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${order.percentNegative}%` }}></div>
                </div>
                <span className="text-sm font-medium">{order.percentNegative}%</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Biểu Đồ Doanh Thu</h3>
          <span className="text-sm text-gray-600">
            {timeRange === 'day' && 'Theo ngày'}
            {timeRange === 'week' && 'Theo tuần'}
            {timeRange === 'month' && 'Theo tháng'}
            {timeRange === 'year' && 'Theo năm'}
          </span>
        </div>
        
        {chartData && chartData.length > 0 ? (
          <div className="h-64 flex items-end justify-between gap-1 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="flex items-center w-full border-t border-gray-100">
                  <span className="text-xs text-gray-400 -ml-8">{val}%</span>
                </div>
              ))}
            </div>
            
            {/* Bars */}
            {chartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 relative group">
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg hover:from-orange-600 hover:to-orange-500 transition-all duration-300 cursor-pointer relative"
                  style={{ 
                    height: `${(item.value / maxValue) * 100}%`, 
                    minHeight: item.value > 0 ? '4px' : '0px' 
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {formatCurrency(item.value)}
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium truncate w-full text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            Không có dữ liệu biểu đồ
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-4">Top Món Bán Chạy</h3>
          <div className="space-y-3">
            {dataBestFood && dataBestFood.length > 0 ? (
              dataBestFood.map((food, idx) => (
                <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-gray-600">{food.sold} đã bán</p>
                  </div>
                  <p className="font-bold text-orange-600">
                    {formatCurrency(food.foodOptions?.find(opt => opt.defaultPrice)?.price || 0)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Chưa có dữ liệu</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-4">Món Ít Người Mua</h3>
          <div className="space-y-3">
            {dataLeastFood && dataLeastFood.length > 0 ? (
              dataLeastFood.map((food, idx) => (
                <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-gray-600">{food.sold} đã bán</p>
                  </div>
                  <button className="px-3 py-1 text-sm border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                    Khuyến mãi
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Chưa có dữ liệu</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};