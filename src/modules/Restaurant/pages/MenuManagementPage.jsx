import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Filter, Star, Eye, EyeOff } from "lucide-react";
import { formatCurrency } from "../../../dataSample/restaurant/formatCurrency"
import { CategoryModal } from '../components/CategoryModal';
import  FoodModal  from '../components/FoodModal';
import { useRestaurant } from "../../../hooks/auth/restaurant/useRestaurant"

export const MenuManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingFood, setEditingFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  const { 
    getCategorieFoods, 
    createCategory, 
    editCategory, 
    removeCategory ,
    addFood ,
    listFood,
    updateFoodItem,
    removeFood,
    updateFoodItemIsAvailable,
    listFoodByCatogoryId
  } = useRestaurant();

 const loadFoods = async () => {
        try {
            const data = await listFood();
            setFoods(data.results);
        } catch (error) {
            console.error('Error loading foods:', error);
            alert('Không thể tải danh sách món ăn');
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await getCategorieFoods();
            setCategories(data.results);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

  useEffect(() => {
    loadCategories();
    loadFoods();
  }, []);
  
  const handleSaveCategory = async (category) => {
    try {
      if (editingCategory) {
        console.log(category)
        await editCategory(category);
      } else {
        await createCategory(category.name, category.iconIndex);
      }
        loadCategories();
      setEditingCategory(null);
      setShowCategoryModal(false);
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Không thể lưu danh mục. Vui lòng thử lại!");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      try {
        await removeCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Không thể xóa danh mục. Vui lòng thử lại!");
        await loadCategories();
      }
    }
  };

  const handleSaveFood = async (foodData) => {
    try {
      if (editingFood) {
        await updateFoodItem(foodData);
      } else {
        await addFood(foodData);
      }
      loadFoods();
      setEditingFood(null);
      setShowFoodModal(false);
    } catch (error) {
      console.error('Error saving food:', error);
      alert(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteFood = async (foodId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
            return;
        }
        try {
            await removeFood(foodId);
            loadFoods();
        } catch (error) {
            console.error('Error deleting food:', error);
            alert(`Không thể xóa món ăn: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
  const handleToggleSoldOut = async (foodId) => {
        try {
            const food = foods.find(f => f.id === foodId);
            if (!food) return;

            const updatedData = {
                ...food,
                available: !food.available
            };
            const updatedFood  = await updateFoodItemIsAvailable(updatedData);
             setFoods(foods.map(f => f.id === foodId ? updatedFood : f));
             loadFoods();
        } catch (error) {
            console.error('Error toggling sold out status:', error);
            alert('Không thể cập nhật trạng thái');
        }
    };

  const listFoodByCategoryId = async (categoryId) => {
      try {
          const response = await listFoodByCatogoryId(categoryId);
          console.log(response);
          setFoods(response.results);
      } catch (error) {
          console.error('Error fetching foods:', error);
      }
  };
  const handleCategoryChange = (e) => {
    let value = e.target.value;
    setSelectedCategoryId(value);
    listFoodByCategoryId(value);
}
  if (loading) {
    return <div className="flex justify-center items-center h-64">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản Lý Thực Đơn</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCategoryModal(true)} 
            className="flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50"
          >
            <Plus size={20} />
            <span>Danh Mục</span>
          </button>
          
          <button 
            onClick={() => setShowFoodModal(true)} 
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <Plus size={20} />
            <span>Món Ăn</span>
          </button>
        </div>
      </div>
      {showCategoryModal && (
        <CategoryModal 
          show={showCategoryModal}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          category={editingCategory}
        />
      )}
      {showFoodModal && ( 
        <FoodModal 
          show={showFoodModal}
          onClose={() => {
            setShowFoodModal(false);
            setEditingFood(null);
          }}
          onSave={handleSaveFood}
          food={editingFood}
          categories={categories}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            Chưa có danh mục nào. Hãy thêm danh mục mới!
          </div>
        ) : (
          categories.map(cat => (
            <div 
              key={cat.id} 
              className="bg-white p-4 rounded-xl border hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => setSelectedCategory(cat)}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-bold mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.numberFood || 0} món</p>
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCategory(cat);
                    setShowCategoryModal(true);
                  }} 
                  className="p-1 hover:bg-orange-50 rounded text-orange-600"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(cat.id);
                  }} 
                  className="p-1 hover:bg-red-50 rounded text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">Danh Sách Món Ăn</h3>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border rounded-lg text-sm"
              onChange={handleCategoryChange}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

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
                <th className="text-left p-4 font-medium text-gray-600">Trạng Thái</th>
                <th className="text-left p-4 font-medium text-gray-600">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {foods.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    Chưa có món ăn nào. Hãy thêm món ăn mới!
                  </td>
                </tr>
              ) : (
                foods.map(food => (
                  <tr key={food.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={food.image} 
                          alt={food.name} 
                          className="w-12 h-12 rounded-lg object-cover" 
                        />
                        <span className="font-medium">{food.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">
                        {food.categoryName}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{formatCurrency(food.price)}</td>
                    <td className="p-4 text-gray-600">{food.sold}</td>
                    <td className="p-4">
                      {!food.available ? (
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                          Hết hàng
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                          Còn hàng
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            console.log("show food menu " , food);
                            setEditingFood(food);
                            setShowFoodModal(true);
                          }} 
                          className="p-2 hover:bg-orange-50 rounded text-orange-600"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteFood(food.id)} 
                          className="p-2 hover:bg-red-50 rounded text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleToggleSoldOut(food.id)} 
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          {food.available ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr> 
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};