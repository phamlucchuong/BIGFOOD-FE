import React, { useState, useEffect } from 'react';
import { Image, Upload, Plus, Trash2 } from 'lucide-react';

export default function FoodModal({ show, onClose, onSave, food = null, categories = [] }) {
  const [formData, setFormData] = useState({
    idFood: '',
    name: '',
    categoryId: categories[0]?.id || '',
    image: '',
    description: '',
    available: false,
    foodOptions: []
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (food) {
      const categoryId = food.categoryId || categories.find(cat => cat.name === food.categoryName)?.id || categories[0]?.id;
      const foodOptions = food.foodOptions && food.foodOptions.length > 0
        ? food.foodOptions.map(opt => ({ name: opt.name, price: opt.price, defaultPrice: opt.defaultPrice }))
        : [{ name: 'Mặc định', price: food.price || '', defaultPrice: true }];
      setFormData({
        idFood: food.id || '',
        name: food.name || '',
        categoryId,
        image: food.image || '',
        description: food.description || '',
        available: food.available !== undefined ? food.available : false,
        foodOptions
      });
      setImagePreview(food.image || '');
    } else {
      // Reset cho thêm mới
      setFormData({
        idFood: '',
        name: '',
        categoryId: categories[0]?.id || '',
        image: '',
        description: '',
        available: false,
        foodOptions: [{ name: 'Mặc định', price: '', defaultPrice: true }]
      });
      setImagePreview('');
    }
  }, [food, categories]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (categoryId) => {
    const newFormData = { ...formData, categoryId };

    if ((!newFormData.foodOptions || newFormData.foodOptions.length === 0)) {
      newFormData.foodOptions = [
        { name: 'Mặc định', price: '', defaultPrice: true },
      ];
    }

    setFormData(newFormData);
  };

  const addOption = () => {
    setFormData({
      ...formData,
      foodOptions: [...formData.foodOptions, { name: '', price: '', defaultPrice: false }]
    });
  };

  const removeOption = (index) => {
    const newOptions = formData.foodOptions.filter((_, i) => i !== index);
    setFormData({ ...formData, foodOptions: newOptions });
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...formData.foodOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData({ ...formData, foodOptions: newOptions });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên món ăn');
      return;
    }
      if (formData.foodOptions.length === 0) {
        alert('Vui lòng thêm ít nhất một option cho đồ uống');
        return;
      }
      for (const option of formData.foodOptions) {
        if (!option.name.trim() || !option.price) {
          alert('Vui lòng điền đầy đủ thông tin option và giá');
          return;
        }
      }
    const submitData = {
      ...formData
    };

    // Nếu có foodOptions, xử lý price cho foodOptions
    submitData.foodOptions = formData.foodOptions.map(option => ({
      name: option.name,
      price: Number(option.price),
      defaultPrice: option.defaultPrice
    }));
    console.log("data food : ", submitData);
    onSave(submitData);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">{food ? 'Sửa Món Ăn' : 'Thêm Món Ăn Mới'}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Ảnh món ăn</label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-lg object-cover" />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="text-gray-400" size={32} />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="food-image"
                  />
                  <label
                    htmlFor="food-image"
                    className="cursor-pointer px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 inline-flex items-center gap-2"
                  >
                    <Upload size={20} />
                    <span>Tải ảnh lên</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tên món ăn *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:border-transparent"
                placeholder="Ví dụ: Trà Sữa Trân Châu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Danh mục *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>

            {/* Hiển thị phần foodOptions nếu là đồ uống */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Kích cỡ & Giá *</label>
                <button
                  type="button"
                  onClick={addOption}
                  className="text-orange-600 hover:text-orange-700 flex items-center gap-1 text-sm"
                >
                  <Plus size={16} />
                  Thêm option
                </button>
              </div>
              <div className="space-y-2">
                {formData.foodOptions.map((option, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) => updateOption(index, 'name', e.target.value)}
                      className="w-24 px-3 py-2 border rounded-lg focus:border-transparent"
                      placeholder="Kích cỡ"
                    />
                    <input
                      type="number"
                      value={option.price}
                      onChange={(e) => updateOption(index, 'price', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg  focus:border-transparent"
                      placeholder="Giá (VNĐ)"
                      min="0"
                    />
                    {formData.foodOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {formData.foodOptions.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Chưa có option nào. Nhấn "Thêm option" để bắt đầu.</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Mô tả món ăn</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:border-transparent"
                placeholder="Mô tả ngắn về món ăn..."
                rows="3"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              {food ? 'Cập Nhật' : 'Thêm Món'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}