import './App.css';
import "react-phone-input-2/lib/style.css";
import AppRoutes from './routes/AppRoutes.jsx';
import { BrowserRouter } from 'react-router-dom';
 import RestaurantHomePage from './components/layout/restaurant/DefaultLayout.jsx';
// import RestaurantHomePage from './pages/RestaurantAdminApp.jsx';

function App() {
  return (
    // <BrowserRouter>
    //   <AppRoutes />
    // </BrowserRouter>
    <RestaurantHomePage />
  );
}

export default App;
