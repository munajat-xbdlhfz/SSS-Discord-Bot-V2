const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        if (member.guild.id != process.env.GUILD_ID) return;
        
        const Loger = new WebhookClient({
            id: process.env.GOODBYE_ID,
            token: process.env.GOODBYE_TOKEN
        });
        
        const Goodbye = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setDescription(`**${member.displayName}** has left the community.`)
        .addField("Server Member Since", `<t:${parseInt(member.joinedTimestamp / 1000)}:F>`)
        .addField("Latest Member Count", `👥 **${guild.memberCount}** members in server.`)
        .setFooter(`User ID: ${user.id}`)

        Loger.send({embeds: [Goodbye]})
    }
}