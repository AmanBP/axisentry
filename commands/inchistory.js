const db = require('./../db/index');
const Discord = require("discord.js");

module.exports = {
	name: 'inchistory',
	description: 'Gets a list of systems under incursion on a specified date',
    format: '"YYYY-MM-DD"',
	permlvl: 0,
	restricted: false,
	execute(message, args) {
		try {
			db.getIncursionsByDate(args[0]).then((res) => {
				if (res.length == 0) {
					return message.channel.send(`No incursions found on ${args[0]} 🙁`);
				}
				const returnEmbed = new Discord.MessageEmbed()
                .setColor('#FF7100')
				.setAuthor('The Anti-Xeno Initiative', "https://cdn.discordapp.com/attachments/860453324959645726/865330887213842482/AXI_Insignia_Hypen_512.png")
				.setTitle("**Incursion History**")
				.setDescription(`Found **${res.length}** incursions for the week of "${args[0]}"`)
                for (let i = 0; i < res.length; i++) {
                    returnEmbed.addField(`Incursion #${i+1}`,res[i]);
                }
				message.channel.send(returnEmbed.setTimestamp())
			})
		} catch {
			message.channel.send("Something went wrong, please ensure the date format is correct 'YYYY-MM-DD'")
		}
	},
};