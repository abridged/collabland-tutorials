import {
  IDisconnectWalletConnectionRequest,
  IMarketCard,
  ITipsResponse,
  IWalletConnectionsResponse,
} from '@/types/DashboardTypes';
import axios, { AxiosResponse } from 'axios';

import urlHelper from '@/utils/urlHelper';

export function fetchWalletConnections(id: string): Promise<AxiosResponse<IWalletConnectionsResponse>> {
  return axios.get<IWalletConnectionsResponse>(urlHelper.t(`wallet-manager/wallet-connections`, true), {
    headers: { Authorization: `AE ${id}` },
  });
}
export function disconnectWalletConnection(payload: IDisconnectWalletConnectionRequest): Promise<AxiosResponse<void>> {
  return axios.delete<void>(urlHelper.t(`wallet-manager/wallet-connections/${encodeURIComponent(payload.sk)}`), {
    headers: { Authorization: `AE ${payload.id}` },
  });
}
export function fetchTips(id: string): Promise<AxiosResponse<ITipsResponse>> {
  return axios.get<ITipsResponse>(urlHelper.t(`tips`, true), {
    headers: { Authorization: `AE ${id}` },
  });
}
export function fetchMarketCards(id: string): Promise<AxiosResponse<IMarketCard[]>> {
  return axios.get<IMarketCard[]>(urlHelper.t(`marketcards`, true), {
    headers: { Authorization: `AE ${id}` },
  });
}
