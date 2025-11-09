 import React, { useState, useEffect } from 'react';
 import {Download , DollarSign , ShoppingBag ,Star } from "lucide-react"
 import { mockFoods } from "../../dataSample/restaurant/mockFoods";
 import {formatCurrency} from "../../dataSample/restaurant/formatCurrency"

 export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('day');

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
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={20} />
            <span>Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Doanh Thu</h3>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">12,500,000đ</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="text-gray-600">so với kỳ trước</span>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">Doanh thu TB/đơn</p>
            <p className="text-xl font-bold">156,250đ</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Đơn Hàng</h3>
            <ShoppingBag className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">80 đơn</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">+8.2%</span>
            <span className="text-gray-600">so với kỳ trước</span>
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hoàn thành</span>
              <span className="font-medium text-green-600">72 (90%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Đã hủy</span>
              <span className="font-medium text-red-600">8 (10%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Đánh Giá</h3>
            <Star className="text-yellow-500" size={24} />
          </div>
          <p className="text-3xl font-bold mb-2">4.8/5.0</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">+0.2</span>
            <span className="text-gray-600">so với kỳ trước</span>
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-20">Tích cực</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{width: '85%'}}></div>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-20">Trung lập</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{width: '10%'}}></div>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-20">Tiêu cực</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{width: '5%'}}></div>
              </div>
              <span className="text-sm font-medium">5%</span>
            </div>
          </div>
        </div>
      </div>

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
            {mockFoods.sort((a, b) => b.sold - a.sold).slice(0, 5).map((food, idx) => (
              <div key={food.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg font-bold text-gray-300 w-6">#{idx + 1}</span>
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
            {mockFoods.sort((a, b) => a.sold - b.sold).slice(0, 5).map((food, idx) => (
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