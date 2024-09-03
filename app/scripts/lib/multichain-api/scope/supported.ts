import {
  CaipAccountId,
  Hex,
  isCaipChainId,
  isCaipNamespace,
  KnownCaipNamespace,
  parseCaipAccountId,
  parseCaipChainId,
} from '@metamask/utils';
import { toHex } from '@metamask/controller-utils';
import { InternalAccount } from '@metamask/keyring-api';
import MetaMaskOpenRPCDocument from '@metamask/api-specs';
import { isEqualCaseInsensitive } from '../../../../../shared/modules/string-utils';

export const validRpcMethods = MetaMaskOpenRPCDocument.methods.map(
  ({ name }) => name,
);

// TODO: remove invalid notifications
export const validNotifications = [
  'accountsChanged',
  'chainChanged',
  'eth_subscription',
];

export const isSupportedScopeString = (
  scopeString: string,
  isChainIdSupported: (chainId: Hex) => boolean,
) => {
  const isNamespaceScoped = isCaipNamespace(scopeString);
  const isChainScoped = isCaipChainId(scopeString);

  if (isNamespaceScoped) {
    switch (scopeString) {
      case KnownCaipNamespace.Wallet:
        return true;
      case KnownCaipNamespace.Eip155:
        return true;
      default:
        return false;
    }
  }

  if (isChainScoped) {
    const { namespace, reference } = parseCaipChainId(scopeString);
    switch (namespace) {
      case KnownCaipNamespace.Eip155:
        return isChainIdSupported(toHex(reference));
      default:
        return false;
    }
  }

  return false;
};

export const isSupportedAccount = (
  account: CaipAccountId,
  getInternalAccounts: () => InternalAccount[],
) => {
  const {
    address,
    chain: { namespace },
  } = parseCaipAccountId(account);
  switch (namespace) {
    case KnownCaipNamespace.Eip155:
      try {
        return getInternalAccounts().some(
          (internalAccount) =>
            ['eip155:eoa', 'eip155:erc4337'].includes(internalAccount.type) &&
            isEqualCaseInsensitive(address, internalAccount.address),
        );
      } catch (err) {
        console.log('failed to check if account is supported by wallet', err);
      }
      return false;
    default:
      return false;
  }
};

export const isSupportedMethod = (method: string): boolean =>
  validRpcMethods.includes(method);

// TODO: Needs to go into a capabilties/routing controller
// TODO: These make no sense in a multichain world. accountsChange becomes authorization/permissionChanged?
export const isSupportedNotification = (notification: string): boolean =>
  validNotifications.includes(notification);