import { useWeb3ConnectionContext } from '../context/web3Connection.context';
import styled from 'styled-components';
import { AVALANCHE_NOT_INSTALLED_ERROR } from '@avalabs/avalanche-connector';

const ConnectButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export function Connect() {
  const { connector, useIsActive, useAccount, useError } =
    useWeb3ConnectionContext();
  const isActive = useIsActive();
  const activeAccount = useAccount();

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
      <ConnectButton onClick={() => connector.activate()}>
        Connect Avalanche
      </ConnectButton>
    );
  }

  return <>connected: {activeAccount}</>;
}
