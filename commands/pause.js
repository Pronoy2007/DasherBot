const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed, Message} = require ("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("Pause")
    .setDescription("Pauses the current song."),
    execute: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);
        

        if (!queue) {

            await interaction.reply("There is no song playing.");
            return;
        }
        
        queue.setPaused(True);

        await interaction.reply("The current song has been paused.")
    }
}