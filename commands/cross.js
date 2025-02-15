const Discord = require("discord.js");
const { cleanString } = require("../discord/cleanString");
const { getRoleID } = require("../discord/getRoleID");
module.exports = {
	name: 'cross',
	description: 'How many people with rank1 also have rank2?',
    format: '"role1" "role2"',
	permlvl: 0,
	restricted: false,
	execute(message, args) {
		try {
			count = 0
			const returnEmbed = new Discord.MessageEmbed()
			.setColor('#FF7100')
            .setAuthor('The Anti-Xeno Initiative', "https://cdn.discordapp.com/attachments/860453324959645726/865330887213842482/AXI_Insignia_Hypen_512.png")
            .setTitle("**Count**")
			roles = {}
			roles_name = {}
			var role1 = args[0].toLowerCase().replace(/["'”`‛′’‘]/g,"").trim()
			var role2 = args[1].toLowerCase().replace(/["'”`‛′’‘]/g,"").trim()
			let actualrole1 = ""
			let actualrole2 = ""
			let memberwithrole1 = null
			try
			{
				roleID = getRoleID(message,role1)
				memberwithrole1 = message.guild.roles.cache.get(roleID).members
				actualrole1 = cleanString(message.guild.roles.cache.find(role => role.id == roleID).name)
			}
			catch(TypeError)
			{
				throw("Role 1 may have errors, please check and retry.")
			}
			let memberwithrole2 = null
			try
			{
				roleID = getRoleID(message,role2)
				memberwithrole2 = message.guild.roles.cache.get(roleID).members
				actualrole2 = cleanString(message.guild.roles.cache.find(role => role.id == roleID).name)
			}
			catch(TypeError)
			{
				throw("Role 2 may have errors, please check and retry.")
			}
			let countrole1 = memberwithrole1.size
			let countrole2 = memberwithrole2.size
			memberwithrole1.map( m => {
				memberwithrole2.map( n =>{
					if(m.user.username == n.user.username)
					{
						count+=1
					}
				})
			})
			returnEmbed.addField("Members with rank " + actualrole1,"```" + countrole1 + "```",true)
			returnEmbed.addField("Members with rank " + actualrole2,"```" + countrole2 + "```",true)
			returnEmbed.addField("Members with rank " + actualrole1 + " having rank " + actualrole2, "```" + count + "```")
			message.channel.send(returnEmbed.setTimestamp());
		} catch(err) {
			message.channel.send(`ERROR! Something went wrong:\n${err}`)
		}
	},
};