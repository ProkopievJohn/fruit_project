import React, { createContext, useState, useContext, ReactElement, Context } from 'react';
import { Fruit } from '../types';

interface JarContextValue {
  jars: Fruit[];
}

interface JarContextActions {
  addJar: (fruit: Fruit[]) => void;
  removeJar: (index: number) => void;
};

const JarContext: Context<[
  JarContextValue,
  JarContextActions
]> = createContext<[
  JarContextValue,
  JarContextActions
]>([
  { jars: [] },
  { addJar: () => {}, removeJar: () => {} },
]);

export const JarProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [jars, setJars] = useState<Fruit[]>([]);

  const addJar = (fruits: Fruit[]) => {
    setJars((prevJars) => [...prevJars, ...fruits]);
  };

  const removeJar = (index: number) => {
    setJars((prevJars) => {
      const updatedJars = [...prevJars];
      updatedJars.splice(index, 1);
      return updatedJars;
    });
  };

  return (
    <JarContext.Provider value={[{ jars }, { addJar, removeJar }]}>
      {children}
    </JarContext.Provider>
  );
};

export const useJar = () => {
  const context = useContext(JarContext);
  if (!context) {
    throw new Error('useJar must be used within a JarProvider');
  }
  return context;
};
