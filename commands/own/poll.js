const { SlashCommandBuilder, PollLayoutType } = require('discord.js');

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
			option.setName('answers')
				.setDescription('Les réponses possibles, séparées par des virgules.')
				.setRequired(true)
		)
        .addBooleanOption(option => 
            option.setName("is_multi_select")
                .setDescription("Question à choix multiple ?")
        )
        .addStringOption(option => 
			option.setName('duration')
				.setDescription('Durée du sondage en heure')
		),
	async execute(interaction) {
		const question = interaction.options.getString('question');
        const answers = interaction.options.getString('answers').split(',');
		const duration = interaction.options.getString('duration') | 1;
		const is_multi_select = interaction.options.getBoolean("is_multi_select") | false;
		const numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
        const poll = {
            question: { text: question },
            answers: answers.map((a, i) => { return {text: a, emoji: numbers[i]} }),
            allowMultiselect: is_multi_select,
            duration: duration,
            layoutType: PollLayoutType.Default,
        }
        await interaction.reply({poll});
    },
};