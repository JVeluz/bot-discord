import { Events, Message } from "discord.js";
import { setTimeout } from "node:timers/promises";
import { to_text_filter_channels } from "../../config.json";

export = {
        name: Events.MessageCreate,
        async execute(message: Message) {
                if (!to_text_filter_channels.includes(message.channelId)) return;
                if (message.author.bot) return;
                const allowed_links = "^((https:\/\/)|(www\.))";
                if (message.content.match(allowed_links)) return;
                if (message.attachments.size !== 0) return;

                const reply = await message.reply({ content: "Seul les images et liens sont autorisés" });
                await setTimeout(5000);
                await message.delete();
                await reply.delete();
        },
};