import { 
  ShoppingBag, Menu ,Search
} from 'lucide-react';
 
import { mockRestaurantData } from '../../../dataSample/restaurant/mockRestaurantData';


export default function Header  ({ setSidebarOpen })  {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30">
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu size={24} />
      </button>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:border-transparent" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <ShoppingBag size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <img src={mockRestaurantData.logo} alt="Avatar" className="w-8 h-8 rounded-full" />
          <span className="hidden md:block font-medium">{mockRestaurantData.name}</span>
        </div>
      </div>
    </header>
  );
};