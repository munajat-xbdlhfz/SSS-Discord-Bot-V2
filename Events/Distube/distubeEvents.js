const client = require("../../main");
const { MessageEmbed } = require("discord.js");
module.exports.name = "distubeEvents";

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setFooter({ text: `${client.user.username} Music` })
    .setDescription(`🎶 | Playing [${song.name}](${song.url}) (${song.formattedDuration})\nRequested by: ${song.user}\n${status(queue)}`)]}
    ))
    
    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setFooter({ text: `${client.user.username} Music` })
    .setDescription(`🎶 | Added [${song.name}](${song.url}) (${song.formattedDuration}) to the queue.\nRequested by: ${song.user}`)]}
    ))
    
    .on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setFooter({ text: `${client.user.username} Music` })
    .setDescription(`🎶 | Added **${playlist.name}** playlist (${playlist.songs.length} songs) to queue.\nRequested by: ${playlist.user}\n${status(queue)}`)]}
    ))
    
    .on("error", (channel, e) => {
        channel.send({embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`⛔ | An error encountered: ${e}`)]})
    })

    .on("empty", queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription("Voice channel is empty! Leaving the channel.")]}
    ))
    
    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed()
    .setColor("RED")
    .setDescription(`⛔ | No result found!`)]}
    ))
    
    .on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("AQUA")
    .setDescription("No more song in queue! Leaving the channel.")]}
    ))