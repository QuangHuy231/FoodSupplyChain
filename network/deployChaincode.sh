export CORE_PEER_TLS_ENABLED=true
export CHANNEL_NAME=mychannel
export CHAINCODE_NAME=chaincode
export PATH=/home/huy/TTTN/FoodSupplyChain/network/bin:$PATH
export FABRIC_CFG_PATH=/home/huy/TTTN/FoodSupplyChain/network/config
export ORDERER_TLS_ROOT_CA=/home/huy/TTTN/FoodSupplyChain/network/Orderer/Orderer1/tls/tlscacerts/tls-localhost-6054-ca-orderer.pem
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


installChaincode(){
setPeer0Producer
peer lifecycle chaincode install /home/huy/TTTN/FoodSupplyChain/network/chaincode/chaincode.tgz
setPeer0Processor
peer lifecycle chaincode install /home/huy/TTTN/FoodSupplyChain/network/chaincode/chaincode.tgz
setPeer0Distributor
peer lifecycle chaincode install /home/huy/TTTN/FoodSupplyChain/network/chaincode/chaincode.tgz
setPeer0Intermediate
peer lifecycle chaincode install /home/huy/TTTN/FoodSupplyChain/network/chaincode/chaincode.tgz
setPeer0Consumer
peer lifecycle chaincode install /home/huy/TTTN/FoodSupplyChain/network/chaincode/chaincode.tgz

}





queryInstall(){
    setPeer0Producer
    peer lifecycle chaincode queryinstalled
}



approveformyorg(){
    setPeer0Producer
    peer lifecycle chaincode approveformyorg -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA --channelID $CHANNEL_NAME   --name $CHAINCODE_NAME --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --package-id $CC_PACKAGE_ID  --sequence 1
    setPeer0Processor
    peer lifecycle chaincode approveformyorg -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA --channelID $CHANNEL_NAME   --name $CHAINCODE_NAME --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --package-id $CC_PACKAGE_ID  --sequence 1
    setPeer0Distributor
    peer lifecycle chaincode approveformyorg -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA --channelID $CHANNEL_NAME   --name $CHAINCODE_NAME --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --package-id $CC_PACKAGE_ID  --sequence 1
     setPeer0Intermediate
    peer lifecycle chaincode approveformyorg -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA --channelID $CHANNEL_NAME   --name $CHAINCODE_NAME --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --package-id $CC_PACKAGE_ID  --sequence 1
 setPeer0Consumer
    peer lifecycle chaincode approveformyorg -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA --channelID $CHANNEL_NAME   --name $CHAINCODE_NAME --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --package-id $CC_PACKAGE_ID  --sequence 1


}

checkApprove(){
    setPeer0Producer
peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name $CHAINCODE_NAME  --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --sequence 1 --tls --cafile $ORDERER_TLS_ROOT_CA --output json
}

commitChaincode(){
    setPeer0Producer

    peer lifecycle chaincode commit -o localhost:7050 --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --signature-policy "OR('ProducerMSP.member', 'ProcessorMSP.member', 'DistributorMSP.member', 'IntermediateMSP.member', 'ConsumerMSP.member')" --version 1.0 --sequence 1 --tls --cafile $ORDERER_TLS_ROOT_CA --peerAddresses localhost:7051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem --peerAddresses localhost:8051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem --peerAddresses localhost:9051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem --peerAddresses localhost:10051 --tlsRootCertFiles   /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem --peerAddresses localhost:11051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem
}

initLedger(){
    setPeer0Producer

    # peer chaincode invoke -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME --peerAddresses localhost:7051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem --peerAddresses localhost:8051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem --peerAddresses localhost:9051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem --peerAddresses localhost:10051 --tlsRootCertFiles   /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem --peerAddresses localhost:11051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem   -c '{"Args":["createUser", "1", "huy", "nguyenquanghuya3kd@gmail.com", "Famer", "BinhDinh", "2311"]}'

    peer chaincode invoke -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME --peerAddresses localhost:7051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem --peerAddresses localhost:8051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem --peerAddresses localhost:9051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem --peerAddresses localhost:10051 --tlsRootCertFiles   /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem --peerAddresses localhost:11051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem   -c '{"Args":["CreateProduct", "product2", "Cu", "1", "plant", "havdate", "image"]}'

    

    # peer chaincode invoke -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME --peerAddresses localhost:7051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem --peerAddresses localhost:8051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem --peerAddresses localhost:9051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem --peerAddresses localhost:10051 --tlsRootCertFiles   /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem --peerAddresses localhost:11051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem   -c '{"Args":["deleteProduct",  "product1"]}'

    # peer chaincode invoke -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME --peerAddresses localhost:7051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem --peerAddresses localhost:8051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem --peerAddresses localhost:9051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem --peerAddresses localhost:10051 --tlsRootCertFiles   /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem --peerAddresses localhost:11051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem   -c '{"Args":["TransferProductToProducer",  "product1", "producerName"]}'

    # peer chaincode invoke -o localhost:7050 --tls --cafile $ORDERER_TLS_ROOT_CA -C $CHANNEL_NAME -n $CHAINCODE_NAME --peerAddresses localhost:7051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Producer/Admin/tls/tlscacerts/tls-localhost-7054-ca-producer.pem --peerAddresses localhost:8051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Processor/Admin/tls/tlscacerts/tls-localhost-8054-ca-processor.pem --peerAddresses localhost:9051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Distributor/Admin/tls/tlscacerts/tls-localhost-9054-ca-distributor.pem --peerAddresses localhost:10051 --tlsRootCertFiles   /home/huy/TTTN/FoodSupplyChain/network/Intermediate/Admin/tls/tlscacerts/tls-localhost-10054-ca-intermediate.pem --peerAddresses localhost:11051 --tlsRootCertFiles /home/huy/TTTN/FoodSupplyChain/network/Consumer/Admin/tls/tlscacerts/tls-localhost-11054-ca-consumer.pem   -c '{"Args":["UpdateProductByProducer",  "productCode", "producerName", "producerAddress", "productionDate", "expirationDate", "ingredients", "productionSteps", "images"]}'
}


# installChaincode
# queryInstall
export CC_PACKAGE_ID=chaincode_1.0:2bedaa7d17da0b9650230faf6e71ae3ad2b61c123be5fdbe347193551a84911f


# docker build -t hyperledger/chaincode --build-arg CC_SERVER_PORT=9999 .
# docker run -it -d --name chaincode  --network fabric_test --hostname=chaincode -e CHAINCODE_SERVER_ADDRESS=0.0.0.0:9999 -e CHAINCODE_ID=chaincode_1.0:2bedaa7d17da0b9650230faf6e71ae3ad2b61c123be5fdbe347193551a84911f  hyperledger/chaincode

# approveformyorg
# checkApprove
# commitChaincode

# initLedger

setPeer0Producer
peer chaincode query -C $CHANNEL_NAME -n $CHAINCODE_NAME -c '{"Args":["QueryProduct", "product1"]}'






