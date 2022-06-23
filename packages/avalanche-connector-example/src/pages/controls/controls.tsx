import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useNetworksContext } from '../../context/networks.context';
import { EthSign } from './ethSign';
import { SignMessage } from './signMessage';

export function Controls() {
  const { selectedChain } = useNetworksContext();
  return (
    <Box sx={{ width: '600px', padding: '30px', backgroundColor: '#f6f6f666' }}>
      <Chip
        avatar={
          <Avatar alt={selectedChain.symbol} src={selectedChain.logoUri} />
        }
        label={selectedChain.chainName}
        variant="outlined"
      />
      <Box sx={{ marginTop: '10px' }}>
        <EthSign />
        <SignMessage />
      </Box>
    </Box>
  );
}
