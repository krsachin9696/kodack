import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SearchBar from '../../components/base/Searchbar';
import { Button } from '@mui/material';
import queryKeys from '../../constants/queryKeys';
import apis from '../../constants/apis';
import CustomList from '../../components/shared/CustomList';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/');
  };

  return (
    <Box sx={{ width: '100%' }} color="white">
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white' }}> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider', color: 'white' }}>
        <HomeIcon onClick={goToDashboard} sx={{ cursor: 'pointer', marginLeft: 1, marginRight: 1 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="List tabs"
            textColor="primary"
          >
            <Tab
              label="My Lists"
              {...a11yProps(0)}
              sx={{
                color: value === 1 ? 'inherit' : 'white',
                fontFamily: 'sans-serif',
                fontWeight: '600',
              }}
            />
            <Tab
              label="Public Lists"
              {...a11yProps(1)}
              sx={{
                color: value === 0 ? 'inherit' : 'white',
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
            {/* <Box width="100%" display="flex" justifyContent="flex-end" gap={2}>
              <Box width="30%">
                <SearchBar />
              </Box>
              {value == 0 && (
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                >
                  Create List
                </Button>
              )}
            </Box> */}
          </Tabs>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CustomList
          isPersonalList
          queryKey={queryKeys.PERSONAL_LISTS}
          apiEndpoint={apis.list.getPersonalLists}
          limit={7}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomList
          queryKey={queryKeys.PUBLIC_LISTS}
          apiEndpoint={apis.list.getPublicLists}
          limit={7}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CustomList
          queryKey={queryKeys.ACCESSED_LISTS}
          apiEndpoint={apis.list.getAccessedLists}
          limit={7}
        />
      </CustomTabPanel>
    </Box>
  );
}
