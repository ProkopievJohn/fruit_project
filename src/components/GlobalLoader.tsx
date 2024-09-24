import React from 'react';
import { LinearProgress } from '@mui/material';
import { useFruits } from '../context/fruits';

import './GlobalLoader.css';

const GlobalLoader: React.FC = () => {
  const [{ isLoading }] = useFruits();

  return (
    <div className={`global-loader ${isLoading ? 'show-loader' : ''}`}>
      <LinearProgress />
    </div>
  );
};

export default GlobalLoader;