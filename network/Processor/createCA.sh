export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
echo "Enrolling the CA admin"
mkdir -p ./bootstrapAdmin  
cp /home/huy/TTTN/FoodSupplyChain/network/Processor/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Processor/bootstrapAdmin/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Processor/bootstrapAdmin
set -x
fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-processor --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
set -x
fabric-ca-client register --caname ca-processor --id.name processor-admin --id.secret processor-adminpw --id.type admin --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
mkdir -p ./Admin
cp /home/huy/TTTN/FoodSupplyChain/network/Processor/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Processor/Admin
set -x
fabric-ca-client enroll -u https://processor-admin:processor-adminpw@localhost:8054 --caname ca-processor -M /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://processor-admin:processor-adminpw@localhost:8054 --caname ca-processor -M /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.processor.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/keystore/server.key
set -x
echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-processor.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-processor.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-processor.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-processor.pem
    OrganizationalUnitIdentifier: orderer' > /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/msp/config.yaml

  { set +x; } 2>/dev/null  

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Processor/bootstrapAdmin
set -x
fabric-ca-client register --caname ca-processor --id.name peer --id.secret peerpw --id.type peer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/bootstrapAdmin/tls-cert.pem
{ set +x; } 2>/dev/null
set -x
mkdir -p ./Peer
cp /home/huy/TTTN/FoodSupplyChain/network/Processor/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Processor/Peer
{ set +x; } 2>/dev/null
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:8054 --caname ca-processor -M /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/msp/keystore/server.key
set -x
fabric-ca-client enroll -u https://peer:peerpw@localhost:8054 --caname ca-processor -M /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/tls --enrollment.profile tls --csr.hosts localhost --csr.hosts peer0.processor.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/tls-cert.pem
{ set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/tls/keystore/server.key

set -x
cp /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Processor/Peer/msp/config.yaml
{ set +x; } 2>/dev/null