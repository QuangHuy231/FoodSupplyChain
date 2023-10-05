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

ORG=Consumer
P0PORT=11051
CAPORT=11054
PEERPEM=/home/huy/TTTN/FoodSupplyChain/network/Consumer/Peer/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem
CAPEM=/home/huy/TTTN/FoodSupplyChain/network/Consumer/CA-server/tls-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > connection-consumer.json