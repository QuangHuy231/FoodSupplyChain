export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
echo "Enrolling the CA admin"
mkdir -p ./bootstrapAdmin  
cp /home/huy/TTTN/FoodSupplyChain/network/Intermediate/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Intermediate/bootstrapAdmin/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Intermediate/bootstrapAdmin
set -x
fabric-ca-client enroll -u https://admin:adminpw@localhost:10054 --caname ca-intermediate --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
set -x
fabric-ca-client register --caname ca-intermediate --id.name intermediate-admin --id.secret intermediate-adminpw --id.type admin --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
mkdir -p ./Admin
cp /home/huy/TTTN/FoodSupplyChain/network/Intermediate/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin
set -x
fabric-ca-client enroll -u https://intermediate-admin:intermediate-adminpw@localhost:10054 --caname ca-intermediate -M /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://intermediate-admin:intermediate-adminpw@localhost:10054 --caname ca-intermediate -M /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.intermediate.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/keystore/server.key
set -x
echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-intermediate.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-intermediate.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-intermediate.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-10054-ca-intermediate.pem
    OrganizationalUnitIdentifier: orderer' > /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/msp/config.yaml

  { set +x; } 2>/dev/null  

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Intermediate/bootstrapAdmin
set -x
fabric-ca-client register --caname ca-intermediate --id.name peer --id.secret peerpw --id.type peer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/bootstrapAdmin/tls-cert.pem
{ set +x; } 2>/dev/null
set -x
mkdir -p ./Peer
cp /home/huy/TTTN/FoodSupplyChain/network/Intermediate/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer
{ set +x; } 2>/dev/null
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:10054 --caname ca-intermediate -M /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:10054 --caname ca-intermediate -M /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.intermediate.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/tls/keystore/server.key

set -x
cp /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Peer/msp/config.yaml
{ set +x; } 2>/dev/null