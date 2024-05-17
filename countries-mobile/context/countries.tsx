import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Country } from '../types';

export interface CountriesContextProps {
  selected: Country[];
  setSelected: (selected: Country[]) => void;
}

export const CountriesContext = createContext<CountriesContextProps | null>(null);

export const CountriesProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Country[]>([]);

  return (
    <CountriesContext.Provider value={{ selected, setSelected }}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useSelected = (): CountriesContextProps => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useSelectedCountries must be used within a SelectedCountriesProvider');
  }
  return context;
};
