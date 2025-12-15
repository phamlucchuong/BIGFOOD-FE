import { useState, useEffect } from 'react';
import { 
  Home, Store, UtensilsCrossed, ShoppingBag, BarChart3, 
  Star, X, LogOut
} from 'lucide-react';
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router-dom';
import { getToken , removeToken } from '../../../services/localStorageService';

export default function Sidebar ({ activePage, sidebarOpen, setSidebarOpen }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); 
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Tổng Quan', path: '' }, // path rỗng cho index route
    { id: 'info', icon: Store, label: 'Thông Tin NH', path: 'info' },
    { id: 'menu', icon: UtensilsCrossed, label: 'Thực Đơn', path: 'menu' },
    { id: 'orders', icon: ShoppingBag, label: 'Đơn Hàng', path: 'orders' },
    { id: 'analytics', icon: BarChart3, label: 'Thống Kê', path: 'analytics' },
    { id: 'reviews', icon: Star, label: 'Đánh Giá', path: 'reviews' },
  ];

  // 💡 Logic để xác định trang đang hoạt động (ví dụ: 'restaurant/info' -> 'info')
  const isActive = (itemPath) => {
    // Nếu activePage là 'restaurant' (từ /restaurant/), chúng ta muốn highlight Dashboard
    if (itemPath === '' && activePage === 'restaurant') {
        return true;
    }
    // So sánh các trang còn lại
    return activePage === itemPath;
  };
    useEffect(() => {
      const t = getToken();
      setToken(t);
    }, []);

    const handleLogout = () => {
      removeToken();
      setToken(null);
      navigate("/restaurant/login");
    };

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <h1 className="text-xl font-bold text-orange-600">BeFood Admin</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            // 💡 BƯỚC 2: THAY THẾ <button> BẰNG <Link>
            // to={item.path} là relative path, sẽ hoạt động tốt trong route /restaurant/
            <Link
              key={item.id}
              to={item.path} 
              onClick={() => { setSidebarOpen(false); }} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors 
                ${isActive(item.path) ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'}`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <button onClick={ handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Đăng Xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
};