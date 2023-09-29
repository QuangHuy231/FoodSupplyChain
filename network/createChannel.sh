export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
export CHANNEL_NAME=mychannel
export CORE_PEER_TLS_ENABLED=true
export FABRIC_CFG_PATH=/home/huy/TTTN/FoodSupplyChain/network/config
createChannelGenesisBlock(){
    configtxgen -configPath /home/huy/TTTN/FoodSupplyChain/network/config/ -profile FoodSupplyChainApplicationGenesis -outputBlock ./${CHANNEL_NAME}.block -channelID $CHANNEL_NAME
}

setOsnAdmin(){
export ORDERER_TLS_ROOT_CA=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls/tlscacerts/tls-localhost-6054-ca-orderer.pem

export ORDERER1_TLS_SIGN_CERT=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls/signcerts/cert.pem
export ORDERER1_TLS_PRIVATE_KEY=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls/keystore/server.key

export ORDERER2_TLS_SIGN_CERT=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls/signcerts/cert.pem
export ORDERER2_TLS_PRIVATE_KEY=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer2/tls/keystore/server.key

export ORDERER3_TLS_SIGN_CERT=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls/signcerts/cert.pem
export ORDERER3_TLS_PRIVATE_KEY=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer3/tls/keystore/server.key
}


setPeer0Producer(){

export CORE_PEER_LOCALMSPID="ProducerMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem
export CORE_PEER_MSPCONFIGPATH=/home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/msp
export CORE_PEER_ADDRESS=localhost:7051

}
setPeer0Processor(){

export CORE_PEER_LOCALMSPID="ProcessorMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem
export CORE_PEER_MSPCONFIGPATH=/home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/msp
export CORE_PEER_ADDRESS=localhost:8051

}

setPeer0Distributor(){

export CORE_PEER_LOCALMSPID="DistributorMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem
export CORE_PEER_MSPCONFIGPATH=/home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/msp
export CORE_PEER_ADDRESS=localhost:9051

}

setPeer0Intermediate(){

export CORE_PEER_LOCALMSPID="IntermediateMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem
export CORE_PEER_MSPCONFIGPATH=/home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/msp
export CORE_PEER_ADDRESS=localhost:10051

}

setPeer0Consumer(){

export CORE_PEER_LOCALMSPID="ConsumerMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem
export CORE_PEER_MSPCONFIGPATH=/home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/msp
export CORE_PEER_ADDRESS=localhost:11051

}



createChannel(){
    setOsnAdmin
    osnadmin channel join --channelID $CHANNEL_NAME --config-block ./${CHANNEL_NAME}.block -o localhost:7053 --ca-file $ORDERER_TLS_ROOT_CA --client-cert $ORDERER1_TLS_SIGN_CERT --client-key $ORDERER1_TLS_PRIVATE_KEY
}


addOrderer(){
    setOsnAdmin
    osnadmin channel join --channelID $CHANNEL_NAME --config-block ./${CHANNEL_NAME}.block -o localhost:8053 --ca-file $ORDERER_TLS_ROOT_CA --client-cert $ORDERER2_TLS_SIGN_CERT --client-key $ORDERER2_TLS_PRIVATE_KEY
    osnadmin channel join --channelID $CHANNEL_NAME --config-block ./${CHANNEL_NAME}.block -o localhost:9053 --ca-file $ORDERER_TLS_ROOT_CA --client-cert $ORDERER3_TLS_SIGN_CERT --client-key $ORDERER3_TLS_PRIVATE_KEY
}


joinPeer(){
    setPeer0Producer
    peer channel join -b ./$CHANNEL_NAME.block
    setPeer0Processor
    peer channel join -b ./$CHANNEL_NAME.block
    setPeer0Distributor
    peer channel join -b ./$CHANNEL_NAME.block
    setPeer0Intermediate
    peer channel join -b ./$CHANNEL_NAME.block
    setPeer0Consumer
    peer channel join -b ./$CHANNEL_NAME.block
}




echo "Generating channel genesis block '${CHANNEL_NAME}.block'"
createChannelGenesisBlock

createChannel
addOrderer
joinPeer



