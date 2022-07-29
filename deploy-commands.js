const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

//* Delete commands *//
// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(clientId, 'commandId'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);

//** Add commands **//

// Create array of server commands 
const commands = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//Import each command and push it to our commands array as json
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Pass in array of commands to a put request
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

// To delete all commands, pass in an empty array
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);