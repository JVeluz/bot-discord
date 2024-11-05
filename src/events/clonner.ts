import { Events, VoiceState } from "discord.js";
import { to_clone_channels } from "../../config.json";

export = {
	name: Events.VoiceStateUpdate,
	async execute(oldState: VoiceState, newState: VoiceState) {
        let vocals = null;
        let main_channel = null;
        if (newState.channel) {
            vocals = newState.channel.parent?.children.cache.filter(s => s.isVoiceBased());
            main_channel = vocals?.find(s => to_clone_channels.includes(s.id));
        }
        if (!main_channel) {
            if (oldState.channel) {
                vocals = oldState.channel.parent?.children.cache.filter(s => s.isVoiceBased());
                main_channel = vocals?.find(s => to_clone_channels.includes(s.id));
            }
        }
        if (!vocals) return;
        if (!main_channel) return;
        
        const siblings = vocals.filter(s => s.name === main_channel.name);
        
        const used_size = siblings.filter(s => s.members.size > 0).size;
        const needed_size = used_size + 1;

        // console.log("");
        // console.log("used_size", used_size);
        // console.log("siblings.size", siblings.size);
        // console.log("needed_size", needed_size);
        
        if (siblings.size <= needed_size) {
            for (let i = siblings.size; i < needed_size; i++)
                await main_channel.clone();
        }
        else {
            let is_one_empty = false;
            siblings.each(async s => {
                if (s.members.size === 0) {
                    if (!is_one_empty) {
                        is_one_empty = true;
                        return;
                    }
                    if (to_clone_channels.includes(s.id)) return;
                    await s.delete();
                }
            });
        }
    }
};