import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PersonalList from './components/PersonalList';
import SearchBar from '../../components/base/Searchbar';
import { Button } from '@mui/material';
import PublicList from './components/PublicList';
import AccessList from './components/AccessedList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, color: 'white' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ListPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} color="white">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="List tabs"
          textColor="primary"
        >
          <Tab
            label="Public Lists"
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? 'inherit' : 'white',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          />
          <Tab
            label="Personal Lists"
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? 'inherit' : 'white',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          />
          <Tab
            label="Accessed Lists"
            {...a11yProps(2)}
            sx={{
              color: value === 2 ? 'inherit' : 'white',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          />
          <Box width="100%" display="flex" justifyContent="flex-end" gap={2}>
            <Box width="30%">
              <SearchBar />
            </Box>
            {value == 1 && (
              <Button
                variant="contained"
                size="small"
                color="primary"
                type="submit"
              >
                Create List
              </Button>
            )}
          </Box>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PublicList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PersonalList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AccessList />
      </CustomTabPanel>
    </Box>
  );
}
