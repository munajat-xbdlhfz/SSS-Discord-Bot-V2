const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "kick",
    description: "Kick a member.",
    permission: "KICK_MEMBERS",
    options: [
        {
            name: "target",
            description: "Select a target to kick from server.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Reason for this kick.",
            type: "STRING",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild } = interaction;

        const owner = await guild.fetchOwner();
        const target = options.getMember("target");
        const reason = options.getString("reason") || "No reason provided";

        if (target.guild.id != process.env.GUILD_ID)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ Sorry, the bot is not yet available for multiguild.`)]})

        if (target.id === member.id)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ You cannot kick yourself.`)]})

        if (target.id === owner.id)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ You cannot kick an owner.`)]})

        if (target.permissions.has("ADMINISTRATOR"))
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ You cannot kick an administrator.`)]})

        if (target.roles.highest.position >= member.roles.highest.position)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ You cannot kick this user as their role is higher or same as you.`)]})

        if (target.roles.highest.position > guild.me.roles.highest.position)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`⛔ Bot doesnt have a power to kick member with higher role. Please check server role and set bot role a higher position to kick a member.`)]})

        if (reason.lenght > 512)
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ The reason cannot exceed 512 characters.`)]})

        target.kick(reason);
        
        await target.send(`You have been kicked from **${interaction.guild.name}**, reason: ${reason}`)
        .catch(() => member.send(`I couldn't dm ${target.user.tag}. Are their dms off?`));

        await interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`✅ Successfully kicked ${target} from server!`)], fetchReply:true}).then(m => {
            setTimeout(() => m.delete(), 5 * 1000)
        }).catch(() => { });

        client.channels.cache.get(process.env.CHANNEL_LOGS_ID).send({embeds: [new MessageEmbed().setColor("RED").setDescription(`${target}**(${target.user.tag})** have been **kicked** by ${member}**(${member.user.tag})** for: ${reason}`)]})
    }
}