import Button from '@mui/material/Button';
import { useWeb3ConnectionContext } from '../../context/web3Connection.context';

export function EthSign() {
  const { connector, useAccount } = useWeb3ConnectionContext();
  const activeAccount = useAccount();
  const msg =
    '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0';

  async function signEth() {
    await connector.provider?.request({
      method: 'eth_sign',
      params: [activeAccount, msg],
    });
  }

  return (
    <Button
      variant="outlined"
      sx={{ width: '100%', margin: '5px 0' }}
      onClick={signEth}
    >
      Eth Sign
    </Button>
  );
}
