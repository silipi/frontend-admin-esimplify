import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Provider from '@/models/Provider';

interface ProvidersState {
  providers: Provider[];
  provider?: Provider;
  quickEdit: Provider | null;
}

const initialState = {
  providers: [],
  provider: undefined,
  quickEdit: null,
} as ProvidersState;

export const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setProviders: (state, action: PayloadAction<Provider[]>) => {
      state.providers = action.payload;
    },
    setProviderQuickEdit: (state, action: PayloadAction<Provider | null>) => {
      state.quickEdit = action.payload;
    },
    setProvider: (state, action: PayloadAction<Provider>) => {
      state.provider = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProvider, setProviderQuickEdit, setProviders } =
  providersSlice.actions;

export default providersSlice.reducer;
