#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

console.log(`
${chalk.red("Wordle Solver: ")}
Lets start with FLIRT
`);

async function guessResults() {
  const game_resp = await inquirer.prompt([
    {
      name: "game",
      type: "input",
      message: "Enter your response to last guess :",
    },
  ]);
  return game_resp;
}

let game_res = await guessResults();
let x = 1;
while (game_res.game != "GGGGG") {
  console.log(
    chalk.yellow("Try"),
    chalk.red("CLOUD"),
    chalk.yellow("as your next guess")
  );
  console.log("Guess count: ", x);
  game_res = await guessResults();
  x++;
}
console.log(chalk.green("\nGameCompleted\n"));
