import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardMain from './Page/DashboardMain';
import Home from './Page/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Dashboard' element={<DashboardMain />} />
        <Route path='/Upload' element={<DashboardMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;