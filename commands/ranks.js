const Discord = require("discord.js");

module.exports = {
	name: 'ranks',
	description: 'Get rank statistics (Arguments: challenge, progression, other)',
    format: 'arguments',
	permlvl: 0,
	restricted: false,
	execute(message, args) {
        if (args == "challenge") {
            try {
                const returnEmbed = new Discord.MessageEmbed()
                .setColor('#FF7100')
                .setAuthor('The Anti-Xeno Initiative', "https://cdn.discordapp.com/attachments/860453324959645726/865330887213842482/AXI_Insignia_Hypen_512.png")
                .setTitle("**Challenge Ranks**")
                .setDescription(`Challenge Rank Statistics`)
                returnEmbed.addField("Caduceus' Glint", message.guild.roles.cache.get("810410422871785472").members.size, true)
                returnEmbed.addField("Ace", message.guild.roles.cache.get("650449319262158868").members.size, true)
                returnEmbed.addField("Astraea's Clarity", message.guild.roles.cache.get("868809340788834324").members.size, true)
                returnEmbed.addField("Snake Eater", message.guild.roles.cache.get("508638571565940736").members.size, true)
                returnEmbed.addField("Soaring Sleipnir", message.guild.roles.cache.get("603345251192537098").members.size, true)
                returnEmbed.addField("Annihilator", message.guild.roles.cache.get("528577192746287104").members.size, true)
                returnEmbed.addField("100% Club", message.guild.roles.cache.get("477645690630307841").members.size, true)
                returnEmbed.addField("Myrmidon", message.guild.roles.cache.get("810410728023916554").members.size, true)
                returnEmbed.addField("Vanguard", message.guild.roles.cache.get("642840616694317104").members.size, true)
                message.channel.send(returnEmbed.setTimestamp());
            } catch (err) {
                message.channel.send(`Something went wrong. Error: ${err}`);
            }
        } else if (args == "progression") {
            try {
                const returnEmbed = new Discord.MessageEmbed()
                .setColor('#FF7100')
                .setAuthor('The Anti-Xeno Initiative', "https://cdn.discordapp.com/attachments/860453324959645726/865330887213842482/AXI_Insignia_Hypen_512.png")
                .setTitle("**Progression Ranks**")
                .setDescription(`Progression Rank Statistics`)
                returnEmbed.addField("Herculean Conqueror", message.guild.roles.cache.get("484438141642604544").members.size, true)
                returnEmbed.addField("Herculean Warrior", message.guild.roles.cache.get("484438140996681741").members.size, true)
                returnEmbed.addField("Serpent's Nemesis", message.guild.roles.cache.get("421077339393228802").members.size, true)
                returnEmbed.addField("Ossified Dyad", message.guild.roles.cache.get("418809237091909642").members.size, true)
                returnEmbed.addField("Sole Survivor", message.guild.roles.cache.get("417408867257810944").members.size, true)
                returnEmbed.addField("Twain Talons", message.guild.roles.cache.get("417396449836531712").members.size, true)
                returnEmbed.addField("Apollo's Wrath", message.guild.roles.cache.get("380254463170183180").members.size, true)
                returnEmbed.addField("Cyclopean Duo", message.guild.roles.cache.get("642848276135280668").members.size, true)
                returnEmbed.addField("Quadrivial Vestige", message.guild.roles.cache.get("406986080953434115").members.size, true)
                returnEmbed.addField("Recruit", message.guild.roles.cache.get("380247760668065802").members.size, true)
                message.channel.send(returnEmbed.setTimestamp());
            } catch (err) {
                message.channel.send(`Something went wrong. Error: ${err}`);
            }
        } else if (args == "other") {
            try {
                const returnEmbed = new Discord.MessageEmbed()
                .setColor('#FF7100')
                .setAuthor('The Anti-Xeno Initiative', "https://cdn.discordapp.com/attachments/860453324959645726/865330887213842482/AXI_Insignia_Hypen_512.png")
                .setTitle("**Other Ranks**")
                .setDescription(`Other Rank Statistics`)
                returnEmbed.addField("Carrier Commander", message.guild.roles.cache.get("720206853350359121").members.size, true)
                returnEmbed.addField("Collector", message.guild.roles.cache.get("476049331405717504").members.size, true)
                returnEmbed.addField("Exterminator", message.guild.roles.cache.get("528577143844634644").members.size, true)
                returnEmbed.addField("Defender", message.guild.roles.cache.get("528576199639957504").members.size, true)
                returnEmbed.addField("Party Champion", message.guild.roles.cache.get("638111509569863690").members.size, true)
                returnEmbed.addField("Party Survivor", message.guild.roles.cache.get("417401084198387713").members.size, true)
                returnEmbed.addField("Abyss Walker", message.guild.roles.cache.get("513828375706599428").members.size, true)
                returnEmbed.addField("Lernaean Seeker", message.guild.roles.cache.get("484470882325233684").members.size, true)
                returnEmbed.addField("Jaeger", message.guild.roles.cache.get("638143561698639872").members.size, true)
                returnEmbed.addField("Chasm Rover", message.guild.roles.cache.get("558374870208086017").members.size, true)
                returnEmbed.addField("Xeno Unraveler", message.guild.roles.cache.get("537743539862503425").members.size, true)
                returnEmbed.addField("Callous Fringe", message.guild.roles.cache.get("427826781752524800").members.size, true)
                returnEmbed.addField("Avower", message.guild.roles.cache.get("439500275280117760").members.size, true)
                returnEmbed.addField("Old Guard", message.guild.roles.cache.get("427304200737783810").members.size, true)
                message.channel.send(returnEmbed.setTimestamp());
            } catch (err) {
                message.channel.send(`Something went wrong. Error: ${err}`);
            }
        } else {
            message.channel.send("Please include an argument: `-ranks challenge`, `-ranks progression` or `-ranks other`"); 
            return;
        }
	},
};