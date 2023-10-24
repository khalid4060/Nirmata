import React, { createContext, useContext, useState,useEffect } from 'react';

const FilterSearchContext = createContext();

export const useFilterSearch = () => {
  return useContext(FilterSearchContext);
};

export const FilterSearchProvider = ({ children }) => {
  const [filterType, setFilterType] = useState('');
  const [searchName, setSearchName] = useState('');
 

  useEffect(() => {
    const storedFilterType = localStorage.getItem('filterType');
    const storedSearchName = localStorage.getItem('searchName');

    if (storedFilterType) {
      setFilterType(storedFilterType);
    }
    if (storedSearchName) {
      setSearchName(storedSearchName);
    }
   
  }, []);

  useEffect(() => {
    localStorage.setItem('filterType', filterType);
    localStorage.setItem('searchName', searchName);
   
  }, [filterType, searchName]);

  return (
    <FilterSearchContext.Provider value={{ filterType, setFilterType, searchName, setSearchName }}>
      {children}
    </FilterSearchContext.Provider>
  );
};
