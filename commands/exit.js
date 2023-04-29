const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed, Message} = require ("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("Exit")
    .setDescription("Exits the current song."),
    execute: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);
        

        if (!queue) {

            await interaction.reply("There is no song playing.");
            return;
        }
        
        queue.Destroy();

        await interaction.reply("Y u bullying me?")
    }
}