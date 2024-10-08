import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { InternalAccount, isEvmAccountType } from '@metamask/keyring-api';
import { NetworkConfiguration } from '@metamask/network-controller';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  getInternalAccounts,
  getNetworkConfigurationsByChainId,
  getSelectedInternalAccount,
  getUpdatedAndSortedAccounts,
} from '../../../selectors';
import {
  Box,
  Button,
  ButtonSize,
  ButtonVariant,
  Text,
} from '../../../components/component-library';
import {
  Content,
  Footer,
  Header,
  Page,
} from '../../../components/multichain/pages/page';
import { SiteCell } from '../../../components/multichain/pages/review-permissions-page';
import {
  BackgroundColor,
  BlockSize,
  Display,
  FlexDirection,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { MergedInternalAccount } from '../../../selectors/selectors.types';
import { mergeAccounts } from '../../../components/multichain/account-list-menu/account-list-menu';
import { TEST_CHAINS } from '../../../../shared/constants/network';
import PermissionsConnectFooter from '../../../components/app/permissions-connect-footer';

export type ConnectPageRequest = {
  id: string;
  origin: string;
};

type ConnectPageProps = {
  request: ConnectPageRequest;
  permissionsRequestId: string;
  rejectPermissionsRequest: (id: string) => void;
  approveConnection: (request: ConnectPageRequest) => void;
  activeTabOrigin: string;
};

export const ConnectPage: React.FC<ConnectPageProps> = ({
  request,
  permissionsRequestId,
  rejectPermissionsRequest,
  approveConnection,
  activeTabOrigin,
}) => {
  const t = useI18nContext();

  const networkConfigurations = useSelector(getNetworkConfigurationsByChainId);
  const [nonTestNetworks, testNetworks] = useMemo(
    () =>
      Object.entries(networkConfigurations).reduce(
        ([nonTestNetworksList, testNetworksList], [chainId, network]) => {
          const isTest = (TEST_CHAINS as string[]).includes(chainId);
          (isTest ? testNetworksList : nonTestNetworksList).push(network);
          return [nonTestNetworksList, testNetworksList];
        },
        [[] as NetworkConfiguration[], [] as NetworkConfiguration[]],
      ),
    [networkConfigurations],
  );
  const defaultSelectedChainIds = nonTestNetworks.map(({ chainId }) => chainId);
  const [selectedChainIds, setSelectedChainIds] = useState(
    defaultSelectedChainIds,
  );

  const accounts = useSelector(getUpdatedAndSortedAccounts);
  const internalAccounts = useSelector(getInternalAccounts);
  const mergedAccounts: MergedInternalAccount[] = useMemo(() => {
    return mergeAccounts(accounts, internalAccounts).filter(
      (account: InternalAccount) => isEvmAccountType(account.type),
    );
  }, [accounts, internalAccounts]);

  const currentAccount = useSelector(getSelectedInternalAccount);
  const defaultAccountsAddresses = [currentAccount?.address];
  const [selectedAccountAddresses, setSelectedAccountAddresses] = useState(
    defaultAccountsAddresses,
  );

  const onConfirm = () => {
    const _request = {
      ...request,
      approvedAccounts: selectedAccountAddresses,
      approvedChainIds: selectedChainIds,
    };
    approveConnection(_request);
  };

  return (
    <Page
      data-testid="connect-page"
      className="main-container connect-page"
      backgroundColor={BackgroundColor.backgroundAlternative}
    >
      <Header paddingBottom={0}>
        <Text variant={TextVariant.headingLg}>{t('connectWithMetaMask')}</Text>
        <Text>{t('connectionDescription')}: </Text>
      </Header>
      <Content paddingLeft={4} paddingRight={4}>
        <SiteCell
          nonTestNetworks={nonTestNetworks}
          testNetworks={testNetworks}
          accounts={mergedAccounts}
          onSelectAccountAddresses={setSelectedAccountAddresses}
          onSelectChainIds={setSelectedChainIds}
          selectedAccountAddresses={selectedAccountAddresses}
          selectedChainIds={selectedChainIds}
          isConnectFlow
        />
      </Content>
      <Footer>
        <Box
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          gap={4}
          width={BlockSize.Full}
        >
          <PermissionsConnectFooter />
          <Box display={Display.Flex} gap={4} width={BlockSize.Full}>
            <Button
              block
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Lg}
              data-testid="cancel-btn"
              onClick={() => rejectPermissionsRequest(permissionsRequestId)}
            >
              {t('cancel')}
            </Button>
            <Button
              block
              data-testid="confirm-btn"
              size={ButtonSize.Lg}
              onClick={onConfirm}
              disabled={
                selectedAccountAddresses.length === 0 ||
                selectedChainIds.length === 0
              }
            >
              {t('connect')}
            </Button>
          </Box>
        </Box>
      </Footer>
    </Page>
  );
};
