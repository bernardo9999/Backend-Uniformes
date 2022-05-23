# IMPORTANTE - CORRECT VERSIONS OF TYPESCRIPT AND DEPS ON SERVER


#!/bin/sh
echo "############ Matando processos API ###########"

npx lerna run stop --scope server
ps -ef | pkill -f 'npx lerna run start --scope server --stream'

sleep 5

echo "############ Limpando o ambiente ###########"

npm run env:clean

npx lerna clean --yes

echo "######## Reiniciando o Hyperledger ############"

npm run env:restart

echo "############ Atualizando Hyperledger profiles #############"

cp /root/hyperledger-fabric-network/network-profiles/org1.network-profile.uniformes.yaml /root/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml
cp /root/hyperledger-fabric-network/network-profiles/org2.network-profile.uniformes.yaml /root/hyperledger-fabric-network/network-profiles/org2.network-profile.yaml

echo "############ Creating Rest Server #############"

conv-rest-api generate api -c uniformes -f ./uniformes.config.json

echo "############ Bootstrapping #############"

npm install

sleep 2

npx lerna bootstrap

sleep 5

echo "############ Empacotando Chaincodes #############"

npm run cc:package -- uniformes org1

sleep 30

echo "############ Instalando Chaincodes #############"

npm run cc:start:debug -- uniformes &

sleep 60

echo "############ Criando Usuarios #############"

hurl invoke uniformes uniformes_registerParticipant "Compras" "Compras" --user Compras  -o org1

sleep 2

hurl invoke uniformes uniformes_registerParticipant "Fabricante" "Fabricante" --user Fabricante -o org1

sleep 2

hurl invoke uniformes uniformes_registerParticipant "Transportadora" "Transportadora" --user Transportadora -o org1

sleep 2

hurl invoke uniformes uniformes_registerParticipant "CD" "CD" --user CD -o org1

sleep 2

hurl invoke uniformes uniformes_registerParticipant "Fornecedor" "Fornecedor" --user Fornecedor -o org1

sleep 2

echo "############ Inicializando processos API ###########"

npx lerna run start --scope server --stream &

sleep 30

echo "############ Inicializando Lotes ###########"

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "1", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "1",  "data": { "lote_id": "4", "asset_owner": "Fornecedor","data_estimada_cd": "2020-07-07T03:00:00.000Z","data_estimada_fabricante": "2020-06-22T03:00:00.000Z","data_estimada_transportadora": "2020-06-24T03:00:00.000Z","data_fim_cd": "2020-07-09T03:00:00.000Z","data_fim_fabricante": "2020-06-22T03:00:00.000Z","data_fim_transportadora": "2020-06-24T03:00:00.000Z","data_inicio_cd": "2020-06-24T03:00:00.000Z","data_inicio_compras": "2020-06-18T18:34:12.411Z","data_inicio_fabricante": "2020-06-18T18:34:12.411Z","data_inicio_fornecedor": "2020-07-09T03:00:00.000Z","data_inicio_transportadora": "2020-06-22T03:00:00.000Z", "qualidade_fabricante": "Alta","quantidade_compras": 1000,"status_cd": "Concluido","status_compras": "Pedido","status_fabricante": "Concluido","status_fornecedor": "Em Fornecedor","status_transportadora": "Concluido","uniforme": [],"valida_qualidade_cd": true,"valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "3", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "3", "data": {"asset_owner": "Compras","data_inicio_compras": "2020-06-19T02:12:37.819Z","lote_id": "8",
"quantidade_compras": 900,"status_compras": "Pedido"}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "4", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "4",  "data": {"asset_owner": "Fabricante","data_estimada_fabricante": "2020-06-22T03:00:00.000Z","data_fim_fabricante": "2020-06-26T02:06:47.191Z","data_inicio_compras": "2020-06-19T02:06:47.191Z","data_inicio_fabricante": "2020-06-19T02:06:47.191Z","lote_id": "3","qualidade_fabricante": "Baixa","quantidade_compras": 500,"status_compras": "Pedido","status_fabricante": "Em Confeccao","valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "5", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "5",  "data": { "lote_id": "4", "asset_owner": "Fornecedor","data_estimada_cd": "2020-07-07T03:00:00.000Z","data_estimada_fabricante": "2020-06-22T03:00:00.000Z","data_estimada_transportadora": "2020-06-24T03:00:00.000Z","data_fim_cd": "2020-07-09T03:00:00.000Z","data_fim_fabricante": "2020-06-22T03:00:00.000Z","data_fim_transportadora": "2020-06-24T03:00:00.000Z","data_inicio_cd": "2020-06-24T03:00:00.000Z","data_inicio_compras": "2020-06-18T18:34:12.411Z","data_inicio_fabricante": "2020-06-18T18:34:12.411Z","data_inicio_fornecedor": "2020-07-09T03:00:00.000Z","data_inicio_transportadora": "2020-06-22T03:00:00.000Z", "qualidade_fabricante": "Alta","quantidade_compras": 1000,"status_cd": "Concluido","status_compras": "Pedido","status_fabricante": "Concluido","status_fornecedor": "Em Fornecedor","status_transportadora": "Concluido","uniforme": [],"valida_qualidade_cd": true,"valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "6", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "6", "data":{"asset_owner": "Transportadora","data_estimada_fabricante": "2020-06-23T03:00:00.000Z","data_estimada_transportadora": "2020-06-26T03:00:00.000Z","data_fim_fabricante": "2020-06-26T02:17:10.353Z","data_fim_transportadora": "2020-06-28T02:17:10.353Z","data_inicio_compras": "2020-06-19T02:17:10.353Z","data_inicio_fabricante": "2020-06-19T02:17:10.353Z","data_inicio_transportadora": "2020-06-26T02:17:10.353Z","lote_id": "1","qualidade_fabricante": "Baixa","quantidade_compras": 1100,"status_compras": "Pedido","status_fabricante": "Concluido","status_transportadora": "Em Transporte","valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "7", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "7",  "data": { "lote_id": "2", "asset_owner": "Fornecedor","data_estimada_cd": "2020-07-07T03:00:00.000Z","data_estimada_fabricante": "2020-06-22T03:00:00.000Z","data_estimada_transportadora": "2020-06-24T03:00:00.000Z","data_fim_cd": "2020-07-09T03:00:00.000Z","data_fim_fabricante": "2020-06-22T03:00:00.000Z","data_fim_transportadora": "2020-06-24T03:00:00.000Z","data_inicio_cd": "2020-06-24T03:00:00.000Z","data_inicio_compras": "2020-06-18T18:34:12.411Z","data_inicio_fabricante": "2020-06-18T18:34:12.411Z","data_inicio_fornecedor": "2020-07-09T03:00:00.000Z","data_inicio_transportadora": "2020-06-22T03:00:00.000Z", "qualidade_fabricante": "Alta","quantidade_compras": 1000,"status_cd": "Concluido","status_compras": "Pedido","status_fabricante": "Concluido","status_fornecedor": "Em Fornecedor","status_transportadora": "Concluido","uniforme": [],"valida_qualidade_cd": true,"valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "8", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "8",  "data": { "lote_id": "6", "asset_owner": "Fornecedor","data_estimada_cd": "2020-07-07T03:00:00.000Z","data_estimada_fabricante": "2020-06-22T03:00:00.000Z","data_estimada_transportadora": "2020-06-24T03:00:00.000Z","data_fim_cd": "2020-07-09T03:00:00.000Z","data_fim_fabricante": "2020-06-22T03:00:00.000Z","data_fim_transportadora": "2020-06-24T03:00:00.000Z","data_inicio_cd": "2020-06-24T03:00:00.000Z","data_inicio_compras": "2020-06-18T18:34:12.411Z","data_inicio_fabricante": "2020-06-18T18:34:12.411Z","data_inicio_fornecedor": "2020-07-09T03:00:00.000Z","data_inicio_transportadora": "2020-06-22T03:00:00.000Z", "qualidade_fabricante": "Alta","quantidade_compras": 1000,"status_cd": "Concluido","status_compras": "Pedido","status_fabricante": "Concluido","status_fornecedor": "Em Fornecedor","status_transportadora": "Concluido","uniforme": [],"valida_qualidade_cd": true,"valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

curl http://localhost:8000/uniformes/createContrato -d '{"contrato": {"id": "9", "lote": []}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createLote -d '{"id": "9", "data":{"asset_owner": "CD","data_estimada_cd": "2020-07-02T03:00:00.000Z","data_estimada_fabricante": "2020-06-25T03:00:00.000Z","data_estimada_transportadora": "2020-06-22T03:00:00.000Z","data_fim_cd": "2020-07-07T03:00:00.000Z","data_fim_fabricante": "2020-06-26T02:23:24.214Z","data_fim_transportadora": "2020-06-22T03:00:00.000Z","data_inicio_cd": "2020-06-22T03:00:00.000Z","data_inicio_compras": "2020-06-19T02:23:24.214Z","data_inicio_fabricante": "2020-06-19T02:23:24.214Z","data_inicio_transportadora": "2020-06-26T02:23:24.214Z","lote_id": "1","qualidade_fabricante": "Alta","quantidade_compras": 200,"status_cd": "Recebido","status_compras": "Pedido","status_fabricante": "Concluido","status_transportadora": "Concluido","valida_qualidade_cd": true,"valida_quantidade_fabricante": true}}' -H "Content-Type: application/json" --request POST

sleep 10

echo "############ Inicializando Produtos ###########"

curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "1", "status": "Ativo", "funcionario": "Capeão", "matricula": "7645", "area": "Laticínios", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "2", "status": "Retornado", "funcionario": "Zona Sul", "matricula": "34342", "area": "Produtos", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "3", "status": "Descartado", "funcionario": "Sulamericana", "matricula": "6543", "area": "Produtos", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "4", "status": "Ativo", "funcionario": "Coop", "matricula": "9865", "area": "Laticínios", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "5", "status": "Ativo", "funcionario": "Líder", "matricula": "2778", "area": "Laticínios", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "6", "status": "Ativo", "funcionario": "Carrefour", "matricula": "7554", "area": "Laticínios", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "7", "status": "Retornado", "funcionario": "Walmart", "matricula": "1234", "area": "Produtos", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "8", "status": "Retornado", "funcionario": "Pão de Açucar", "matricula": "1543", "area": "Produtos", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "9", "status": "Ativo", "funcionario": "Princesa", "matricula": "1832", "area": "Laticínios", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "10", "status": "Ativo", "funcionario": "Hortifrut", "matricula": "6788", "area": "Produtos", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "11", "status": "Ativo", "funcionario": "Guanabara", "matricula": "6742", "area": "Laticínios", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST
curl http://localhost:8000/uniformes/createUniforme -d '{"id": "5","lote_id":"4","uniforme": {"rfid": "12", "status": "Descartado", "funcionario": "Extra", "matricula": "6432", "area": "Produtos", "data": "2020-06-29T19:20:31.361Z"}}' -H "Content-Type: application/json" --request POST

sleep 10

echo "############ Inicialização do ambiente concluída ###########"
