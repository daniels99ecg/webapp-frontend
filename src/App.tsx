// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Login from './page/login/login';
import RegisterHomeowner from './page/register/RegisterHomeowner';
import './App.css'
import Home from './page/home/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register/homeowner" element={<RegisterHomeowner />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
