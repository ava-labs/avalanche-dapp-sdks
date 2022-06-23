import Button from '@mui/material/Button';
import { useWeb3ConnectionContext } from '../../context/web3Connection.context';

export function SignMessage() {
  const { connector, useAccount } = useWeb3ConnectionContext();
  const activeAccount = useAccount();

  const exampleMessage = 'Example personal_sign message';
  const msg = `0x${require('buffer')
    .Buffer.from(exampleMessage, 'utf8')
    .toString('hex')}`;

  async function signMessage() {
    const signResult = await connector.provider?.request({
      method: 'personal_sign',
      params: [msg, activeAccount, 'Example password'],
    });
  }

  return (
    <Button
      variant="outlined"
      sx={{ width: '100%', margin: '5px 0' }}
      onClick={signMessage}
    >
      Sign Message
    </Button>
  );
}
