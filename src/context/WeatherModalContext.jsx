import React, { createContext, useContext, useState } from 'react';

const WeatherModalContext = createContext();

export const WeatherModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WeatherModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </WeatherModalContext.Provider>
  );
};

export const useWeatherModal = () => {
  const context = useContext(WeatherModalContext);
  if (!context) {
    throw new Error('useWeatherModal must be used within a WeatherModalProvider');
  }
  return context;
};