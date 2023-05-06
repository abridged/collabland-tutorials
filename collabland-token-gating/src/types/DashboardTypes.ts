export interface IDashboardState {
  walletConnections: IWalletConnectionsResponse;
  tips: ITipsResponse;
  marketCards: IMarketCard[];
  isLoading: boolean;
  hasError: boolean;
  showToast: boolean;
  toastSucceed: boolean;
  toastMessage: string;
}

export interface IWalletConnectionsRequest {
  token: string;
}
export interface IWalletConnectionsResponse {
  items: IWalletConnection[];
}
export interface IWalletConnection {
  flowAccountId: string;
  accountId: string;
  address: string;
  classifier: string;
  classifierGroup: string;
  communityId: string;
  communityPk: string;
  createdTime: string;
  id: string;
  pk: string;
  platform: string;
  timestamp: number;
  signerAddress: string;
  sk: string;
  source: string;
  userId: string;
  walletType: string;
}
export interface ITipsRequest extends IWalletConnectionsRequest {}
export interface ITipsResponse {
  items: ITip[];
}
export interface ITip extends IWalletConnection {
  type: string;
  username: string;
}
export interface IDisconnectWalletConnectionRequest {
  id: string;
  sk: string;
}
export interface IMarketCardsRequest extends IWalletConnectionsRequest {}
export interface IMarketCard {
  name: string;
  createDateText: string;
  freeInfo: string;
  appType: string;
  desc: string;
  status: string;
}
export interface IMarketImageMap {
  [key: string]: React.ReactNode;
}
