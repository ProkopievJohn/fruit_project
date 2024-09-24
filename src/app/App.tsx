import React from 'react';
import { Container, Grid2, Typography, Card, CardContent } from '@mui/material';
import Jar from '../components/Jar';
import FruitContainer from '../components/FruitContainer';
import GlobalLoader from '../components/GlobalLoader';
import SnackbarError from '../components/SnackbarError';

import './App.css';

const App: React.FC = () => {
  return (
    <>
      <GlobalLoader />
      <Container maxWidth={false} className="App">
        <Typography variant="h4" gutterBottom align="center">
          Fruit List
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <FruitContainer />
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Jar />
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
      <SnackbarError />
    </>
  );
};

export default App;
