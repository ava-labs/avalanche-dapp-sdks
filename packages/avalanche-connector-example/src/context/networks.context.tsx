import { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3ConnectionContext } from './web3Connection.context';

const NetworksContext = createContext<{
  networks?: any[];
  selectedNetworkId?: number;
  selectTestNetwork?(chainId: number): void;
}>({} as any);

export function NetworksContextProvider({ children }: { children: any }) {
  const [networks, setNetworks] = useState<any[]>();
  const { connector } = useWeb3ConnectionContext();

  useEffect(() => {
    fetch('https://glacier-api.avax.network/tokenlist')
      .then((res) => res.json())
      .then((res: Record<string, any>) =>
        setNetworks(Object.values(res).filter((res) => res.isTestnet))
      );
  }, []);

  async function selectTestNetwork(chainId: number) {
    return connector.provider?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  }

  return (
    <NetworksContext.Provider
      value={{
        networks,
        selectTestNetwork,
      }}
    >
      {children}
    </NetworksContext.Provider>
  );
}

export function useNetworksContext() {
  return useContext(NetworksContext);
}
