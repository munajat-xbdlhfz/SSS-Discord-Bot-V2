const { CommandInteraction, MessageEmbed } = require("discord.js")

const actions = ["give", "remove"];

module.exports = {
    name: "role",
    description: "Add a new role for user.",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "action",
            description: `Select an action to perform ${actions.join(' or ')} role.`,
            type: "STRING",
            required: true,
            choices: actions.map((action) => ({
                name: action, value: action,
            })),
        },
        {
            name: "target",
            description: "Select a target.",
            type: "USER",
            required: true
        },
        {
            name: "role",
            description: "Select a role.",
            type: "ROLE",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    execute (interaction) {
        const { options, guild, member } = interaction;

        const serverRole = options.getRole("role");
        const target = options.getMember("target");

        const success = new MessageEmbed().setColor("GREEN").setTitle("**Role Management**");
        const failed = new MessageEmbed().setColor("RED").setTitle("**Role Management**");

        switch (options.getString("action")) {
            case "give": {
                success.setDescription("✅ Successfully add a role to user!");
                failed.setDescription("⛔ Failed add a role to user!");

                if (target.roles.cache.some(role => role.name === serverRole.name)) {
                    failed.addField("Reason:", `You cannot add ${serverRole} role to ${target.user} because they already have it.`);

                    return interaction.reply({embeds: [failed]});
                } 
                else if (serverRole.position >= guild.me.roles.highest.position) {
                    failed.addField("Reason:", `You cannot add ${serverRole} role to ${target.user} because that role it's higher or same as bot's role.`);
                    failed.addField("Note:", `Please check server role and set bot role a higher position to add role to member.`);
                    
                    return interaction.reply({embeds: [failed]});
                }
                else {
                    target.roles.add(serverRole);
                    success.addField("Result:", `Added the ${serverRole} role to ${target.user}.`);

                    return interaction.reply({embeds: [success]});
                }
            }
            case "remove": {
                success.setDescription("✅ Successfully remove a role from user!");
                failed.setDescription("⛔ Failed remove a role from user!");

                if (!target.roles.cache.some(role => role.name === serverRole.name)) {
                    failed.addField("Reason:", `You cannot remove ${serverRole} role from ${target.user} when they dont have it.`);

                    return interaction.reply({embeds: [failed]});
                }
                else if (target.roles.highest.position >= member.roles.highest.position) {
                    failed.addField("Reason:", `You cannot remove ${serverRole} role from ${target.user} because that role it's higher or same as you.`);

                    return interaction.reply({embeds: [failed]});
                } 
                else if (serverRole.position >= guild.me.roles.highest.position) {
                    failed.addField("Reason:", `You cannot remove ${serverRole} role from ${target.user} because that role it's higher or same as bot's role.`);
                    failed.addField("Note:", `Please check server role and set bot role a higher position to remove the role from member.`);
                    
                    return interaction.reply({embeds: [failed]});
                } 
                else {
                    target.roles.remove(serverRole);
                    success.addField("Result:", `Removed the ${serverRole} role from ${target.user}.`);
        
                    return interaction.reply({embeds: [success]});
                }
            }
        }
    }
}