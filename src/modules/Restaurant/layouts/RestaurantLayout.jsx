import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

 export default function RestaurantLayout(){
   const[sidebarOpen , setSidebarOpen] = useState(false)


    return(
        <div className="flex h-screen bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet/>
        </main>
      </div>
    </div>
    )
}

