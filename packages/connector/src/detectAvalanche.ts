export interface AvalancheEthereumProvider {
  isAvalanche?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this;
  removeAllListeners(event?: string | symbol): this;
}

interface Window {
  avalanche?: AvalancheEthereumProvider;
}

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeAvalanche - Whether to only look for MetaMask providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
export function detectAvalancheProvider<T = AvalancheEthereumProvider>({
  mustBeAvalanche = true,
  silent = false,
  timeout = 3000,
} = {}): Promise<T | null> {
  _validateInputs();

  let handled = false;

  return new Promise((resolve) => {
    if ((window as Window).avalanche) {
      handleEthereum();
    } else {
      window.addEventListener("avalanche#initialized", handleEthereum, {
        once: true,
      });

      setTimeout(() => {
        handleEthereum();
      }, timeout);
    }

    function handleEthereum() {
      if (handled) {
        return;
      }
      handled = true;

      window.removeEventListener("avalanche#initialized", handleEthereum);

      const { avalanche } = window as Window;

      if (avalanche && (!mustBeAvalanche || avalanche.isAvalanche)) {
        resolve(avalanche as unknown as T);
      } else {
        const message =
          mustBeAvalanche && avalanche
            ? "Non-Avalanche window.avalanche detected."
            : "Unable to detect window.avalanche.";

        !silent && console.error("@avalanche/detect-provider:", message);
        resolve(null);
      }
    }
  });

  function _validateInputs() {
    if (typeof mustBeAvalanche !== "boolean") {
      throw new Error(
        `@avalanche/detect-provider: Expected option 'mustBeAvalanche' to be a boolean.`
      );
    }
    if (typeof silent !== "boolean") {
      throw new Error(
        `@avalanche/detect-provider: Expected option 'silent' to be a boolean.`
      );
    }
    if (typeof timeout !== "number") {
      throw new Error(
        `@avalanche/detect-provider: Expected option 'timeout' to be a number.`
      );
    }
  }
}
