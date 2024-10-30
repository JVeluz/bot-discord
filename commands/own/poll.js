const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Créer un sondage.')
		.addStringOption(option => 
			option.setName('question')
				.setDescription('La question du sondage.')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('réponses')
				.setDescription('Les réponses possibles, séparées par des virgules.')
				.setRequired(true)
		),
	async execute(interaction) {
		const question = interaction.options.getString('question');
		const answers = interaction.options.getString('réponses').split(',');
		if (answers.length < 2) {
			await interaction.reply('Il doit y avoir au moins deux réponses pour le sondage.');
			return;
		}
		if (answers.length > 10) {
			await interaction.reply('Il ne peut pas y avoir plus de 10 réponses pour le sondage.');
			return;
		}
		
		const numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
		
		const embed = new EmbedBuilder()
			.setTitle(question)
			.setColor('#7289da')
			.addFields({
				name: 'Réponses',
				value: answers.map((answer, i) => `${numbers[i]} ${answer}`).join('\n')
			})
		const message = await interaction.reply({ embeds: [embed], fetchReply: true });
		for (let i = 0; i < answers.length; i++) {
			await message.react(numbers[i]);
		}
	},
};