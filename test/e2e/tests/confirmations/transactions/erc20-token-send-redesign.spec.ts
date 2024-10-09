/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
import { TransactionEnvelopeType } from '@metamask/transaction-controller';
import { DAPP_URL } from '../../../constants';
import { unlockWallet, WINDOW_TITLES } from '../../../helpers';
import { Mockttp } from '../../../mock-e2e';
import SetApprovalForAllTransactionConfirmation from '../../../page-objects/pages/set-approval-for-all-transaction-confirmation';
import TestDapp from '../../../page-objects/pages/test-dapp';
import GanacheContractAddressRegistry from '../../../seeder/ganache-contract-address-registry';
import { Driver } from '../../../webdriver/driver';
import { withRedesignConfirmationFixtures } from '../helpers';
import { mocked4BytesSetApprovalForAll } from './erc721-revoke-set-approval-for-all-redesign';
import { TestSuiteArguments } from './shared';

const { SMART_CONTRACTS } = require('../../../seeder/smart-contracts');

describe('Confirmation Redesign ERC20 Token Send @no-mmi', function () {
  it('Sends a type 0 transaction (Legacy)', async function () {
    await withRedesignConfirmationFixtures(
      this.test?.fullTitle(),
      TransactionEnvelopeType.legacy,
      async ({ driver, contractRegistry }: TestSuiteArguments) => {
        await createTransactionAndAssertDetails(driver, contractRegistry);
      },
      mocks,
      SMART_CONTRACTS.HST,
    );
  });

  it('Sends a type 2 transaction (EIP1559)', async function () {
    await withRedesignConfirmationFixtures(
      this.test?.fullTitle(),
      TransactionEnvelopeType.feeMarket,
      async ({ driver, contractRegistry }: TestSuiteArguments) => {
        await createTransactionAndAssertDetails(driver, contractRegistry);
      },
      mocks,
      SMART_CONTRACTS.HST,
    );
  });
});

async function mocks(server: Mockttp) {
  return [await mocked4BytesSetApprovalForAll(server)];
}

async function createTransactionAndAssertDetails(
  driver: Driver,
  contractRegistry?: GanacheContractAddressRegistry,
) {
  await unlockWallet(driver);

  const contractAddress = await (
    contractRegistry as GanacheContractAddressRegistry
  ).getContractAddress(SMART_CONTRACTS.HST);

  const testDapp = new TestDapp(driver);

  await testDapp.open({ contractAddress, url: DAPP_URL });

  await driver.delay(1024 ** 2);
  // 0x581c3C1A2A4EBDE2A0Df29B5cf4c116E42945947
  // 0x8e212420caE9c3D6ba75B247f63998cf1B178B63

  // await testDapp.clickERC1155RevokeSetApprovalForAllButton();

  // await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);

  // const setApprovalForAllConfirmation =
  //   new SetApprovalForAllTransactionConfirmation(driver);

  // await setApprovalForAllConfirmation.check_revokeSetApprovalForAllTitle();

  // await setApprovalForAllConfirmation.clickScrollToBottomButton();
  // await setApprovalForAllConfirmation.clickFooterConfirmButton();
}
