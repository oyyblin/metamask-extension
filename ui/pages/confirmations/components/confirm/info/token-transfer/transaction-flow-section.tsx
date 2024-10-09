import { TransactionMeta } from '@metamask/transaction-controller';
import React from 'react';
import { ConfirmInfoSection } from '../../../../../../components/app/confirm/info/row/section';
import {
  Box,
  Icon,
  IconName,
  IconSize,
} from '../../../../../../components/component-library';
import {
  AlignItems,
  Display,
  FlexDirection,
  IconColor,
  JustifyContent,
} from '../../../../../../helpers/constants/design-system';
import { useConfirmContext } from '../../../../context/confirm';
import { useDecodedTransactionData } from '../hooks/useDecodedTransactionData';
import { NameOrAddressDisplay } from './name';

export const TransactionFlowSection = () => {
  const { currentConfirmation: transactionMeta } =
    useConfirmContext<TransactionMeta>();

  const { value, pending } = useDecodedTransactionData();

  const recipientAddress =
    value?.data[0].params.find((param) => param.type === 'address')?.value ||
    '0x0000000000000000000000000000000000000000';

  if (pending) {
    // TODO: ConfirmPendingLoader when papercuts PR is merged
    return null;
  }

  return (
    <ConfirmInfoSection data-testid="confirmation__transaction-flow">
      <Box
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
        padding={3}
      >
        <NameOrAddressDisplay address={transactionMeta.txParams.from} />
        <Icon
          name={IconName.ArrowRight}
          size={IconSize.Md}
          color={IconColor.iconMuted}
        />
        <NameOrAddressDisplay address={recipientAddress} />
      </Box>
    </ConfirmInfoSection>
  );
};
