const { MessageEmbed, WebhookClient, GuildMember, MessageAttachment } = require("discord.js")
const Canvas = require("canvas")

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} newMember 
     */
    async execute(newMember) {
        const { guild } = newMember;

        if (newMember.guild.id != process.env.GUILD_ID) return;

        // Welcome Webhook
        const webhook = new WebhookClient({
            id: process.env.WELCOME_ID,
            token: process.env.WELCOME_TOKEN
        });

        Canvas.registerFont('./Fonts/HYWenHei.ttf', { family: 'HYWenHei', style: 'Heavy', weight: 'Bold' })
        const canvas = Canvas.createCanvas(960, 540);
        let fontSize = 50;
        const ctx = canvas.getContext("2d");
    
        // Load image background
        const background = await Canvas.loadImage("./Structures/Images/welcome.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.shadowColor = "BLACK";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "#9B59B6";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        // Print welcome text
        ctx.font = "70px HYWenHei";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("WELCOME", canvas.width / 2, canvas.height / 1.22);

        // Print usertag text
        do {
            ctx.font = `${fontSize -= 10}px HYWenHei`;
        } while (ctx.measureText(`${newMember.user.tag}`).width > canvas.width);
        ctx.fillText(newMember.user.tag.toUpperCase(), canvas.width / 2, canvas.height / 1.1);
    
        // Set Profile Picture
        const avatar = await Canvas.loadImage(newMember.displayAvatarURL({format: "jpeg"}));
            
        let x = canvas.width / 2 - 100
        let y = canvas.height / 2 - 100
        ctx.beginPath();
        ctx.arc(x + 100, y + 100, 100, 0, Math.PI * 2, true);
        ctx.lineWidth = 15;
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, x, y, 200, 200);
    
        const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");

        // Set welcome embed
        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({ name: `WELCOME TO ${guild.name.toUpperCase()}`, iconURL: newMember.displayAvatarURL() })
        .setDescription(
            `Selamat datang ${newMember} di **${guild.name}** Discord Server!\n`+
            `Pastikan untuk memeriksa channel yang di tandai di bawah!\n`+
            `**Let's Hunt Together & Happy Hunting!**`
        )
        .addFields(
            { name: `📖 Rules`, value: `<#${process.env.RULES_ID}>`, inline: true },
            { name: `🎮 Get Roles`, value: `<#${process.env.ROLES_ID}>`, inline: true },
            { name: `🤝 Greetings`, value: `<#${process.env.GREETINGS_ID}>`, inline: true },
        )
        .setImage(`attachment://welcome.png`)
        .setTimestamp()
        .setFooter({ text: `Member #${guild.memberCount}`, iconURL: guild.iconURL() });

        webhook.send({content: `Welcome ${newMember} **(${newMember.user.tag})**,`, embeds: [Welcome], files: [attachment]}).catch((err) => console.log(err));
    }
}