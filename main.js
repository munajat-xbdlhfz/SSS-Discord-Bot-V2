const { Client, Collection } = require('discord.js')
const client = new Client({intents: 32767})

const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")

client.commands = new Collection();
client.filters = new Collection();
client.filtersLog = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

["Events", "Commands"].forEach(handler => {
    require(`./Structures/Handlers/${handler}`)(client, PG, Ascii);
});

// Login Discord Bot
client.login(process.env.BOT_TOKEN)