// SidebarContext.js
import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarActive, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
