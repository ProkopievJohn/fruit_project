import React, { useMemo } from 'react';
import { Card, CardContent, Typography, ListItem, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import PieChart from './PieChart';
import { useJar } from '../context/jar';
import { Fruit } from '../types';

function renderRow({ index, style, data }: ListChildComponentProps<{ jars: Fruit[], removeJar: (index: number) => void }>) {
  const { removeJar, jars } = data;
  const fruit = jars[index];

  return (
    <ListItem
      key={index}
      style={style}
      secondaryAction={
        <IconButton onClick={() => removeJar(index)}>
          <ClearIcon />
        </IconButton>
      }
    >
      {fruit.name} - {fruit.nutritions.calories} cal
    </ListItem>
  );
}

const Jar: React.FC = () => {
  const [{ jars }, { removeJar }] = useJar();
  const totalCalories = useMemo(() => jars.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0), [jars]);

  return (
    <CardContent>
      <Typography variant="h6">Fruit Jar</Typography>
      <Card>
        <CardContent>
          <FixedSizeList
            height={500}
            width="100%"
            itemSize={46}
            itemCount={jars.length}
            overscanCount={5}
            itemData={{ jars, removeJar }}
          >
            {renderRow}
          </FixedSizeList>
        </CardContent>
      </Card>
      <Typography style={{ marginTop: 10 }}>Total Calories: {totalCalories}</Typography>
      <PieChart selectedFruits={jars} />
    </CardContent>
  );

};

export default Jar;
