import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNetworksContext } from '../context/networks.context';

export function Networks() {
  const { networks } = useNetworksContext();

  return (
    <List>
      {(networks || []).map((network) => {
        return (
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={network.symbol} src={network.logoUri} />
            </ListItemAvatar>
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
          </ListItem>
        );
      })}
    </List>
  );
}
