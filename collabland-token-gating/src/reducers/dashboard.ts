import { ActionType, createReducer, getType } from 'typesafe-actions';
import { IDashboardState, IMarketCard, ITipsResponse, IWalletConnectionsResponse } from '@/types/DashboardTypes';

import produce from 'immer';
import rootAction from '@/actions';

export type IdashboardActions = ActionType<typeof rootAction.dashboardActions>;
export const defaultHomeState: IDashboardState = {
  walletConnections: {} as IWalletConnectionsResponse,
  tips: {} as ITipsResponse,
  marketCards: [] as IMarketCard[],
  isLoading: false,
  hasError: false,
  showToast: false,
  toastSucceed: false,
  toastMessage: '',
};

const home = createReducer<IDashboardState, IdashboardActions>(defaultHomeState)
  .handleType(getType(rootAction.dashboardActions.fetchWalletConnections.request), (state) =>
    produce(state, (draft) => {
      draft.walletConnections = {} as IWalletConnectionsResponse;
      draft.isLoading = true;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchWalletConnections.success), (state, action) =>
    produce(state, (draft) => {
      draft.walletConnections = action.payload;
      draft.isLoading = false;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchWalletConnections.failure), (state) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.hasError = true;
    })
  )
  .handleType(getType(rootAction.dashboardActions.disconnectWalletConnection.request), (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.disconnectWalletConnection.success), (state) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.disconnectWalletConnection.failure), (state) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.hasError = true;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchTips.request), (state) =>
    produce(state, (draft) => {
      draft.tips = {} as ITipsResponse;
      draft.isLoading = true;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchTips.success), (state, action) =>
    produce(state, (draft) => {
      draft.tips = action.payload;
      draft.isLoading = false;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchTips.failure), (state) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.hasError = true;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchMarketCards.request), (state) =>
    produce(state, (draft) => {
      draft.marketCards = [] as IMarketCard[];
      draft.isLoading = true;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchMarketCards.success), (state, action) =>
    produce(state, (draft) => {
      draft.marketCards = action.payload;
      draft.isLoading = false;
      draft.hasError = false;
    })
  )
  .handleType(getType(rootAction.dashboardActions.fetchMarketCards.failure), (state) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.hasError = true;
    })
  )
  .handleType(getType(rootAction.dashboardActions.toastAction), (state, action) =>
    produce(state, (draft) => {
      draft.showToast = action.payload.showToast;
      draft.toastSucceed = action.payload.toastSucceed;
      draft.toastMessage = action.payload.toastMessage;
    })
  );

export default home;
