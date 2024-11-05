import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("Ajouter des rôles"),
    async execute(interaction: ChatInputCommandInteraction) {
        
    }
};