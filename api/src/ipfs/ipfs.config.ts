import { create, IPFSHTTPClient } from 'ipfs-http-client';

export const IpfsFactory = {
  provide: 'IPFS_CONFIG',
  useFactory: () => {
    const ipfsClient: IPFSHTTPClient = create({
      url: process.env.IPFS_API_URL,
    });
    return ipfsClient;
  },
};
