export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
echo "Enrolling the CA admin"
mkdir -p ./bootstrapAdmin  
cp /home/huy/TTTN/FoodSupplyChain/network/Consumer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Consumer/bootstrapAdmin/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Consumer/bootstrapAdmin
set -x
fabric-ca-client enroll -u https://admin:adminpw@localhost:11054 --caname ca-consumer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
set -x
fabric-ca-client register --caname ca-consumer --id.name consumer-admin --id.secret consumer-adminpw --id.type admin --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
mkdir -p ./Admin
cp /home/huy/TTTN/FoodSupplyChain/network/Consumer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin
set -x
fabric-ca-client enroll -u https://consumer-admin:consumer-adminpw@localhost:11054 --caname ca-consumer -M /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://consumer-admin:consumer-adminpw@localhost:11054 --caname ca-consumer -M /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.consumer.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/keystore/server.key
set -x
echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-consumer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-consumer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-consumer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-consumer.pem
    OrganizationalUnitIdentifier: orderer' > /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/msp/config.yaml

  { set +x; } 2>/dev/null  

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Consumer/bootstrapAdmin
set -x
fabric-ca-client register --caname ca-consumer --id.name peer --id.secret peerpw --id.type peer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/bootstrapAdmin/tls-cert.pem
{ set +x; } 2>/dev/null
set -x
mkdir -p ./Peer
cp /home/huy/TTTN/FoodSupplyChain/network/Consumer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer
{ set +x; } 2>/dev/null
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:11054 --caname ca-consumer -M /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:11054 --caname ca-consumer -M /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.consumer.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls/keystore/server.key

set -x
cp /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/msp/config.yaml
{ set +x; } 2>/dev/null