import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3ConnectionContext } from './web3Connection.context';

const NetworksContext = createContext<{
  networks?: any[];
  selectedNetworkId?: number;
  selectTestNetwork?(chainId: number): void;
  selectedChain: any;
}>({} as any);

export function NetworksContextProvider({ children }: { children: any }) {
  const [networks, setNetworks] = useState<any[]>();
  const { connector, useChainId } = useWeb3ConnectionContext();
  const chainId = useChainId();

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

  const selectedChain = useMemo(() => {
    return networks?.find((net) => net.chainId === chainId);
  }, [chainId, networks]);

  return (
    <NetworksContext.Provider
      value={{
        networks,
        selectTestNetwork,
        selectedChain,
      }}
    >
      {children}
    </NetworksContext.Provider>
  );
}

export function useNetworksContext() {
  return useContext(NetworksContext);
}
