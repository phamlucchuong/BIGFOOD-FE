import './App.css';
import "react-phone-input-2/lib/style.css";
import AppRoutes from './routes/AppRoutes.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
