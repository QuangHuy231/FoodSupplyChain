export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
echo "Enrolling the CA admin"
mkdir -p ./bootstrapAdmin  
cp /home/huy/TTTN/FoodSupplyChain/network/Orderer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Orderer/bootstrapAdmin/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Orderer/bootstrapAdmin

set -x
fabric-ca-client enroll -u https://admin:adminpw@localhost:6054 --caname ca-orderer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null
  set -x
fabric-ca-client register --caname ca-orderer --id.name orderer1 --id.secret orderer1pw --id.type orderer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null

 set -x
fabric-ca-client register --caname ca-orderer --id.name orderer2 --id.secret orderer2pw --id.type orderer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null

  set -x
fabric-ca-client register --caname ca-orderer --id.name orderer3 --id.secret orderer3pw --id.type orderer --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/bootstrapAdmin/tls-cert.pem
  { set +x; } 2>/dev/null


mkdir -p ./Orderer1
cp /home/huy/TTTN/FoodSupplyChain/network/Orderer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1
  set -x
fabric-ca-client enroll -u https://orderer1:orderer1pw@localhost:6054 --caname ca-orderer -M /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls-cert.pem
 { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/msp/keystore/server.key
    set -x
fabric-ca-client enroll -u https://orderer1:orderer1pw@localhost:6054 --caname ca-orderer -M /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls --enrollment.profile tls  --csr.hosts localhost --csr.hosts orderer1.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls/keystore/server.key
set -x
echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-6054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/msp/config.yaml

  { set +x; } 2>/dev/null  


mkdir -p ./Orderer2
cp /home/huy/TTTN/FoodSupplyChain/network/Orderer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2
  set -x
fabric-ca-client enroll -u https://orderer2:orderer2pw@localhost:6054 --caname ca-orderer -M /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls-cert.pem
 { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/msp/keystore/server.key
    set -x
fabric-ca-client enroll -u https://orderer2:orderer2pw@localhost:6054 --caname ca-orderer -M /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls --enrollment.profile tls  --csr.hosts localhost --csr.hosts orderer2.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls/keystore/server.key

cp /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/msp/config.yaml



mkdir -p ./Orderer3
cp /home/huy/TTTN/FoodSupplyChain/network/Orderer/CA-server/tls-cert.pem /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls-cert.pem
export FABRIC_CA_CLIENT_HOME=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3
  set -x
fabric-ca-client enroll -u https://orderer3:orderer3pw@localhost:6054 --caname ca-orderer -M /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/msp --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls-cert.pem
 { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/msp/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/msp/keystore/server.key
    set -x
fabric-ca-client enroll -u https://orderer3:orderer3pw@localhost:6054 --caname ca-orderer -M /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls --enrollment.profile tls  --csr.hosts localhost --csr.hosts orderer3.example.com --tls.certfiles /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls-cert.pem
  { set +x; } 2>/dev/null
mv /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls/keystore/* /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls/keystore/server.key

cp /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/msp/config.yaml /home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/msp/config.yaml

