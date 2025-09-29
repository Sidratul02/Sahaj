import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import FarmerApp from './components/FarmerApp';
import BuyerApp from './components/BuyerApp';
import AdminApp from './components/AdminApp';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'farmer' | 'buyer' | 'admin'>('landing');

  const handleNavigate = (view: 'farmer' | 'buyer' | 'admin') => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('landing');
  };

  return (
    <div className="size-full">
      {currentView === 'landing' && <LandingScreen onNavigate={handleNavigate} />}
      {currentView === 'farmer' && <FarmerApp onBack={handleBack} />}
      {currentView === 'buyer' && <BuyerApp onBack={handleBack} />}
      {currentView === 'admin' && <AdminApp onBack={handleBack} />}
    </div>
  );
}