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

        const monthNames = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        // Target join date
        var dJoined = new Date(Target.joinedTimestamp);
        var month = monthNames[dJoined.getMonth()];
        var hours = dJoined.getHours();
        var minutes = "0" + dJoined.getMinutes();
        var joined = `📅 ${dJoined.getDate()} ${month} ${dJoined.getFullYear()}, ${hours}:${minutes.substr(-2)}`;

        // Target create discord date
        var dCreate = new Date(Target.user.createdTimestamp);
        var month = monthNames[dCreate.getMonth()];
        var hours = dCreate.getHours();
        var minutes = "0" + dCreate.getMinutes();
        var create = `📅 ${dCreate.getDate()} ${month} ${dCreate.getFullYear()}, ${hours}:${minutes.substr(-2)}`;

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(`${Target.displayName} Information`, Target.user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(Target.user.avatarURL({dynamic: true, size: 512}))
        .addField("User ID", `${Target.user.id}`)
        .addField("Roles", `${Target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
        .addField("Server Member Since", `${joined} - <t:${parseInt(Target.joinedTimestamp / 1000)}:R>`)
        .addField("Discord User Since", `${create} - <t:${parseInt(Target.user.createdTimestamp / 1000)}:R>`)

        interaction.reply({embeds: [Response], ephemeral: true})
    }
}