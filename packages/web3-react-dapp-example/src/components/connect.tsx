import { useWeb3ConnectionContext } from '../context/web3Connection.context';
import styled from 'styled-components';
import { NoCoreWalletError } from '@avalabs/web3-react-core-connector';
import logo from '../images/core.svg';
import { useState } from 'react';
import { CoreNotFoundError } from './coreNotFoundError';

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 72px;
  background-color: #3a3a3c;
  border-radius: 8px;
  border: none;
  transition: background-color 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: #ffffff;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #323232;
  }
`;

const Text = styled.span`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
`;

export function Connect() {
  const { connector, useIsActive, useAccount } = useWeb3ConnectionContext();
  const isActive = useIsActive();
  const activeAccount = useAccount();
  const [activationError, setActivationError] = useState<Error>();

  if (activationError instanceof NoCoreWalletError) {
    return <CoreNotFoundError />;
  }

  if (!isActive) {
    return (
      <ConnectButton
        onClick={() => connector.activate().catch((e) => setActivationError(e))}
      >
        <Text>Connect with Core</Text>
        <img height={48} src={logo} alt="logo" />
      </ConnectButton>
    );
  }

  return (
    <div>
      <strong>Connected:</strong>
      <br />
      {activeAccount}
    </div>
  );
}
