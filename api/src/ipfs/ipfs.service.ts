import { Inject, Injectable } from '@nestjs/common';
import type { IPFSHTTPClient } from 'ipfs-http-client';

import * as fs from 'fs';

@Injectable()
export class IpfsService {
  constructor(
    @Inject('IPFS_CONFIG') private readonly ipfsClient: IPFSHTTPClient,
  ) {}

  async upload(fileStream: any) {
    const result = await this.ipfsClient.add(fileStream);
    console.log('ipfs save: ', result);
    return { cid: result.cid.toString() };
  }

  async download(cid: string) {
    const asyncArr = this.ipfsClient.cat(cid);
    fs.writeFileSync('./files/' + cid, '');

    for await (const chunk of asyncArr) {
      fs.appendFileSync('./files/' + cid, Buffer.from(chunk));
    }
    return fs.createReadStream('./files/' + cid, {});
  }
}
