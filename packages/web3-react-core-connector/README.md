# Core extension web3-react Connector

Core Extension connector for [web3-react](https://github.com/Uniswap/web3-react).

## Getting started

There is a working example in this repo under the package `web3-react-dapp-example`

```typescript
import { createContext, useContext } from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { CoreWallet } from '@avalabs/web3-react-core-connector';

const Web3ConnectionContext = createContext<
  {
    connector: CoreWallet;
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
```

```html
<Web3ConnectionContextProvider>
  <App />
</Web3ConnectionContextProvider>
```

```typescript
import { useWeb3ConnectionContext } from 'your-path-here';

export function YourFancyComponent() {
  const { connector, useIsActive, useAccount } = useWeb3ConnectionContext();
  const isActive = useIsActive();
  const activeAccount = useAccount();

  if (!isActive) {
    return (
      <button
        onClick={() => connector.activate().catch((e) => console.error(e))}
      >
        Connect with Core
      </button>
    );
  }

  return (
    <div>
      <strong>Connected:</strong> {activeAccount}
    </div>
  );
}
```
