# Discord-bot

Um projeto simples para ser utilizado como back-end de bot no discord, permite:

- cadastrar comandos globais e locais;
- cadastrar reações para os comandos.

A descrição das variávies de ambientes podem ser encontradas no final do arquivo.

## Cadastrar reações para comandos
As reações são lidas e carregadas automaticamente dos arquivos contidos no diretório `src/commands/actions`. Cada arquivo é nomeado de acordo com o comando, sendo sintaticamente igual.
Cadastrar a reação de um comando não faz com que este exista, é necessário cadastrar os comandos de forma global ou local para um servidor.

## Cadastrar comandos globais e locais
Todos os comandos são cadastrados no arquivo de configuração `commands.json` contido em `src/commands/config`. O campo `online` indica que este campo será carregado de forma global, ou seja, disponibilizado em todos os servidores.

Para isso é necessário que algumas variáveis de ambientes estejam disponíveis:
- APPLICATION_BOT_TOKEN e APPLICATION_OAUTH_CLIENTE_ID para comandos globais e locais;
- TEST_GUILD_ID para comandos locais;

### Carregando os comandos de forma global
Os comandos são carregados globalmente através da execução do arquivo `src/commands/config/commands-global.js`. Pode ser executado com o script:

> yarn push-commands-global

### Carregando os comandos de forma local
Os comandos são carregados localmete, isto é, para um servidor específico através da execução do arquivo `src/commands/config/commands.js`. Pode ser executado com o script:

> yarn push-commands

## Variáveis de Ambiente

- APPLICATION_BOT_TOKEN: Token fornecido pela (plataforma de desenvolvimento do Discord)[https://discord.com/developers/applications]
- APPLICATION_OAUTH_CLIENTE_ID: Id do aplicativo fornecido pela (plataforma de desenvolvimento do Discord)[https://discord.com/developers/applications]
- NODE_ENV= Ambiente de execução da aplicação. O valor `production` indica que está sendo executado em produção e executará apenas os comandos que não partirem do servidor de teste, indicado pela variável de ambiente `TEST_GUILD_ID`. O valor `development`indica que está sendo executado em um ambiente de desenvolvimento e executará apenas os comandos que partirem do servidor de desenvolvimento.
- TEST_GUILD_ID: Id do servidor de teste da aplicação. É utilizado para carregar os comandos localmente para serem testados antes de serem carregados globalmente.