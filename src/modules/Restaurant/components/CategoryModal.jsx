import React, { useState, useEffect } from 'react';
export const CategoryModal = ({ show, onClose, onSave, category = null}) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    icon: category?.icon || '🍽️'
  });

  const iconOptions = ['🥗', '🍜', '🍹', '🍰', '🍕', '🍔', '🍱', '🍣', '🥘', '🍲', '🥙', '🌮'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: category?.id || Date.now(), count: category?.count || 0 });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">{category ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tên danh mục</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:border-transparent"
              placeholder="Ví dụ: Món Khai Vị"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Chọn icon</label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({...formData, icon})}
                  className={`text-3xl p-3 rounded-lg border-2 hover:border-orange-500 transition-colors ${formData.icon === icon ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Hủy
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              {category ? 'Cập Nhật' : 'Thêm Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};