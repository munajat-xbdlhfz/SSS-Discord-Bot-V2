const { ContextMenuInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "userinfo",
    type: "USER",
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute (interaction) {
        const Target = await interaction.guild.members.fetch(interaction.targetId);

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({ name: `${Target.displayName} Information`, iconURL: Target.user.avatarURL({dynamic: true, size: 512}) })
        .setThumbnail(Target.user.avatarURL({dynamic: true, size: 512}))
        .addField("User ID", `${Target.user.id}`)
        .addField("Roles", `${Target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
        .addField("Server Member Since", `<t:${parseInt(Target.joinedTimestamp / 1000)}:F>`)
        .addField("Discord User Since", `<t:${parseInt(Target.user.createdTimestamp / 1000)}:F>`)

        interaction.reply({embeds: [Response], ephemeral: true})
    }
}