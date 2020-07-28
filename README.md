# Uniformes

This awesome project was created automatically with <a href="https://github.com/worldsibu/convector-cli" target="_blank">Convector CLI</a>.
By default new Convector projects locally include <a href="https://github.com/worldsibu/hurley">Hurley</a> to manage your development environment seamlessly, so you don't have to worry about setting up the network and hard ways to install  and upgrade your chaincodes.

# Como implementar

1. Instalar Ambiente Hyplerledger
```
https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html
```
Nota importante: Convector utiliza o Node versão 8.9.0. Agora, a instalaçao de hyperledger 1.4x recomenda a instalação de 8.9.4 em diante. Isto não é um impedimento, mas, se o ambiente de Fabric for instalado o segundo os pre-requisitos, devemos instalar o nvm (controle de versão de node) e instalar o node 8.9.0 a fim de realizar as compilações do contratos inteligentes. 

Uma vez realizada a instalação do nvm, podemos intercambiar facilmente entre versoes de node para relizar as devidas compilações dos contratos inteligentes (requerido versao de node 8.9.0).

2. Instalar Convector e Hurley (estas são ferramentas de instalação e configuração da rede e desenvolvimento de Contratos Inteligentes)

```
npm install -g @worldsibu/hurley
npm install -g @worldsibu/convector-cli
sudo npm install -g @worldsibu/hurley
sudo npm install -g @worldsibu/hurley --unsafe-perm=true
sudo npm i @worldsibu/conv-rest-api
```

3. Realizar git Clone do Backend: SeguradoraUniformes

4. Na pasta onde foi realizado o clone, executar "npm install" 

```
npm install
```

5. Uma vez concluido devemos executar ./restart.sh dentro da pasta seguradoraUniformes. Este comando ira gerar o ambiente de Blockchain, compilar e realizar o deploy do contrato inteligente e upload dos dados.

```
./restart.sh
```

6. Os dados já encontram-se carregados, agora podemos proceder para compilar o front-end de Uniformes.

## Collaborate to the Convector Suite projects

* <a href="https://community.covalentx.com" target="_blank">Discord chat with the community</a>
* <a href="https://github.com/worldsibu" target="_blank">Convector projects</a>
=======
