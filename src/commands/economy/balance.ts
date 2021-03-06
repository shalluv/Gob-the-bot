import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { getAccount } from "../../helpers/accountManager";
import { randomColor } from "../../helpers/randomColor";
import { warningEmbed } from "../../helpers/warningHandler";
import { PlayerInt } from "../../models/playerModel";

const data = new SlashCommandBuilder()
  .setName("balance")
  .setDescription("Check your balance!")
  .addUserOption((options) => options.setName("user").setDescription("The user to check the balance of."));

async function run(interaction: CommandInteraction): Promise<void> {
  const user = interaction.options?.getUser("user") || interaction.user;
  if (user.bot) {
    interaction.reply(
      warningEmbed({
        title: "Bot accounts cannot have balances!",
        description: "Please use a non-bot account.",
      }),
    );
    return;
  }

  getAccount(user.id)
    .then((player: PlayerInt) =>
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`💰 Balance of ${user.username} 💰`)
            .setColor(randomColor())
            .setDescription(`**💵 : ${player.balance.toLocaleString()}**`),
        ],
      }),
    )
    .catch((err?: string) => {
      interaction.reply(warningEmbed({ title: "ERROR", description: err }));
    });
}

export default {
  data,
  run,
};
