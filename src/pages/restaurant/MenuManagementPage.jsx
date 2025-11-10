import React, { useState, useEffect } from 'react';
import {Plus ,Edit2 , Trash2 ,Filter , Star ,Eye , EyeOff} from "lucide-react";
import {mockCategories } from'../../dataSample/restaurant/mockCategories';
import { mockFoods } from '../../dataSample/restaurant/mockFoods'; 
import {formatCurrency} from "../../dataSample/restaurant/formatCurrency"
import { CategoryModal } from './CategoryModal';
import { FoodModal } from './FoodModal';

export const MenuManagementPage = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [foods, setFoods] = useState(mockFoods);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingFood, setEditingFood] = useState(null);
  

  const handleSaveCategory = (category) => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === category.id ? category : c));
    } else {
      setCategories([...categories, category]);
    }
    setEditingCategory(null);
  };


  const handleDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleSaveFood = (food) => {
    if (editingFood) {
      setFoods(foods.map(f => f.id === food.id ? food : f));
    } else {
      setFoods([...foods, food]);
    }
    setEditingFood(null);
  };

  const handleDeleteFood = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa món ăn này?')) {
      setFoods(foods.filter(f => f.id !== id));
    }
  };

  const handleToggleSoldOut = (id) => {
    setFoods(foods.map(f => f.id === id ? {...f, soldOut: !f.soldOut} : f));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản Lý Thực Đơn</h2>
        <div className="flex gap-3">
          <button onClick={() => setShowCategoryModal(true)} className="flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50">
            <Plus size={20} />
            <span>Danh Mục</span>
          </button>
          {showCategoryModal && (
            <CategoryModal 
              show={showCategoryModal}
              onClose={() => {setShowCategoryModal(false) ;  setEditingCategory(null)}}
              onSave={handleSaveCategory}
              category={editingCategory}
            />
          )}
          <button onClick={() => setShowFoodModal(true)} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Plus size={20} />
            <span>Món Ăn</span>
          </button>
            { showFoodModal && ( 
            <FoodModal 
              show={showFoodModal}
              onClose={()=> {setShowFoodModal(false) , setEditingFood(null)}}
              onSave={handleSaveFood}
              food={editingFood}
              categories ={categories}
            />
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-4 rounded-xl border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCategory(cat)}>
            <div className="text-3xl mb-2">{cat.icon}</div>
            <h3 className="font-bold mb-1">{cat.name}</h3>
            <p className="text-sm text-gray-600">{cat.count} món</p>
            <div className="flex gap-2 mt-3">
              <button onClick={()=> {setEditingCategory(cat) , setShowCategoryModal(true) }} className="p-1 hover:bg-orange-50 rounded text-orange-600"><Edit2 size={16} /></button>
              <button onClick={()=> handleDeleteCategory(cat.id)} className="p-1 hover:bg-red-50 rounded text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">Danh Sách Món Ăn</h3>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-lg text-sm">
              <option>Tất cả danh mục</option>
              {categories.map(cat => <option key={cat.id}>{cat.name}</option>)}
            </select>
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Món Ăn</th>
                <th className="text-left p-4 font-medium text-gray-600">Danh Mục</th>
                <th className="text-left p-4 font-medium text-gray-600">Giá</th>
                <th className="text-left p-4 font-medium text-gray-600">Đã Bán</th>
                <th className="text-left p-4 font-medium text-gray-600">Đánh Giá</th>
                <th className="text-left p-4 font-medium text-gray-600">Trạng Thái</th>
                <th className="text-left p-4 font-medium text-gray-600">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={food.image} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium">{food.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{categories.find(c => c.id === food.category)?.name}</span>
                  </td>
                  <td className="p-4 font-medium">{formatCurrency(food.price)}</td>
                  <td className="p-4 text-gray-600">{food.sold}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{food.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {food.soldOut ? (
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Hết hàng</span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Còn hàng</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={()=> { setEditingFood(food) , setShowFoodModal(true)}} className="p-2 hover:bg-orange-50 rounded text-orange-600"><Edit2 size={18} /></button>
                      <button onClick={()=> handleDeleteFood(food.id)}  className="p-2 hover:bg-red-50 rounded text-red-600"><Trash2 size={18} /></button>
                      <button onClick={()=> handleToggleSoldOut(food.id)} className="p-2 hover:bg-gray-100 rounded">{food.soldOut ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                    </div>
                  </td>
                </tr> 
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};