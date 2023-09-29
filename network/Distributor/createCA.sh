export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
echo "Enrolling the CA admin"
mkdir -p ./bootstrapAdmin  
cp /home/huy/TTTN/FoodSupplyChain/network/Distributor/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Distributor/bootstrapAdmin/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Distributor/bootstrapAdmin
set -x
fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-distributor --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
set -x
fabric-ca-client register --caname ca-distributor --id.name distributor-admin --id.secret distributor-adminpw --id.type admin --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
mkdir -p ./Admin
cp /home/huy/TTTN/FoodSupplyChain/network/Distributor/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin
set -x
fabric-ca-client enroll -u https://distributor-admin:distributor-adminpw@localhost:9054 --caname ca-distributor -M /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://distributor-admin:distributor-adminpw@localhost:9054 --caname ca-distributor -M /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.distributor.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/keystore/server.key
set -x
echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-distributor.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-distributor.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-distributor.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-distributor.pem
    OrganizationalUnitIdentifier: orderer' > /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/msp/config.yaml

  { set +x; } 2>/dev/null  

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Distributor/bootstrapAdmin
set -x
fabric-ca-client register --caname ca-distributor --id.name peer --id.secret peerpw --id.type peer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/bootstrapAdmin/tls-cert.pem
{ set +x; } 2>/dev/null
set -x
mkdir -p ./Peer
cp /home/huy/TTTN/FoodSupplyChain/network/Distributor/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer
{ set +x; } 2>/dev/null
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:9054 --caname ca-distributor -M /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:9054 --caname ca-distributor -M /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.distributor.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/tls/keystore/server.key

set -x
cp /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Distributor/Peer/msp/config.yaml
{ set +x; } 2>/dev/null