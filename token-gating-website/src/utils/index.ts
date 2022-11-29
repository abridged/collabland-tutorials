import { formatEIP712Data } from './eip712';

export const getSignatureMsg = (message, chainId) => {
  const getMessageToSign = formatEIP712Data({ message: message }, chainId);
  return JSON.stringify(getMessageToSign);
};

export const truncateAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4);
};

export const getRoleColor = (color: number): string =>
  color === 0 ? '#99aab5' : `#${Number(color).toString(16)}`;
