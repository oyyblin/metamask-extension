// TODO: Remove restricted import
// eslint-disable-next-line import/no-restricted-paths
import { Hex } from '@metamask/utils';
import { zeroAddress } from 'ethereumjs-util';
import {
  BridgeBackgroundAction,
  BridgeUserAction,
  // TODO: Remove restricted import
  // eslint-disable-next-line import/no-restricted-paths
} from '../../../app/scripts/controllers/bridge/types';

import { forceUpdateMetamaskState } from '../../store/actions';
import { submitRequestToBackground } from '../../store/background-connection';
import { MetaMaskReduxDispatch } from '../../store/store';
import { QuoteRequest } from '../../pages/bridge/types';
import {
  AssetWithDisplayData,
  ERC20Asset,
  NativeAsset,
} from '../../components/multichain/asset-picker-amount/asset-picker-modal/types';
import { Numeric } from '../../../shared/modules/Numeric';
import { bridgeSlice } from './bridge';

const {
  setToChainId: setToChainId_,
<<<<<<< HEAD
  setFromToken,
  setToToken,
  setFromTokenInputValue,
  resetInputFields,
  switchToAndFromTokens,
} = bridgeSlice.actions;

export {
  setFromToken,
  setToToken,
  setFromTokenInputValue,
  switchToAndFromTokens,
  resetInputFields,
=======
  setFromToken: setFromToken_,
  setToToken: setToToken_,
  setFromTokenInputValue: setFromTokenInputValue_,
  resetInputFields: resetInputFields_,
  switchToAndFromTokens,
} = bridgeSlice.actions;

export { switchToAndFromTokens };

const updateQuoteRequestParams = <T extends Partial<QuoteRequest>>(
  params: T,
) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    await submitRequestToBackground(BridgeUserAction.UPDATE_QUOTE_PARAMS, [
      params,
    ]);
    await forceUpdateMetamaskState(dispatch);
  };
>>>>>>> 16b712381d (feat: update bridge quote params on input change and display quotes)
};

const callBridgeControllerMethod = <T extends string>(
  bridgeAction: BridgeUserAction | BridgeBackgroundAction,
  args?: T[],
) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    await submitRequestToBackground(bridgeAction, args);
    await forceUpdateMetamaskState(dispatch);
  };
};

// Background actions
export const setBridgeFeatureFlags = () => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    return dispatch(
      callBridgeControllerMethod(BridgeBackgroundAction.SET_FEATURE_FLAGS),
    );
  };
};

export const resetBridgeState = () => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    dispatch(
      callBridgeControllerMethod(BridgeBackgroundAction.RESET_STATE, []),
    );
  };
};

// User actions
export const setFromToken = (
  payload: AssetWithDisplayData<ERC20Asset> | AssetWithDisplayData<NativeAsset>,
) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    dispatch(setFromToken_(payload));
    dispatch(
      updateQuoteRequestParams<Pick<QuoteRequest, 'srcTokenAddress'>>({
        srcTokenAddress: payload.address ?? zeroAddress(),
      }),
    );
  };
};

export const setToToken = (
  payload: AssetWithDisplayData<ERC20Asset> | AssetWithDisplayData<NativeAsset>,
) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    dispatch(setToToken_(payload));
    dispatch(
      updateQuoteRequestParams<Pick<QuoteRequest, 'destTokenAddress'>>({
        destTokenAddress: payload.address ?? '',
      }),
    );
  };
};

export const setFromTokenInputValue = (payload: {
  amount: QuoteRequest['srcTokenAmount'];
  decimals: number;
}) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    dispatch(setFromTokenInputValue_(payload.amount));
    dispatch(
      updateQuoteRequestParams<Pick<QuoteRequest, 'srcTokenAmount'>>({
        srcTokenAmount:
          payload.amount === ''
            ? payload.amount
            : Numeric.from(payload.amount, 10)
                .shiftedBy(-1 * payload.decimals)
                .toString(),
      }),
    );
  };
};

export const setFromChain = (chainId: Hex) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    dispatch(
      callBridgeControllerMethod<Hex>(BridgeUserAction.SELECT_SRC_NETWORK, [
        chainId,
      ]),
    );
  };
};

export const setToChain = (chainId: Hex) => {
  return async (dispatch: MetaMaskReduxDispatch) => {
    dispatch(setToChainId_(chainId));
    dispatch(
      callBridgeControllerMethod<Hex>(BridgeUserAction.SELECT_DEST_NETWORK, [
        chainId,
      ]),
    );
  };
};
