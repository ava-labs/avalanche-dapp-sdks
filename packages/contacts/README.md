# Avalanche Contacts

Through our extension we have exposed contacts. These contacts are accesible through the
provider and are stored securly in the extension. These contacts can be used to show a name
instead of an address in places where this applies.

## How to use

There is a hook inside of this lib. You can access and use it like so:

```typescript
import { useContacts } from '@avalabs/avalanche-contacts';

export function YourFancyComponent() {
  const provider = useYourProvider();
  const { contacts, getContacts } = useContacts(provider);
}
```
