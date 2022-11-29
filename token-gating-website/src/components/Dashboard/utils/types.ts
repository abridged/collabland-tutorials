export interface Wallet {
  accountId?: string; //"evm:mainnet:0x123456abcde..";
  platform: string;
  userId: string;
  communityId: string;
  sk: string; //"WALLET#DIS#COMM#9999..#ADDRESS";
  createdTime: string;
  address: string;
  id: string;
  pk: string;
  classifier: string;
}

export interface SelectedWallet {
  sk: string;
  platform: string;
  addr: string;
}
