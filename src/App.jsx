import './App.css';
import "react-phone-input-2/lib/style.css";
import ScreenRouter from './router/ScreenRouter.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home.jsx'; 
import Pickfood from './pages/pickfood/pickfood.jsx';

function App() {
  
  // return <ScreenRouter />;
  return (
    <Router>
      <nav>
        <Link to="/">Trang chủ</Link>
        <Link to="/Pickfood">Pickfood</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pickfood" element={<Pickfood />} /> 
      </Routes>
    </Router>
  );
}

export default App;
