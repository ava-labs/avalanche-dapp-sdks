import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useNetworksContext } from '../context/networks.context';
import { useWeb3ConnectionContext } from '../context/web3Connection.context';

export function Networks() {
  const { networks, selectTestNetwork } = useNetworksContext();
  const { useChainId } = useWeb3ConnectionContext();
  const chainId = useChainId();
  return (
    <List>
      {(networks || []).map((network) => {
        return (
          <ListItem key={network.chainId}>
            <ListItemAvatar>
              <Avatar alt={network.symbol} src={network.logoUri} />
            </ListItemAvatar>
            <Box>
              <ListItemText
                primary={network.chainName}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {network.description}
                  </Typography>
                }
              />
              <Chip label="Testnet" variant="outlined" />
              <Chip
                onClick={() => {
                  network.chainId !== chainId &&
                    selectTestNetwork &&
                    selectTestNetwork(network.chainId);
                }}
                sx={{
                  ...(network.chainId === chainId
                    ? { backgroundColor: 'green' }
                    : {}),
                  ml: '3px',
                  color: 'white',
                }}
                label={network.chainId === chainId ? 'Selected' : 'Select'}
              />
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
}
