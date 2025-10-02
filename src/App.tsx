import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RouteSearch from './pages/RouteSearch';
import Navigation from './pages/Navigation';
import Payment from './pages/Payment';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routes" element={<RouteSearch />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
