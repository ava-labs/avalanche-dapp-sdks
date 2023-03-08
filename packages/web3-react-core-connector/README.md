# Avalanche Connector

This is a connector for the upcoming release of `@web3-react/core`. This serves as an example of how to connect for versions older than `8.0.17-beta.0`. If you need help connecting to older versions feel free to reach out at `coreintegrations@avalabs.org`

## Getting started

There is a working example in this repo under the package `avalanche connector example`

```typescript
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
```

```html
<Web3ConnectionContextProvider>
  <App />
</Web3ConnectionContextProvider>
```

```typescript
import { useWeb3ConnectionContext } from 'your-path-here';

export function YourFancyComponent() {
  const { provider, hooks } = useWeb3ConnectionContext();
}
```
