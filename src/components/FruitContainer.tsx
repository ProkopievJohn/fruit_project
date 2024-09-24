import React, { SyntheticEvent, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Tab, SelectChangeEvent } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { GroupBy, TabValue } from '../types';
import FruitList from './FruitList';
import { useFruits } from '../context/fruits';
import FruitTable from './FruitTable';

const FruitContainer: React.FC = () => {
  const [{ groupBy }, { groupByChange }] = useFruits();
  const [activeTab, setActiveTab] = useState<TabValue>('1');

  const handleGroupByChange = (event: SelectChangeEvent) => {
    groupByChange(event.target.value as GroupBy);
  };

  const handleTabChange = (_event: SyntheticEvent, tabValue: TabValue) => {
    setActiveTab(tabValue);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="fruit_list_group_by">Group by</InputLabel>
        <Select
          value={groupBy}
          label="Group by"
          labelId="fruit_list_group_by"
          onChange={handleGroupByChange}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="family">Family</MenuItem>
          <MenuItem value="order">Order</MenuItem>
          <MenuItem value="genus">Genus</MenuItem>
        </Select>
      </FormControl>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} variant="fullWidth">
            <Tab label="List View" value="1" />
            <Tab label="Table View" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><FruitList /></TabPanel>
        <TabPanel value="2"><FruitTable /></TabPanel>
      </TabContext>
    </>
  );
};

export default FruitContainer;
