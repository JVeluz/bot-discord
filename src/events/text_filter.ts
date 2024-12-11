import { Events, Message } from "discord.js";
import { setTimeout } from "node:timers/promises";
import { to_text_filter_channels } from "../../config.json";

const allowed_links = "^((https:\/\/)|(www\.))";

export = {
        name: Events.MessageCreate,
        async execute(message: Message) {
                if (!to_text_filter_channels.includes(message.channelId)) return;
                if (message.author.bot) return;
                if (message.mentions.repliedUser) return;
                if (message.content.match(allowed_links)) return;
                if (message.attachments.size !== 0) return;
                
                const reply = await message.reply({ content: "Répondre au message ou créer un fil pour parler ici" });
                await setTimeout(4000);
                await message.delete();
                await reply.delete();
        },
};