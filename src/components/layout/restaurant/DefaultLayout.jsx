import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardPage } from '../../../pages/restaurant/DashboardPage';
import { RestaurantInfoPage } from "../../../pages/restaurant/RestaurantInfoPage"
import { MenuManagementPage } from '../../../pages/restaurant/MenuManagementPage';
import { AnalyticsPage } from "../../../pages/restaurant/AnalyticsPage"
import { OrderManagementPage } from "../../../pages/restaurant/OrderManagementPage"
import {ReviewsManagementPage} from "../../../pages/restaurant/ReviewsManagementPage"

 export default function RestaurantHomePage(){
   const[activePage , setActivePage] = useState('dashboard')
   const[sidebarOpen , setSidebarOpen] = useState(false)

   const renderPage = () =>{
    switch(activePage) {
        case 'dashboard' : return < DashboardPage />
        case 'restaurant' : return <RestaurantInfoPage />
        case 'orders' : return <OrderManagementPage />
        case 'menu' : return <MenuManagementPage />
        case 'analytics' : return <AnalyticsPage />
        case 'reviews' : return <ReviewsManagementPage />
        default : return <DashboardPage />
    }
   }

    return(
        <div className="flex h-screen bg-gray-50">
        <Sidebar activePage={activePage} setActivePage={setActivePage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
    )
}

