const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timestamp')
		.setDescription('Replies with the current local time.')
		.addStringOption(option => 
			option.setName('type')
				.setDescription('Type of timestamp')
				.setRequired(false)
				.addChoices(
					{ name: 'Local', value: 'f' },
					{ name: 'Reference', value: 'R' },
				)
		)
		.addStringOption(option => 
			option.setName('date')
			.setDescription('DD/MM/YYYY')
			.setRequired(false)
		)
		.addStringOption(option =>
			option.setName('time')
				.setDescription('HH:MM')
				.setRequired(false)
		)
		.addStringOption(option =>
			option.setName('format')
				.setDescription('Format date provided. Default is UTC. (UTC, EST, PST, GMT+ etc)')
				.setRequired(false)
		),
	async execute(interaction) {
		const currentDate = new Date();
		const type = interaction.options.getString('type') || 'f';
		const date = interaction.options.getString('date') || `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
		const time = interaction.options.getString('time') || `${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}`;
		const dateFormat = interaction.options.getString('format') || 'UTC';

		const requestedDate = new Date(`${date} ${time} ${dateFormat}`);

        const currentTimestamp = Math.round(requestedDate/1000);
		await interaction.reply(`<t:${currentTimestamp}:${type}>`);

		console.log(type, date, time)
	},
};