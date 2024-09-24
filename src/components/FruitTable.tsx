import { Fragment, useMemo, useState } from 'react';
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Fruit, GroupBy } from '../types';
import { useFruits } from '../context/fruits';
import { useJar } from '../context/jar';

function Row({ groupKey, groupFruits, handleAddJar }: { groupKey: string, groupFruits: Fruit[], handleAddJar: (e: React.MouseEvent, fruits: Fruit[]) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow hover onClick={() => setOpen(!open)}>
        <TableCell style={{ width: 20 }}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </TableCell>
        <TableCell colSpan={5}>
          {groupKey}
        </TableCell>
        <TableCell style={{ width: 20 }} align="right">
          <IconButton onClick={(e) => handleAddJar(e, groupFruits)}>
            <LibraryAddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} />
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases" style={{ marginBottom: -1 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Family</TableCell>
                  <TableCell align="right">Order</TableCell>
                  <TableCell align="right">Genus</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {groupFruits.map((fruit) => (
                  <TableRow
                    key={fruit.name}
                  >
                    <TableCell component="th" scope="row">
                      {fruit.name}
                    </TableCell>
                    <TableCell align="right">{fruit.name}</TableCell>
                    <TableCell align="right">{fruit.family}</TableCell>
                    <TableCell align="right">{fruit.order}</TableCell>
                    <TableCell align="right">{fruit.genus}</TableCell>
                    <TableCell align="right">{fruit.nutritions.calories}</TableCell>
                    <TableCell align="right"><IconButton onClick={(e) => handleAddJar(e, [fruit])}><AddIcon /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const FruitTable: React.FC = () => {
  const [{ fruits, groupBy }] = useFruits();
  const [, { addJar }] = useJar();

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
    <div style={{ height: 895, width: '100%', overflow: 'auto' }}>
      <TableContainer component={Paper}>
        {groupBy === 'none' ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Family</TableCell>
                <TableCell align="right">Order</TableCell>
                <TableCell align="right">Genus</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {fruits.map((fruit) => (
                <TableRow
                  key={fruit.name}
                >
                  <TableCell scope="row">
                    {fruit.name}
                  </TableCell>
                  <TableCell align="right">{fruit.name}</TableCell>
                  <TableCell align="right">{fruit.family}</TableCell>
                  <TableCell align="right">{fruit.order}</TableCell>
                  <TableCell align="right">{fruit.genus}</TableCell>
                  <TableCell align="right">{fruit.nutritions.calories}</TableCell>
                  <TableCell align="right"><IconButton onClick={() => addJar([fruit])}><AddIcon /></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(preparedFruits).map(([groupKey, groupFruits]) => (
                <Row key={groupKey} groupKey={groupKey} groupFruits={groupFruits} handleAddJar={handleAddJar} />
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default FruitTable;
