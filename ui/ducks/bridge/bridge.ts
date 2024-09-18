import { createSlice } from '@reduxjs/toolkit';

import { Hex } from '@metamask/utils';
import { swapsSlice } from '../swaps/swaps';
import { SwapsTokenObject } from '../../../shared/constants/swaps';
import { SwapsEthToken } from '../../selectors';

export type BridgeState = {
  toChainId: Hex | null;
  fromToken: SwapsTokenObject | SwapsEthToken | null;
  toToken: SwapsTokenObject | SwapsEthToken | null;
  fromTokenInputValue: string | null;
};

const initialState: BridgeState = {
  toChainId: null,
  fromToken: null,
  toToken: null,
  fromTokenInputValue: null,
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState: { ...initialState },
  reducers: {
    ...swapsSlice.reducer,
    setToChainId: (state, action) => {
      state.toChainId = action.payload;
      state.toToken = null;
    },
    setFromToken: (state, action) => {
      state.fromToken = action.payload;
      state.fromTokenInputValue = null;
    },
    setToToken: (state, action) => {
      state.toToken = action.payload;
    },
    setFromTokenInputValue: (state, action) => {
      state.fromTokenInputValue = action.payload;
    },
    resetInputFields: () => ({
      ...initialState,
    }),
    switchToAndFromInputs: (state, { payload }) => ({
      toChainId: payload,
      fromToken: state.toToken,
      toToken: state.fromToken,
      fromTokenInputValue: null,
    }),
  },
});

export { bridgeSlice };
export default bridgeSlice.reducer;
