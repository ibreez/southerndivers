import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const setFilterAndScroll = (filterName) => {
    setActiveFilter(filterName.toLowerCase());
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FilterContext.Provider value={{ activeFilter, setActiveFilter, setFilterAndScroll }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);