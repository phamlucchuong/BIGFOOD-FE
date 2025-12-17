import React, { useState, useEffect } from 'react';
import { Image, Upload } from 'lucide-react';

export const FoodModal = ({ show , onClose, onSave, food = null, categories }) => {
  const [formData, setFormData] = useState({
    idFood: food?.id || '',
    name: food?.name || '',
    categoryId: food?.categoryId || categories[0]?.id,
    price: food?.price || '',
    image: food?.image || '',
    description: food?.description || '',
    available: food?.available || false
  });
  const [imagePreview, setImagePreview] = useState(food?.image || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({...formData, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      ...formData, 
      price: Number(formData.price)
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8">
        <h3 className="text-xl font-bold mb-4">{food ? 'Sửa Món Ăn' : 'Thêm Món Ăn Mới'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-transparent"
                placeholder="Ví dụ: Phở Bò Đặc Biệt"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Danh mục *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg  focus:ring-orange-500 focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Giá (VNĐ) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg  focus:ring-orange-500 focus:border-transparent"
                placeholder="50000"
                required
                min="0"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Mô tả món ăn</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-transparent"
                placeholder="Mô tả ngắn về món ăn..."
                rows="3"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Hủy
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              {food ? 'Cập Nhật' : 'Thêm Món'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};