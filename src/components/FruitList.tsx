import { Fragment, useMemo, useState } from 'react';
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useFruits } from '../context/fruits';
import { Fruit, GroupBy } from '../types';
import { useJar } from '../context/jar';

import './FruitList.css';

const FruitList: React.FC = () => {
  const [{ groupBy, fruits }] = useFruits();
  const [, { addJar }] = useJar();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (groupKey: string) => {
    setExpanded(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const handleAddJar = (e: React.MouseEvent, fruit: Fruit[]) => {
    e.stopPropagation();
    addJar(fruit);
  };

  const preparedFruits = useMemo(() => fruits.reduce((acc: { [K in GroupBy | string]: Fruit[] }, fruit) => {
    const groupKey: string = fruit[groupBy.toLowerCase() as keyof Fruit] as string;

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(fruit);

    return acc;
  }, {}), [fruits, groupBy]);

  return (
    <div className="fruits-list-container">
      {groupBy === 'none' ? (
        <List component="div" className="fruits-list">
        {fruits.map(fruit => (
          <ListItem
            key={fruit.id}
            sx={{ pl: 4 }}
            secondaryAction={
              <IconButton onClick={(e) => handleAddJar(e, [fruit])}>
                <AddIcon />
              </IconButton>
            }
          >
            {fruit.name} - {fruit.nutritions.calories} cal
          </ListItem>
        ))}
      </List>
      ) : (
        <List component="div" className="fruits-list">
          {Object.entries(preparedFruits).map(([groupKey, groupFruits]) => {
            return (
              <Fragment key={groupKey}>
                <ListItemButton onClick={() => toggleExpand(groupKey)}>
                  <ListItemText primary={groupKey} />
                  <IconButton onClick={(e) => handleAddJar(e, groupFruits)}>
                    <LibraryAddIcon />
                  </IconButton>
                  {expanded[groupKey] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={expanded[groupKey]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {groupFruits.map(fruit => (
                      <ListItem
                        key={fruit.id}
                        sx={{ pl: 4 }}
                        secondaryAction={
                          <IconButton onClick={(e) => handleAddJar(e, [fruit])}>
                            <AddIcon />
                          </IconButton>
                        }
                      >
                        {fruit.name} - {fruit.nutritions.calories} cal
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default FruitList;
