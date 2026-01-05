
import React, { useState, useEffect } from 'react';

export const CategoryModal = ({ show, onClose, onSave, category = null }) => {
  const iconOptions = ['🥗', '🍜', '🍹', '🍰', '🍕', '🍔', '🍱', '🍣', '🥘', '🍲', '🥙', '🌮'];
  
  const [formData, setFormData] = useState({
    name: '',
    iconIndex: 0
  });
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        iconIndex: category.iconIndex !== undefined ? category.iconIndex : 0
      });
    } else {
      setFormData({
        name: '',
        iconIndex: 0
      });
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim() === '') {
      alert('Vui lòng nhập tên danh mục');
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      iconIndex: formData.iconIndex,
      icon: iconOptions[formData.iconIndex], 
    };

    if (category?.id) {
      categoryData.id = category.id;
      categoryData.count = category.count || 0;
    }

    onSave(categoryData);
    onClose();
  };

  const handleSelectIcon = (index) => {
    setFormData({ ...formData, iconIndex: index });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">
          {category ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tên danh mục <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ví dụ: Món Khai Vị"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Chọn icon <span className="text-red-500">*</span>
            </label>
            <div className="mb-3 p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-5xl mb-2">{iconOptions[formData.iconIndex]}</div>
              <p className="text-sm text-gray-600">
                Icon đã chọn (Index: {formData.iconIndex})
              </p>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectIcon(index)}
                  className={`text-3xl p-3 rounded-lg border-2 hover:border-orange-500 transition-all transform hover:scale-110 ${
                    formData.iconIndex === index 
                      ? 'border-orange-500 bg-orange-50 shadow-md' 
                      : 'border-gray-200'
                  }`}
                  title={`Icon ${index}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              {category ? 'Cập Nhật' : 'Thêm Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};