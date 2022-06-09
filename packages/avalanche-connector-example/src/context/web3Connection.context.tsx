import { createContext, useContext } from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { Avalanche } from '@avalabs/avalanche-connector';

const Web3ConnectionContext = createContext<
  {
    connector: Avalanche;
  } & Web3ReactHooks
>({} as any);

export function Web3ConnectionContextProvider({ children }: { children: any }) {
  const [connector, hooks] = initializeConnector(
    (actions) => new Avalanche(actions, true)
  );

  return (
    <Web3ConnectionContext.Provider
      value={{
        connector,
        ...hooks,
      }}
    >
      {children}
    </Web3ConnectionContext.Provider>
  );
}

export function useWeb3ConnectionContext() {
  return useContext(Web3ConnectionContext);
}
