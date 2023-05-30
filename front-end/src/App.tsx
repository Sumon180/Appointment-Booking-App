import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentsPage from './pages/AppointmentsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
