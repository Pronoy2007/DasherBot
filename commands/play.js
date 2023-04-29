const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song.")

    .addSubcommand(subcommand => {
        subcommand
        .setName("Search")
        .setDescription("Searches for a song")
        .addStringOption(option => {
            option
            .setName("searchterms")
            .setDescription("search keywords")
            .setRequired(true);
        })
    })
.subcommand(subcommand => {
    subcommand
    .setName("playlist")
    .setDescription("Playlist URL")
    .addStringOption(Option => {
        return option
        .setName ("url")
        .setDescription("Plays from url")
        .setRequired(true);
    })
})
.addSubcommand(subcommand => {
    subcommand
    .setName("song")
    .setDescription("Plays a song from Youtube")
    .addStringOption(option => {
        option
        .setName("url")
        .setDescription("Plays a song from youtube")
        .setRequired(true);
        
    })

 }),
 execute: async ({client, interaction}) => {
    if (!interaction.member.voice.channel)
    {
        await interaction.reply("You Must Be In A Voice Channel to Use This Command");
        return;
        const queue = await client.player.createQueue(interaction.guild);
        if (!queue.connection) await queue.commect(interaction.member.voice.channel)
        let embed = new MessageEmbed();
        if (interaction.option.getSubCommand()=== "Song")
        {
            let url = interaction.option.getString("url");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });
            
            if(result.tracks.length === 0)
            {
                await interaction.reply("No Results Found");
                return;
            }
            const song = result.tracks [0]
            await queue.addTrack(song);

            embed
            .setDescription( `Added **[$(song.title)](${song.url})** to the queue.`)
            .setThumbnail(song.Thumbnail)
            .setFooter({text: `Duration: ${song.duration}`});
        }
    }
    else if(interaction.option.getSubcommand() === "playlist")
{
    let url = interaction.option.getString("url");
    const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
    });
    
    if(result.tracks.length === 0)
    {
        await interaction.reply("No Playlists Found");
        return;
    }
    const playlist = result.tracks [0]
    await queue.addTracks(song);

    embed
    .setDescription( `Added **[$(playlist.title)](${playlist.url})** to the queue.`)
    .setThumbnail(song.Thumbnail)
    .setFooter({text: `Duration: ${playlist.duration}`});
}


else if(interaction.option.getSubcommand() === "search")
{
    let url = interaction.option.getString("searchterms");
    const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
    });
    
    if(result.tracks.length === 0)
    {
        await interaction.reply("No Results Found");
        return;
    }
    const song = result.tracks [0]
    await queue.addTracks(song);

    embed
    .setDescription( `Added **[$(song.title)](${song.url})** to the queue.`)
    .setThumbnail(song.Thumbnail)
    .setFooter({text: `Duration: ${song.duration}`});

}

    if(!queue,playing) await queue.play();
    
    await interaction.reply({
        embeds: [embed]
    })



 }
}