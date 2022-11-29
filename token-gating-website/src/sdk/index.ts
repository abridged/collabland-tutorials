import { CollabLandClient } from '@collabland/sdk';

// eslint-disable-next-line import/no-mutable-exports
let collabLandClient: CollabLandClient = new CollabLandClient(
  {},
  process.env.REACT_APP_API_SERVER_URL,
);

export const connectToSDK = async (token?: string): Promise<void> => {
  const client = token
    ? new CollabLandClient(
        {
          apiKey: process.env.REACT_APP_COLLABLAND_KEY,
          authenticatedEncryption: `AE ${token}`,
        },
        process.env.REACT_APP_API_SERVER_URL,
      )
    : new CollabLandClient(
        {
          apiKey: process.env.REACT_APP_COLLABLAND_KEY,
        },
        process.env.REACT_APP_API_SERVER_URL,
      );

  await client.connect();
  collabLandClient = client;
};

export const getCollabClient = (): CollabLandClient => collabLandClient;

export default collabLandClient;
