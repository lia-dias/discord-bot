require('dotenv').config();
const fs = require('fs');
const path = require('path');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {
    APPLICATION_BOT_TOKEN: app_token,
    APPLICATION_OAUTH_CLIENTE_ID: app_id,
} = process.env;

/**
 * Faz o parsing de um nome para gerar um comando
 * @param {string} nome 
 * @returns 
 */
function criaComandoPorNome(nome) {
    return nome.toLowerCase()
        .replaceAll(
            /\s+/g,
            '-'
        )
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
}

let comandos = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'commands.json')).toString()
);
comandos = comandos.filter((comando) => {
	return comando.online
})
comandos = comandos.map((comando) => {
    let construtor_comando = new SlashCommandBuilder()
        .setName(criaComandoPorNome(comando.nome))
        .setDescription(comando.descricao);

    if(comando.opcoes && comando.opcoes.length > 0) {
        for(opcao of comando.opcoes) {
            construtor_comando = construtor_comando[`add${opcao.tipo}Option`](_opcao => {
                return _opcao 
                        .setName(criaComandoPorNome(opcao.nome))
                        .setDescription(opcao.descricao)
            })
        }
    };

    if(comando.subcomandos && comando.subcomandos.length > 0) {
        for(subcomando of comando.subcomandos) {
            construtor_comando = construtor_comando.addSubcommand(_subcomando => {
                let construtor_subcomando = _subcomando 
                    .setName(criaComandoPorNome(subcomando.nome))
                    .setDescription(subcomando.descricao);

                if(subcomando.opcoes && subcomando.opcoes.length > 0) {
                    for(opcao of subcomando.opcoes) {
                        construtor_subcomando = construtor_subcomando[`add${opcao.tipo}Option`](_opcao => {
                            return _opcao 
                                    .setName(criaComandoPorNome(opcao.nome))
                                    .setDescription(opcao.descricao)
                        })
                    }
                };

                return construtor_subcomando;
            })
        }
    };

    return construtor_comando.toJSON();
});

const rest = new REST({ version: '9' }).setToken(app_token);

rest.put(Routes.applicationCommands(app_id),
	{ body: comandos })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);