import * as FabricCAServices from 'fabric-ca-client';
import { Gateway, GatewayOptions, Wallet, Wallets } from 'fabric-network';
import * as ccpJson from './ccp/connection-producer.json';
import { Fabric } from './fabric.type';

const mspOrg1 = 'ProducerMSP';
const walletPath = './wallet';

const adminUserId = 'admin';
const adminUserPasswd = 'adminpw';

const devFactory = async (): Promise<Fabric> => {
  const channelName = 'mychannel';
  const user1 = 'user1Producer';
  // build an in memory object with the network configuration (also known as a connection profile)
  // console.log(__dirname);
  // const ccp = JSON.parse(fs.readFileSync(__dirname + '/cpp/connection-org1.json', 'utf-8'));
  if (!ccpJson) return;
  const ccp = ccpJson as Record<string, unknown>;

  // build an instance of the fabric ca services client based on
  // the information in the network configuration
  const caClient = buildCAClient(ccp, 'ca-producer');

  // setup the wallet to hold the credentials of the application user
  const wallet = await buildWallet(walletPath);

  // in a real application this would be done on an administrative flow, and only once
  await enrollAdmin(caClient, wallet, mspOrg1);

  // in a real application this would be done only when a new user was required to be added
  // and would be part of an administrative flow
  await registerAndEnrollUser(
    caClient,
    wallet,
    mspOrg1,
    user1,
    'org1.department1',
  );

  // Create a new gateway instance for interacting with the fabric network.
  // In a real application this would be done as the backend server session is setup for
  // a user that has been verified.
  const gateway = new Gateway();

  const gatewayOpts: GatewayOptions = {
    wallet,
    identity: user1,
    discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
  };

  await gateway.connect(ccp, gatewayOpts);

  // Build a network instance based on the channel where the smart contract is deployed
  const network = await gateway.getNetwork(channelName);

  // Get the contract from the network.
  // const contract = network.getContract(chaincodeName);
  // console.log("contract: ", contract.);

  return { network };
};

export const FabricFactory = {
  provide: 'FABRIC_CONFIG',
  useFactory: devFactory,
};

const buildCAClient = (ccp: Record<string, any>, caHostName: string) => {
  // Create a new CA client for interacting with the CA.
  const caInfo = ccp.certificateAuthorities[caHostName]; // lookup CA details from config
  const caTLSCACerts = caInfo.tlsCACerts.pem;
  const caClient = new FabricCAServices(
    caInfo.url,
    { trustedRoots: caTLSCACerts, verify: false },
    caInfo.caName,
  );

  console.log(`Built a CA Client named ${caInfo.caName}`);
  return caClient;
};

const buildWallet = async (walletPath: string): Promise<Wallet> => {
  // Create a new  wallet : Note that wallet is for managing identities.
  let wallet: Wallet;
  if (walletPath) {
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
  } else {
    wallet = await Wallets.newInMemoryWallet();
    console.log('Built an in memory wallet');
  }

  return wallet;
};

const enrollAdmin = async (
  caClient: FabricCAServices,
  wallet: Wallet,
  orgMspId: string,
): Promise<void> => {
  try {
    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(adminUserId);
    if (identity) {
      console.log(
        'An identity for the admin user already exists in the wallet',
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await caClient.enroll({
      enrollmentID: adminUserId,
      enrollmentSecret: adminUserPasswd,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: orgMspId,
      type: 'X.509',
    };
    await wallet.put(adminUserId, x509Identity);
    console.log(
      'Successfully enrolled admin user and imported it into the wallet',
    );
  } catch (error) {
    console.error(`Failed to enroll admin user : ${error}`);
  }
};

const registerAndEnrollUser = async (
  caClient: FabricCAServices,
  wallet: Wallet,
  orgMspId: string,
  userId: string,
  affiliation: string,
): Promise<void> => {
  try {
    // Check to see if we've already enrolled the user
    const userIdentity = await wallet.get(userId);
    if (userIdentity) {
      console.log(
        `An identity for the user ${userId} already exists in the wallet`,
      );
      return;
    }

    // Must use an admin to register a new user
    const adminIdentity = await wallet.get(adminUserId);
    if (!adminIdentity) {
      console.log(
        'An identity for the admin user does not exist in the wallet',
      );
      console.log('Enroll the admin user before retrying');
      return;
    }

    // build a user object for authenticating with the CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

    // Register the user, enroll the user, and import the new identity into the wallet.
    // if affiliation is specified by client, the affiliation value must be configured in CA
    const secret = await caClient.register(
      {
        affiliation,
        enrollmentID: userId,
        role: 'client',
      },
      adminUser,
    );
    const enrollment = await caClient.enroll({
      enrollmentID: userId,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: orgMspId,
      type: 'X.509',
    };
    await wallet.put(userId, x509Identity);
    console.log(
      `Successfully registered and enrolled user ${userId} and imported it into the wallet`,
    );
  } catch (error) {
    console.error(`Failed to register user : ${error}`);
  }
};
