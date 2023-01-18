
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Blog/Home'
import Detail from './Blog/Detail'

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
