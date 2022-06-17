import { useWeb3ConnectionContext } from '../context/web3Connection.context';
import styled from 'styled-components';
import { AVALANCHE_NOT_INSTALLED_ERROR } from '@avalabs/avalanche-connector';
import logo from '../images/icon-192.png';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useMemo } from 'react';

const ConnectButton = styled(Button)`
  border: solid 1px white;
  color: white;
`;

export function Connect() {
  const { connector, useIsActive, useAccount, useError } =
    useWeb3ConnectionContext();
  const isActive = useIsActive();
  const activeAccount = useAccount();

  const account = useMemo(() => {
    const chars = activeAccount?.split('');
    return `${chars?.slice(0, 4).join('')}...${chars
      ?.slice(chars.length - 4)
      .join('')}`;
  }, [activeAccount]);

  const error = useError();

  if (error?.message === AVALANCHE_NOT_INSTALLED_ERROR) {
    return (
      <>
        Avalanche Extension is not present. Go install from app store
        <h1>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb?hl=en&authuser=1"
          >
            Here
          </a>
        </h1>
      </>
    );
  }

  if (!isActive) {
    return (
      <ConnectButton
        onClick={() => connector.activate()}
        sx={{ border: 'solid 1px white', color: 'white' }}
      >
        <img height={20} src={logo} alt="logo" />
        <span style={{ marginLeft: '5px' }}>Connect Avalanche</span>
      </ConnectButton>
    );
  }

  return (
    <Chip
      avatar={
        <Avatar
          alt="Avalanche"
          src="https://logowik.com/content/uploads/images/avalanche-coin-avax8592.jpg"
        />
      }
      label={account}
      variant="outlined"
    />
  );
}
