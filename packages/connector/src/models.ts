import { Provider } from '@web3-react/types';

export type AvalancheProvider = Provider & {
  isAvalanche?: boolean;
  isConnected?: () => boolean;
  providers?: AvalancheProvider[];
};
