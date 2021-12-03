import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Acessar from './Acessar';
import CriarVinho from './CriarVinho';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='acessar' element={<Acessar />}></Route>
        <Route path='criar-vinho' element={<CriarVinho />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
