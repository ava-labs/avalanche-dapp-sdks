import { useState, useCallback } from 'react';
import type { AvalancheProvider } from '@avalabs/avalanche-connector';
import type { Contact } from '@avalabs/types';

type getContactsResult = { result: Contact[] };

export function useContacts(provider: AvalancheProvider) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = useCallback(
    () =>
      provider
        .request({ method: 'avalanche_getContacts' })
        .then((res) => setContacts((res as getContactsResult).result)),
    [provider]
  );

  return { contacts, getContacts };
}
