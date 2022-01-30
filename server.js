require('dotenv').config();
const { Client, Intents } = require("discord.js");
const Commands = require('./src/commands/actions/index');
const { APPLICATION_BOT_TOKEN: app_token, NODE_ENV, TEST_GUILD_ID } = process.env;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Bot funcionando!");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    if(
        (NODE_ENV === 'development' && interaction.guildId !== TEST_GUILD_ID)
        ||
        (NODE_ENV === 'production' && interaction.guildId === TEST_GUILD_ID)
     ) {
        return;
    }

	const { commandName } = interaction;

    if(Object.keys(Commands).includes(commandName)) {
        Commands[commandName](interaction);
    } else {
        await interaction.reply('Comando Indisponível');
    }
});

client.login(app_token);