const { Message, Client, MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot) return;

        const { content, guild, author, channel } = message;
        const messageContent = content.toLowerCase();

        const Filter = client.filters.get(guild.id);
        if (!Filter) return;

        const wordsUsed = [];
        let shouldDelete = false;

        Filter.forEach((word) => {
            if (messageContent.includes(word)) {
                wordsUsed.push(word); 
                shouldDelete = true;
            }
        })

        if (shouldDelete) message.delete().catch(() => {});

        if (wordsUsed.length) {
            const channelID = client.filtersLog.get(guild.id);
            if (!channelID) return;
            const channelObject = guild.channels.cache.get(channelID);
            if (!channelObject) return;

            const Embed = new MessageEmbed()
            .setColor("RED")
            .setAuthor({ name: `${author.tag}`, iconURL: author.displayAvatarURL() })
            .setDescription([
                `**${author.username}** used ${wordsUsed.length} blacklisted word(s) in ${channel}`,
                `\`\`\`\n${wordsUsed.map((w) => w).join(", ")}\`\`\``,
            ].join("\n"))
            .setFooter({ text: `ID: ${author.id}` })
            .setTimestamp()

            channelObject.send({embeds: [Embed]});
        }
    }
}