import { createContext, useContext } from 'react';

const initialState = {};

export const LanguageContext = createContext(initialState);

export const useLng = () => {
  return useContext(LanguageContext);
};
