const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed, Message} = require ("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("Skip")
    .setDescription("Skips the current song."),
    execute: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);
        

        if (!queue) {

            await interaction.reply("There is no song playing.");
            return;
        }

        const currentsong = queue.current;
        
        queue.skip();

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setDescription(   `Skipped **$(currentSong.title)**`)
                .setThumbnail(currentSong.Thumbnail)
            ]
        })
    }
}