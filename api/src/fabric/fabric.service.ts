import { Injectable } from '@nestjs/common';
import { Gateway, Wallets } from 'fabric-network';
import * as FabricCAClient from 'fabric-ca-client';
import * as path from 'path';
import * as fs from 'fs';

const famerCcpPath = path.join(
  process.cwd(),
  './src/fabric/ccp/connection-famer.json',
);
const famerCcpFile = fs.readFileSync(famerCcpPath, 'utf8');
const famerCcp = JSON.parse(famerCcpFile);

const producerCcpPath = path.join(
  process.cwd(),
  './src/fabric/ccp/connection-producer.json',
);
const producerCcpFile = fs.readFileSync(producerCcpPath, 'utf8');
const producerCcp = JSON.parse(producerCcpFile);

const transportationCcpPath = path.join(
  process.cwd(),
  './src/fabric/ccp/connection-transportation.json',
);
const transportationCcpFile = fs.readFileSync(transportationCcpPath, 'utf8');
const transportationCcp = JSON.parse(transportationCcpFile);

const retailerCcpPath = path.join(
  process.cwd(),
  './src/fabric/ccp/connection-retailer.json',
);
const retailerCcpFile = fs.readFileSync(retailerCcpPath, 'utf8');
const retailerCcp = JSON.parse(retailerCcpFile);

@Injectable()
export class FabricService {
  async connect(
    isFamer: boolean,
    isProducer: boolean,
    isTransportation: boolean,
    isRetailer: boolean,
    userId: string,
  ) {
    const gateway = new Gateway();

    try {
      const { walletPath, connection } = this.getConnectionMaterial(
        isFamer,
        isProducer,
        isTransportation,
        isRetailer,
      );

      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const userExists = await wallet.get(userId);
      if (!userExists) {
        console.error(
          `An identity for the user ${userId} does not exist in the wallet. Register ${userId} first`,
        );
        return {
          status: 401,
          error: 'User identity does not exist in the wallet.',
        };
      }

      await gateway.connect(connection, {
        wallet,
        identity: userId,
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
    console.log(`Query parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    console.log(funcAndArgsStrings);
    const response = await networkObj.contract.evaluateTransaction(
      ...funcAndArgsStrings,
    );
    console.log(`Transaction ${funcAndArgs} has been evaluated: ${response}`);

    return response;
  }

  async invoke(networkObj: any, ...funcAndArgs: string[]) {
    console.log(`Invoke parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    const response = await networkObj.contract.submitTransaction(
      ...funcAndArgsStrings,
    );
    console.log(`Transaction ${funcAndArgs} has been submitted: ${response}`);

    return response;
  }

  async enrollAdmin(
    isFamer: boolean,
    isProducer: boolean,
    isTransportation: boolean,
    isRetailer: boolean,
  ) {
    try {
      const { walletPath, caURL, orgMSPID } = this.getConnectionMaterial(
        isFamer,
        isProducer,
        isTransportation,
        isRetailer,
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
        mspId: orgMSPID,
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

  async registerUser(
    isFamer: boolean,
    isProducer: boolean,
    isTransportation: boolean,
    isRetailer: boolean,
    userId: string,
  ) {
    try {
      const { walletPath, orgMSPID, caURL } = this.getConnectionMaterial(
        isFamer,
        isProducer,
        isTransportation,
        isRetailer,
      );

      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const userExists = await wallet.get(userId);
      if (userExists) {
        console.error(
          `An identity for the user ${userId} already exists in the wallet`,
        );
        return {
          status: 400,
          error: 'User identity already exists in the wallet.',
        };
      }

      let adminIdentity = await wallet.get('admin');
      if (!adminIdentity) {
        console.log(
          'An identity for the admin user "admin" does not exist in the wallet',
        );
        await this.enrollAdmin(
          isFamer,
          isProducer,
          isTransportation,
          isRetailer,
        );
        adminIdentity = await wallet.get('admin');
        console.log('Admin Enrolled Successfully');
      }
      const ca = new FabricCAClient(caURL);

      const provider = wallet
        .getProviderRegistry()
        .getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(adminIdentity, 'admin');
      let secret;
      try {
        secret = await ca.register(
          {
            affiliation: 'org1.department1',
            enrollmentID: userId,
            role: 'client',
          },
          adminUser,
        );
      } catch (err) {
        return err.message;
      }

      const enrollment = await ca.enroll({
        enrollmentID: userId,
        enrollmentSecret: secret,
      });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: orgMSPID,
        type: 'X.509',
      };

      await wallet.put(userId, x509Identity);

      console.log(
        `Successfully registered user. Use userName ${userId} to log in`,
      );

      return x509Identity;
    } catch (err) {
      console.error(`Failed to register user ${userId}: ${err}`);
      return { status: 500, error: err.toString() };
    }
  }

  async checkUserExists(
    isFamer: boolean,
    isProducer: boolean,
    isTransportation: boolean,
    isRetailer: boolean,
    userId: string,
  ) {
    try {
      const { walletPath } = this.getConnectionMaterial(
        isFamer,
        isProducer,
        isTransportation,
        isRetailer,
      );
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const userExists = await wallet.get(userId);
      return userExists !== null;
    } catch (err) {
      console.error(`Failed to check user exists ${userId}: ${err}`);
      return { status: 500, error: err.toString() };
    }
  }

  private getConnectionMaterial(
    isFamer: boolean,
    isProducer: boolean,
    isTransportation: boolean,
    isRetailer: boolean,
  ) {
    const connectionMaterial: any = {};

    if (isFamer) {
      connectionMaterial.walletPath = path.join(
        process.cwd(),
        './famer-wallet',
      );
      connectionMaterial.connection = famerCcp;
      connectionMaterial.orgMSPID = 'ProducerMSP';
      connectionMaterial.caURL = 'https://localhost:7054';
    }

    if (isProducer) {
      connectionMaterial.walletPath = path.join(
        process.cwd(),
        './producer-wallet',
      );
      connectionMaterial.connection = producerCcp;
      connectionMaterial.orgMSPID = 'ProcessorMSP';
      connectionMaterial.caURL = 'https://localhost:8054';
    }

    if (isTransportation) {
      connectionMaterial.walletPath = path.join(
        process.cwd(),
        './transportation-wallet',
      );
      connectionMaterial.connection = transportationCcp;
      connectionMaterial.orgMSPID = 'DistributorMSP';
      connectionMaterial.caURL = 'https://localhost:9054';
    }

    if (isRetailer) {
      connectionMaterial.walletPath = path.join(
        process.cwd(),
        './retailer-wallet',
      );
      connectionMaterial.connection = retailerCcp;
      connectionMaterial.orgMSPID = 'IntermediateMSP';
      connectionMaterial.caURL = 'https://localhost:10054';
    }

    return connectionMaterial;
  }
}
