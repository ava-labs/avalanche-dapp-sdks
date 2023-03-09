import { createContext, useContext, useState } from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { CoreWallet } from '@avalabs/web3-react-core-connector';

const Web3ConnectionContext = createContext<
  {
    connector: CoreWallet;
    error?: Error;
  } & Web3ReactHooks
>({} as any);

export function Web3ConnectionContextProvider({ children }: { children: any }) {
  const [error, setError] = useState<Error | undefined>();
  const [connector, hooks] = initializeConnector(
    (actions) =>
      new CoreWallet({
        actions,
        onError: (e: Error) => {
          console.error('Core Connector error', e);
          setError(e);
        },
      })
  );

  return (
    <Web3ConnectionContext.Provider
      value={{
        connector,
        error,
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
