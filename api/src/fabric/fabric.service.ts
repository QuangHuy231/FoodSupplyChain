import { Injectable } from '@nestjs/common';
import { Gateway, Wallets } from 'fabric-network';
import FabricCAClient from 'fabric-ca-client';
import * as path from 'path';
import * as fs from 'fs';

const famerCcpPath = path.join(
  process.cwd(),
  './src/fabric/ccp/connection-producer.json',
);
const famerCcpFile = fs.readFileSync(famerCcpPath, 'utf8');
const famerCcp = JSON.parse(famerCcpFile);

// const producerCcpPath = path.join(process.cwd(), );
// const producerCcpFile = fs.readFileSync(producerCcpPath, 'utf8');
// const producerCcp = JSON.parse(producerCcpFile);

// const consumerCcpPath = path.join(process.cwd(), process.env.CONSUMER_CONN);
// const consumerCcpFile = fs.readFileSync(consumerCcpPath, 'utf8');
// const consumerCcp = JSON.parse(consumerCcpFile);

@Injectable()
export class FabricService {
  async connect(
    isManufacturer: boolean,
    isMiddleMen: boolean,
    isConsumer: boolean,
    userID: string,
  ) {
    const gateway = new Gateway();

    try {
      const { walletPath, connection, orgMSPID, caURL } =
        this.getConnectionMaterial(isManufacturer, isMiddleMen, isConsumer);

      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const userExists = await wallet.get(userID);
      if (!userExists) {
        console.error(
          `An identity for the user ${userID} does not exist in the wallet. Register ${userID} first`,
        );
        return {
          status: 401,
          error: 'User identity does not exist in the wallet.',
        };
      }

      await gateway.connect(connection, {
        wallet,
        identity: userID,
        discovery: {
          enabled: true,
          asLocalhost: true,
        },
      });
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('chaincode');
      console.log('Connected to Fabric network successfully.');

      const networkObj = { gateway, network, contract };

      return networkObj;
    } catch (err) {
      console.error(`Failed to connect network: ${err}`);
      await gateway.disconnect();
      return { status: 500, error: err.toString() };
    }
  }

  async query(networkObj: any, ...funcAndArgs: string[]) {
    try {
      console.log(`Query parameter: ${funcAndArgs}`);
      const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
      const response = await networkObj.contract.evaluateTransaction(
        ...funcAndArgsStrings,
      );
      console.log(`Transaction ${funcAndArgs} has been evaluated: ${response}`);

      return JSON.parse(response.toString());
    } catch (err) {
      console.error(`Failed to evaluate transaction: ${err}`);
      return { status: 500, error: err.toString() };
    } finally {
      if (networkObj.gateway) {
        await networkObj.gateway.disconnect();
      }
    }
  }

  async invoke(networkObj: any, ...funcAndArgs: string[]) {
    try {
      console.log(`Invoke parameter: ${funcAndArgs}`);
      const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
      console.log(funcAndArgsStrings);
      const response = await networkObj.contract.submitTransaction(
        ...funcAndArgsStrings,
      );
      console.log(response.toString());
      console.log(`Transaction ${funcAndArgs} has been submitted: ${response}`);

      return JSON.parse(response.toString());
    } catch (err) {
      console.error(`Failed to submit transaction: ${err}`);
      return { status: 500, error: err.toString() };
    } finally {
      if (networkObj.gateway) {
        await networkObj.gateway.disconnect();
      }
    }
  }

  async enrollAdmin(
    isManufacturer: boolean,
    isMiddleMen: boolean,
    isConsumer: boolean,
  ) {
    try {
      const { walletPath, orgMSPID, caURL } = this.getConnectionMaterial(
        isManufacturer,
        isMiddleMen,
        isConsumer,
      );

      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const adminExists = await wallet.get('admin');
      if (adminExists) {
        console.error('Admin user identity already exists in the wallet');
        return;
      }

      const ca = new FabricCAClient(caURL);
      const enrollment = await ca.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
      });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: 'admin',
        type: 'X.509',
      };
      await wallet.put('admin', x509Identity);
      console.log(
        `Successfully enrolled admin user and imported it into the wallet`,
      );
    } catch (err) {
      console.error(`Failed to enroll admin user: ${err}`);
      process.exit(1);
    }
  }

  async checkUserExists(
    isManufacturer: boolean,
    isMiddleMen: boolean,
    isConsumer: boolean,
    userID: string,
  ) {
    try {
      const { walletPath } = this.getConnectionMaterial(
        isManufacturer,
        isMiddleMen,
        isConsumer,
      );
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const userExists = await wallet.get(userID);
      return userExists !== null;
    } catch (err) {
      console.error(`Failed to check user exists ${userID}: ${err}`);
      return { status: 500, error: err.toString() };
    }
  }

  private getConnectionMaterial(
    isManufacturer: boolean,
    isMiddleMen: boolean,
    isConsumer: boolean,
  ) {
    const connectionMaterial: any = {};

    if (isManufacturer) {
      connectionMaterial.walletPath = path.join(process.cwd(), './wallet');
      connectionMaterial.connection = famerCcp;
      connectionMaterial.orgMSPID = 'ProducerMSP';
      connectionMaterial.caURL = 'https://localhost:7054';
    }

    // if (isMiddleMen) {
    //   connectionMaterial.walletPath = path.join(
    //     process.cwd(),
    //     process.env.MIDDLEMEN_WALLET,
    //   );
    //   connectionMaterial.connection = producerCcp;
    //   connectionMaterial.orgMSPID = process.env.MIDDLEMEN_MSP;
    //   connectionMaterial.caURL = process.env.MIDDLEMEN_CA_ADDR;
    // }

    // if (isConsumer) {
    //   console.log(process.env.CONSUMER_WALLET);
    //   connectionMaterial.walletPath = path.join(
    //     process.cwd(),
    //     process.env.CONSUMER_WALLET,
    //   );
    //   connectionMaterial.connection = consumerCcp;
    //   connectionMaterial.orgMSPID = process.env.CONSUMER_MSP;
    //   connectionMaterial.caURL = process.env.CONSUMER_CA_ADDR;
    // }

    return connectionMaterial;
  }
}
