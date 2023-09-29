#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ./ccp-template.json
}

ORG=Producer
P0PORT=7051
CAPORT=7054
PEERPEM=/home/huy/TTTN/FoodSupplyChain/network/Producer/Peer/tls/tlscacerts/tls-localhost-7054-ca-producer.pem
CAPEM=/home/huy/TTTN/FoodSupplyChain/network/Producer/CA-server/tls-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > connection-producer.json