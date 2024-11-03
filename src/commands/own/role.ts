import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("Ajouter des rôles"),
    async execute(interaction: ChatInputCommandInteraction) {
        
    }
};