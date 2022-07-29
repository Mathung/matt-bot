const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timestamp')
		.setDescription('Replies with the current local time.'),
	async execute(interaction) {
        const currentTimestamp = Math.round(new Date()/1000);
		await interaction.reply(`<t:${currentTimestamp}:f>`);
	},
};