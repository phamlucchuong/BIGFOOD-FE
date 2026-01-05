import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Upload, X } from "lucide-react";
import handleLoadCategories from "../../../../hooks/data/useFoodCategory";
import useInfoRestaurant from "../../../../hooks/auth/restaurant/useInfoRestaurant";

const Step4 = ({ formData, setFormData }) => {
   const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBusinessFields, setShowBusinessFields] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error, handleSubmitRestaurant } = useInfoRestaurant();
 const goToLogin = () => navigate("/restaurant/login"); 
    useEffect(() => {
    const fetchData = async () => {
      const data = await handleLoadCategories();
      setCategories(data);
    };
    fetchData();
  }, [])

const toggleBusinessField = (category) => {
    const currentFields = formData.businessField || [];
    const isSelected = currentFields.some(field => field.id === category.id);

    if (isSelected) {
      setFormData({
        ...formData,
        businessField: currentFields.filter(f => f.id !== category.id)
      });
    } else {
      setFormData({
        ...formData,
        businessField: [...currentFields, { id: category.id, title: category.title }]
      });
    }
  };
  const removeBusinessField = (field) => {
    const currentFields = formData.businessField || [];
    setFormData({
      ...formData,
      businessField: currentFields.filter(f => f !== field)
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFormData({
        ...formData,
        businessLicenseFile: file
      });
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFormData({
      ...formData,
      businessLicenseFile: null
    });
  };

    const handleSubmit = async () => {
      setErrorMessage("");

      const result = await handleSubmitRestaurant(formData);

      if (result.success) {
        setShowSuccess(true);
      } else {
        setErrorMessage(result.message || "Có lỗi xảy ra");
      }
    };
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
          onClick={goToLogin}
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

        
          {(errorMessage || error) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errorMessage || error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                Lĩnh vực kinh doanh (Có thể chọn nhiều)
              </label>
              <div className="relative">
                <div
                  onClick={() => setShowBusinessFields(!showBusinessFields)}
                  className="w-full border border-gray-300 rounded px-4 py-3 cursor-pointer flex items-center justify-between min-h-[48px]"
                >
                  <div className="flex flex-wrap gap-2">
                    {formData.businessField && formData.businessField.length > 0 ? (
                      formData.businessField.map((field) => (
                        <span
                          key={field.id}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {field.title}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBusinessField(field.id);
                            }}
                            className="hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">Chọn lĩnh vực kinh doanh</span>
                    )}
                  </div>
                  <ChevronDown
                    className={`text-gray-500 transition-transform ${
                      showBusinessFields ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </div>

                {showBusinessFields && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      console.log("Category: ", category),
                      <div
                        key={category.id}
                        onClick={() => toggleBusinessField(category)}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      >
                        <span>{category.title}</span>
                       
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Tên cửa hàng</label>
              <input
                type="text"
                value={formData.storeName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, storeName: e.target.value })
                }
                placeholder="B Foods - Trẻ Trôn & Chả Cá"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

         
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Địa chỉ cửa hàng</label>
              <input
                type="text"
                value={formData.storeAddress || ""}
                onChange={(e) =>
                  setFormData({ ...formData, storeAddress: e.target.value })
                }
                placeholder="85 Bùi Minh Trực"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Số điện thoại liên hệ</label>
              <div className="flex gap-2">
                <div className="w-20 bg-gray-100 border border-gray-300 rounded px-3 py-3 text-center">
                  +84
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="flex-1 border border-gray-300 rounded px-4 py-3 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email của quản lý</label>
              <input
                type="tel"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

          
            <div>
              <label className="block text-gray-700 mb-2">Tên ngân hàng</label>
              <input
                type="text"
                value={formData.bankName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
                placeholder="VPBank"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Số tài khoản</label>
              <input
                type="text"
                value={formData.accountNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
                placeholder="123456789"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Tên chủ tài khoản</label>
              <input
                type="text"
                value={formData.accountName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 rounded px-4 py-3"
              />
            </div>

            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-3">
                Giấy phép kinh doanh
              </label>
              
              {!uploadedFile ? (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <Upload className="text-gray-400 mb-3" size={40} />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Nhấn để tải lên hoặc kéo thả file
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </label>
              ) : (
                <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 font-semibold py-3 rounded transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              {loading ? "Đang xử lý..." : "Hoàn tất"}
            </button>
          </div>
        </div>
      </div>

      {showBusinessFields && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowBusinessFields(false)}
        />
      )}

      {showSuccess && <SuccessModal />}
    </>
  );
};

export default Step4;
