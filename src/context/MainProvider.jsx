import React, { useContext, createContext, useState } from 'react';

const initialContextValue = {
  name: 'Oliver',
};

const MainContext = createContext(initialContextValue);

function useMainProvider() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Context is not initialized');
  }
  return context;
}

function MainProvider({ children }) {
  const [name] = useState('Oliver');
  return <MainContext.Provider value={{ name }}>{children}</MainContext.Provider>;
}

export default MainProvider;
export { useMainProvider };
