import {
  IDisconnectWalletConnectionRequest,
  IMarketCard,
  IMarketCardsRequest,
  ITipsRequest,
  ITipsResponse,
  IWalletConnectionsRequest,
  IWalletConnectionsResponse,
} from '@/types/DashboardTypes';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { AxiosError } from 'axios';
import { IToast } from '@/types/GlobalTypes';

export const dashboardActions = {
  fetchWalletConnections: createAsyncAction(
    'FETCH_WALLET_CONNECTIONS_REQUEST',
    'FETCH_WALLET_CONNECTIONS_SUCCESS',
    'FETCH_WALLET_CONNECTIONS_FAILURE'
  )<IWalletConnectionsRequest, IWalletConnectionsResponse, AxiosError>(),
  disconnectWalletConnection: createAsyncAction(
    'DISCONNECT_WALLET_CONNECTION_REQUEST',
    'DISCONNECT_WALLET_CONNECTION_SUCCESS',
    'DISCONNECT_WALLET_CONNECTION_FAILURE'
  )<IDisconnectWalletConnectionRequest, void, AxiosError>(),
  fetchTips: createAsyncAction('FETCH_TIPS_REQUEST', 'FETCH_TIPS_SUCCESS', 'FETCH_TIPS_FAILURE')<
    ITipsRequest,
    ITipsResponse,
    AxiosError
  >(),
  fetchMarketCards: createAsyncAction(
    'FETCH_MARKET_CARDS_REQUEST',
    'FETCH_MARKET_CARDS_SUCCESS',
    'FETCH_MARKET_CARDS_FAILURE'
  )<IMarketCardsRequest, IMarketCard[], AxiosError>(),
  toastAction: createAction('SHOW_TOAST')<IToast>(),
  triggerToast: createAction('TRIGGER_DASHBOARD_TOAST')<{ isSuccess: boolean; message: string }>(),
};
