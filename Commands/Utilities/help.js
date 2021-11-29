const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Get help command.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { member, guild } = interaction;

        const help = new MessageEmbed()
        .setColor("AQUA")
        .setThumbnail(guild.me.displayAvatarURL())
        .setDescription(
            `**S.S.S Admin Commands**\n`+
            `**\`/ban [@user] [reason]\`**\n`+
            `Ban a member from server.\n`+
            `**\`/clear [ammount] [@user]\`**\n`+
            `Deletes a specified ammount of messages from a channel or from user in channel.\n`+
            `**\`/kick [@user] [reason]\`**\n`+
            `Kick a member from server.\n`+
            `**\`/role [action] [@user] [@role]\`**\n`+
            `Give a role to member or remove a role from member.\n`+
            `**\`/unban [userID]\`**\n`+
            `Unban a member from server.\n\n`+
            `**S.S.S User Commands**\n`+
            `**\`/help\`**\n`+
            `Get a help about bot commands.\n`+
            `**\`/music play [song]\`**\n`+
            `Play a music.\n`+
            `**\`/music settings [options]\`**\n`+
            `Select option settings on music bot.\n`+
            `**\`/music volume [percent]\`**\n`+
            `Set a music volume.\n`+
            `**\`/ping\`**\n`+
            `Displays the bot ping.`
        )

        interaction.reply({embeds: [help], ephemeral: true})
    }
}