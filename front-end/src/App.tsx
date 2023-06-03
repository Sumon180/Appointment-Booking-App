import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SelectDoctor from './pages/SelectDoctor';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<SelectDoctor />} />
        <Route path="/appointments/:id" element={<SelectDoctor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
