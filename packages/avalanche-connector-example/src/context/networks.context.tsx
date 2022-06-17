import { createContext, useContext, useEffect, useState } from 'react';

const NetworksContext = createContext<{
  networks?: any[];
}>({} as any);

export function NetworksContextProvider({ children }: { children: any }) {
  const [networks, setNetworks] = useState<any[]>();

  useEffect(() => {
    fetch('https://glacier-api.avax.network/tokenlist')
      .then((res) => res.json())
      .then((res: Record<string, any>) =>
        setNetworks(Object.values(res).filter((res) => res.isTestnet))
      );
  }, []);

  return (
    <NetworksContext.Provider
      value={{
        networks,
      }}
    >
      {children}
    </NetworksContext.Provider>
  );
}

export function useNetworksContext() {
  return useContext(NetworksContext);
}
