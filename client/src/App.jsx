import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WalletComponent from './components/DashboardApp/WalletComponent'
import Home from './Page/Home';
import WalletContextProvider from './Context/WalletContextProvider'
import Dashboard from './Page/Dashboard'


const App = () => {

  return (

    <WalletContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>

  );
};

export default App;
