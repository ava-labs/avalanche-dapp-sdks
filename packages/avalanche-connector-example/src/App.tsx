import './App.css';
import { Connect } from './pages/connect';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import logo from './images/icon-192.png';
import { Networks } from './pages/networks';
import { useNetworksContext } from './context/networks.context';
import { Controls } from './pages/controls/controls';

const Logo = styled('img')`
  height: 30px;
  width: 30px;
  margin-right: 8px;
`;

function App() {
  const { selectedChain } = useNetworksContext();
  return (
    <div className="App">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo src={logo} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Core Example
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Connect />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Networks />
        {!!selectedChain ? <Controls /> : undefined}
      </Box>
    </div>
  );
}

export default App;
