<<<<<<< HEAD
# seguradoraUniformes - uniformes

This awesome project was created automatically with <a href="https://github.com/worldsibu/convector-cli" target="_blank">Convector CLI</a>.
By default new Convector projects locally include <a href="https://github.com/worldsibu/hurley">Hurley</a> to manage your development environment seamlessly, so you don't have to worry about setting up the network and hard ways to install  and upgrade your chaincodes.

## Start

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
# Install your smart contract
npm run cc:start -- uniformes
# Make a testing call to create a record in the ledger
# Beware that the first call may fail with a timeout! Just happens the first time
hurl invoke uniformes uniformes_create "{\"name\":\"my first request\",\"id\":\"0001\",\"created\":0,\"modified\":0}"
```

## About Hurley

You may as well install **Hurley** globally for easier and more flexible management. 

`npm i -g @worldsibu/hurley`

Since with Hurley globally you have control over everything, some things that you can do, for example, is installing a Convector Smart Contract with a different name than the one you used for your project.

```
# Use the same package
# Install a new chaincode with the same source code but the name 'anothernameforyourcc'
hurl install anothernameforyourcc node
```

Other complex tasks you may need is installing to a different channel.

```
# Use the same package
# Be sure you started your environment with more than one channel running 'hurl new --channels 2'. Otherwise this will throw an error.
hurl install anothernameforyourcc node --channel ch2
```

---

If you don't want to, don't worries! This project works right away.

## Start - if you have Hurley globally

### Bring your project to life 

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
hurl new
```

###  Install and upgrade chaincodes

```
# Package your smart contract's code  - From the root of your project
npm run cc:package -- uniformes org1
# Install to your blockchain - From the root of your project
hurl install uniformes node -P ./chaincode-uniformes
# Install in debug mode, this will run the chaincode server locally so you can debug
hurl install uniformes node -P ./chaincode-uniformes --debug

# Upgrade your existing chaincode - From the root of your project
hurl upgrade uniformes node 1.2 -P ./chaincode-uniformes
```

## Start - if you don't have Hurley globally

### Bring your project to life 

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
```

###  Install and upgrade chaincodes

```
# Install to your blockchain - From the root of your project
npm run cc:start -- uniformes

# Upgrade your existing chaincode - From the root of your project
npm run cc:upgrade -- uniformes 1.2
```

## Tests

```
npm run test
```

> Check all the information to work with Convector <a href="https://docs.covalentx.com/convector" target="_blank">in the DOCS site</a>.

## Collaborate to the Convector Suite projects

* <a href="https://community.covalentx.com" target="_blank">Discord chat with the community</a>
* <a href="https://github.com/worldsibu" target="_blank">Convector projects</a>
=======
# Uniformes

1. Instalar Ambiente Hyplerledger

https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

Nota importante: Convector utiliza o Node versão 8.9.0. Agora, a instalaçao de hyperledger 1.4x recomenda a instalação de 8.9.4 em diante. Isto não é um impedimento, mas, se o ambiente de Fabric for instalado o segundo os pre-requisitos, devemos instalar o nvm (controle de versão de node) e instalar o node 8.9.0 a fim de realizar as compilações do contratos inteligentes. 

Uma vez realizada a instalação do nvm, podemos intercambiar facilmente entre versoes de node para relizar as devidas compilações dos contratos inteligentes (requerido versao de node 8.9.0).

2. Instalar Convector e Hurley (estas são ferramentas de instalação e configuração da rede e desenvolvimento de Contratos Inteligentes)

npm install -g @worldsibu/hurley

npm install -g @worldsibu/convector-cli

sudo npm install -g @worldsibu/hurley

sudo npm install -g @worldsibu/hurley --unsafe-perm=true

sudo npm i @worldsibu/conv-rest-api


3. Realizar git Clone do Backend: SeguradoraUniformes

4. Na pasta onde foi realizado o clone, executar "npm install" 

5. Uma vez concluido devemos executar ./restart.sh dentro da pasta seguradoraUniformes. Este comando ira gerar o ambiente de Blockchain, compilar e realizar o deploy do contrato inteligente e upload dos dados.

6. Os dados já encontram-se carregados, agora podemos proceder para compilar o front-end de Uniformes.
>>>>>>> affb107c43b47f46b2e1845dab5c645074a3e3cb
