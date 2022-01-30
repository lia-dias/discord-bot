const { Interaction, MessageEmbed} = require("discord.js");

/**
 * Exibe o avatar de um usuário
 * @param {Interaction} interaction 
 */
module.exports = async (interaction) => {
    const emoji = interaction.options.getString('emoji');

    console.log(emoji);

    if(!emoji) {
        interaction.reply(`${interaction.user} tá achando que sou palhaça?`);
    } else {
        await interaction.reply(`https://cdn.discordapp.com/emojis/${emoji.replaceAll(/\D/g,'')}?size=512`);
    }

    return;s

    const referencia_emoji = interaction.guild.emojis.resolveId(emoji);

    if(!referencia_emoji)

    if(subcomando === 'global') {   
        usuario_contexto = interaction.options.getUser('usuario') || interaction.user;
        
    } else if(subcomando === 'local') {
        usuario_contexto = interaction.options.getMember('usuario') || interaction.member;
    }

    const avatar = usuario_contexto.avatarURL({
        dynamic:  true,
        size: 512
    });

    if(avatar) {
        const icon_guilda = interaction.guild.iconURL({
            dynamic: true
        });
        const avatar_embed = new MessageEmbed()
            .setColor(interaction.member.displayHexColor)
            .setTitle(interaction.member.displayName)
            .setAuthor({ name: interaction.guild.name, iconURL: icon_guilda })
            .setImage(avatar)
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL({
                dynamic: true
            }) });

        await interaction.reply({
            embeds: [avatar_embed]
        });
    } else {    
        await interaction.reply('Algo de errado não está certo. Se for avatar local vê ai se o usuário tem um. Se não for esse o problema, então não sei.');
    }
}