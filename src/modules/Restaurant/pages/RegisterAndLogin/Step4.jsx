import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Step4 = ({ formData, setFormData, setCurrentStep }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3">Đăng ký thành công!</h2>
        <p className="text-gray-600 mb-6">
          Chúc mừng bạn đã hoàn tất đăng ký trở thành đối tác BeFood.
          Chúng tôi sẽ xem xét và phản hồi trong vòng 24–48 giờ.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded transition"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Đăng ký trở thành đối tác
          </h1>

          <h2 className="text-xl font-bold mb-6">Thông tin cửa hàng</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Type */}
            <div>
              <label className="block text-gray-700 mb-2">Loại hình kinh doanh</label>
              <div className="relative">
                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({ ...formData, businessType: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-3 appearance-none"
                >
                  <option>Doanh nghiệp</option>
                  <option>Hộ kinh doanh</option>
                  <option>Cá nhân</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Business Field */}
            <div>
              <label className="block text-gray-700 mb-2">Lĩnh vực kinh doanh</label>
              <div className="relative">
                <select
                  value={formData.businessField}
                  onChange={(e) =>
                    setFormData({ ...formData, businessField: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-3 appearance-none"
                >
                  <option value="">Chọn lĩnh vực kinh doanh</option>
                  <option>Ẩm thực</option>
                  <option>Đồ uống</option>
                  <option>Tráng miệng</option>
                  <option>Fast Food</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Store name */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Tên cửa hàng</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) =>
                  setFormData({ ...formData, storeName: e.target.value })
                }
                placeholder="B Foods - Trẻ Trôn & Chả Cá"
                className="w-full border border-blue-500 rounded px-4 py-3"
              />
            </div>

            {/* Store address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Địa chỉ cửa hàng</label>
              <input
                type="text"
                value={formData.storeAddress}
                onChange={(e) =>
                  setFormData({ ...formData, storeAddress: e.target.value })
                }
                placeholder="85 Bùi Minh Trực"
                className="w-full border border-blue-500 rounded px-4 py-3"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 mb-2">Tỉnh/Thành phố</label>
              <div className="relative">
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full border border-blue-500 rounded px-4 py-3 appearance-none"
                >
                  <option>Thành phố Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block text-gray-700 mb-2">Quận/Huyện</label>
              <div className="relative">
                <select
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full border border-blue-500 rounded px-4 py-3 appearance-none"
                >
                  <option>Quận 6</option>
                  <option>Quận 1</option>
                  <option>Quận 2</option>
                  <option>Quận 3</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Ward */}
            <div>
              <label className="block text-gray-700 mb-2">Xã/Phường</label>
              <div className="relative">
                <select
                  value={formData.ward}
                  onChange={(e) =>
                    setFormData({ ...formData, ward: e.target.value })
                  }
                  className="w-full border border-blue-500 rounded px-4 py-3 appearance-none"
                >
                  <option>Phường 05</option>
                  <option>Phường 01</option>
                  <option>Phường 02</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Store phone */}
            <div>
              <label className="block text-gray-700 mb-2">Số điện thoại liên hệ</label>
              <div className="flex gap-2">
                <div className="w-20 bg-gray-100 border border-gray-300 rounded px-3 py-3 text-center">
                  +84
                </div>
                <input
                  type="tel"
                  value={formData.storePhone}
                  onChange={(e) =>
                    setFormData({ ...formData, storePhone: e.target.value })
                  }
                  placeholder="987654321"
                  className="flex-1 border border-gray-300 rounded px-4 py-3"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email của quản lý</label>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) =>
                  setFormData({ ...formData, storeEmail: e.target.value })
                }
                placeholder="abc123@gmail.com"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            {/* Bank name */}
            <div>
              <label className="block text-gray-700 mb-2">Tên ngân hàng</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
                placeholder="(VPBank)"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            {/* Account number */}
            <div>
              <label className="block text-gray-700 mb-2">Số tài khoản</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
                placeholder="123456789"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            {/* Account owner */}
            <div>
              <label className="block text-gray-700 mb-2">Tên chủ tài khoản</label>
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded"
            >
              Quay lại
            </button>

            <button
              onClick={() => setShowSuccess(true)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>

      {showSuccess && <SuccessModal />}
    </>
  );
};

export default Step4;
