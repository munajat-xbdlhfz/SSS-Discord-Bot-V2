const { GuildMember, MessageEmbed, MessageAttachment } = require("discord.js")
const Canvas = require("canvas")

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember 
     */
    async execute(oldMember, newMember) {
        const { guild } = newMember;

        if (!oldMember.premiumSince && newMember.premiumSince) {
            const canvas = Canvas.createCanvas(1600, 420);
            let fontSize = 45;
            const ctx = canvas.getContext("2d");

            // Load image background
            const background = await Canvas.loadImage("./Structures/Images/boost.png");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.shadowColor = "BLACK";
            ctx.shadowBlur = 10;
            ctx.strokeStyle = "#9B59B6";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Print server boosts text
            let server = `${guild.name.toUpperCase()} HAS ${guild.premiumSubscriptionCount} BOOSTS`;
            do {
                ctx.font = `${fontSize -= 5}px Arial Black`;
            } while (ctx.measureText(server).width > canvas.width);
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(server, canvas.width / 2, canvas.height / 1.7);

            // Print thanks for boosting text
            ctx.font = "35px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(`Thank you ${newMember.user.username} for supporting the community!`, canvas.width / 2, canvas.height / 1.4);

            // Set server picture
            const avatar = await Canvas.loadImage(guild.iconURL({format: "jpeg"}));
                
            let x = canvas.width / 2 - 50
            let y = canvas.height / 2 - 155
            ctx.beginPath();
            ctx.arc(x + 50, y + 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, x, y, 100, 100);

            const attachment = new MessageAttachment(canvas.toBuffer(), "boost.png");

            const Thankyou = new MessageEmbed()
            .setColor("#FF69B4")
            .setAuthor({ name: `${newMember.user.username}`, iconURL: newMember.displayAvatarURL() })
            .setDescription(
                `Hey guys, ${newMember} just boosted the server!\n`+
                `Thank you for boosting **${guild.name}** server! Your support is much appreciated.`
            )
            .setImage(`attachment://boost.png`)

            guild.systemChannel.send({embeds: [Thankyou], files: [attachment]}).catch((err) => console.log(err));
        }
    }
}