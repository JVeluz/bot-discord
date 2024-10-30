const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, InteractionCollector } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Ajouter des rôles.'),
	async execute(interaction) {
        const roles = interaction.guild.roles.cache.filter(role => role.name.includes("player")).map(role => role.name);
        if (roles.length === 0) {
            await interaction.reply('Aucun rôle disponible.');
            return;
        }

        const select = new StringSelectMenuBuilder()
            .setCustomId('role')
            .setPlaceholder('Sélectionnez un rôle')
            .addOptions(roles.map(role => new StringSelectMenuOptionBuilder().setLabel(role).setValue(role)))
            .setMinValues(0)
            .setMaxValues(roles.length);
        
        const row = new ActionRowBuilder().addComponents(select);

        const response = await interaction.reply({ content: 'Sélectionnez un ou plusieurs rôles.', components: [row], ephemeral: true });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 15000 });

        collector.on('collect', async i => {
            const member = interaction.guild.members.cache.get(interaction.user.id);
            for (const value of i.values) {
                const role = interaction.guild.roles.cache.find(role => role.name === value);
                if (role) {
                    if (member.roles.cache.has(role.id)) {
                        await member.roles.remove(role);
                    } else {
                        await member.roles.add(role);
                    }
                }
            }
            await i.editReply({ content: 'Rôles mis à jour.', components: [] });    
        });

        collector.on('end', async () => {
            await response.editReply({ content: 'Fin de la sélection.', components: [] });
        });
    },
};