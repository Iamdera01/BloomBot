"◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[  ⒸBloomBot (md) by Magneum™  ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎";
//  ╔⧉༻ ⒸBloomBot (multi-device) by Magneum™
//  ║>>  is a whatsapp user-bot with automation, moderation, music, games and more of 200+ commands!
//  ║
//  ║
//  ║⦁> 🌟 A versatile whatsApp multi-purpose bot designed for group management and user convenience.
//  ║⦁> 🚀 Simplifies group management tasks and enhances the overall user experience.
//  ║⦁> ⚠️ Please note: Engaging in spamming activities may lead to account suspension. Use responsibly!
//  ║⦁> 🎉 BloomBot is intended for fun and convenience, but we're not responsible for account bans.
//  ║⦁> 🔀 forking the repository is allowed, but customized versions or modified plugins are unsupported.
//  ║⦁> ⚠️ Exercise caution and take responsibility for any modifications made to the bot.
//  ║⦁> 📞 Need assistance or have issues? Contact our developers.
//  ║⦁> 🔄 We'll continue providing updates and support for the original version of the bot.
//  ║⦁> 👉 Enjoy the features and functionality of BloomBot responsibly! Make the most out of your
//  ║    whatsApp group management experience! 🎉
//  ║
//  ║     🚨LEGAL NOTICE🚨
//  ║⦁>    ⒸBloomBot is in no way affiliated with, authorized, maintained,
//  ║⦁>    sponsored or endorsed by whatsApp or any of its affiliates or
//  ║⦁>    subsidiaries. This is an independent and unofficial software.
//  ║⦁>    Use at your own risk.
//  ║
//  ╚◎ 🐞 DEVELOPERS: +918436686758, +918250889325
"◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[  ⒸBloomBot (md) by Magneum™  ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎";
const fs = require("fs-extra");
const git = require("simple-git")();
const logger = require("@/log");
const { exec } = require("child_process");

const gitPull = async () => {
  try {
    logger.info("📢 Checking for updates...");
    await git.fetch();
    const newCommits = await git.log(["magneum..origin/magneum"]);
    if (newCommits.total) {
      logger.info("📢 New update pending, updating...");
      await git.pull("origin", "magneum");
      const update = await git.diffSummary(["--name-only"]);
      if (update.files.includes("package.json")) {
        logger.info(
          "📢 Changes in package.json detected, updating dependencies..."
        );
        await fs.emptyDir(__dirname);
        await new Promise((resolve, reject) => {
          const childProcess = exec("yarn install");
          childProcess.stderr.pipe(process.stderr);
          childProcess.stdout.pipe(process.stdout);
          childProcess.on("close", (code) => {
            if (code === 0) {
              logger.info("📢 Installed dependencies.");
              resolve();
            } else {
              logger.error("📢 Failed to install dependencies.");
              reject(new Error("Failed to install dependencies."));
            }
          });
        });
      } else {
        logger.info(
          "📢 No changes in package.json. Skipping dependency update."
        );
      }

      logger.info("📢 Updated the bot with latest changes.");
    } else {
      logger.info("📢 bot is already working on the latest version.");
    }
  } catch (error) {
    logger.error(`📢 Error occurred during update: ${error.message}`);
  }
};

module.exports = gitPull;
