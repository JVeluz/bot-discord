import { Events, Message } from "discord.js";
import { setTimeout } from "node:timers/promises";

const channel_to_filter = [
        "1301974289016295577"
]

export = {
        name: Events.MessageCreate,
        async execute(message: Message) {
                if (message.author.bot) return;
                if (channel_to_filter.includes(message.channelId)) {
                        await setTimeout(600_000);
                        await message.delete();                   
                }
        },
};
