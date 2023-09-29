export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
echo "Enrolling the CA admin"
mkdir -p ./bootstrapAdmin  
cp /home/huy/TTTN/FoodSupplyChain/network/Producer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Producer/bootstrapAdmin/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Producer/bootstrapAdmin
set -x
fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-producer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
set -x
fabric-ca-client register --caname ca-producer --id.name producer-admin --id.secret producer-adminpw --id.type admin --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
mkdir -p ./Admin
cp /home/huy/TTTN/FoodSupplyChain/network/Producer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Producer/Admin
set -x
fabric-ca-client enroll -u https://producer-admin:producer-adminpw@localhost:7054 --caname ca-producer -M /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://producer-admin:producer-adminpw@localhost:7054 --caname ca-producer -M /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.producer.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/keystore/server.key
set -x
echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-producer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-producer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-producer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-producer.pem
    OrganizationalUnitIdentifier: orderer' > /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/msp/config.yaml

  { set +x; } 2>/dev/null  

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Producer/bootstrapAdmin
set -x
fabric-ca-client register --caname ca-producer --id.name peer --id.secret peerpw --id.type peer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/bootstrapAdmin/tls-cert.pem
{ set +x; } 2>/dev/null
set -x
mkdir -p ./Peer
cp /home/huy/TTTN/FoodSupplyChain/network/Producer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Producer/Peer
{ set +x; } 2>/dev/null
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:7054 --caname ca-producer -M /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:7054 --caname ca-producer -M /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.producer.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls/keystore/server.key

set -x
cp /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/msp/config.yaml
{ set +x; } 2>/dev/null