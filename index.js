require("dotenv").config();

const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types");
const {Client, intents, collections} = require("discord.js");
const {Player} = require ("discord-player");

const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
    intents: [intents.FLAGS.GUILDS, 
        intents.FLAGS.GUILD_Messages, 
        intents.FLAGS.GUILD_VOICE_STATES]
});

//Load All The Commands

const Commands = [];
client.commands = new Collection();

const commandsPath = path.koin(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles)
{
    const filepath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command);
}

client.player = new Player (client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

client.on("ready", () => {
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: "9"}).setToken(process.env.Token);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT, guildId), {
            body: commands
         })
         .then(() => console.log('Added commands to ${guildId}'))
         .catch(console.error);
        }
});

client.on ("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute({client, interaction});

    }
    catch(err)
    {
        console.error(err);
        await interaction.reply("An error has occurred while executing that command.");

    }

});

client.login(process.env.TOKEN);