import { useState, useCallback } from 'react';
import { CoreWallet } from '@avalabs/web3-react-core-connector';
import { Contact } from '@avalabs/types';

type getContactsResult = { result: Contact[] };

export function useContacts(provider: CoreWallet['provider']) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = useCallback(() => {
    if (!provider) {
      return null;
    }

    return provider
      .request({ method: 'avalanche_getContacts' })
      .then((res: unknown) => setContacts((res as getContactsResult).result));
  }, [provider]);

  return { contacts, getContacts };
}
