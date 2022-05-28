#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";

// Sample words
const sampleWords = fs.readFileSync("./data/words", "utf-8");
// converting everytihg to array and capital letters
let curList = sampleWords.split(/\r?\n/).map((w) => w.toUpperCase());

// function to suggest best word
function suggestWord(listLib) {
  return listLib[Math.floor(Math.random() * curList.length)];
}

// function to filter after user feedback
function filterLib(userFeed, lastWord, curList) {
  let filtList = curList;
  for (let i = 0; i < 5; i++) {
    if (userFeed[i].toUpperCase() == "G") {
      filtList = filtList.filter((word) => word[i] == lastWord[i]);
    } else if (userFeed[i].toUpperCase() == "Y") {
      filtList = filtList.filter((word) => {
        return word.includes(lastWord[i]) && word[i] != lastWord[i];
      });
      // Y logic
    } else {
      //nothing worked
    }
  }
  return filtList;
}

// function to provide prompt
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

// Game logic
let suggWord = suggestWord(curList);

console.log(`
${chalk.red("Wordle Solver: ")}
Lets start with ${suggWord}
`);

let game_res = await guessResults();
let x = 1;

while (game_res.game.toUpperCase() != "GGGGG") {
  //   afterUserFeed(game_res.game, suggWord);
  var beforeFilterCount = curList.length;
  curList = filterLib(game_res.game, suggWord, curList);
  // remove last suggest word
  curList = curList.filter((w) => w != suggWord);
  console.log(
    `${x} : Reduced from ${beforeFilterCount} to ${curList.length}\n`
  );
  if (curList.length == 0) {
    console.log(
      chalk.red(
        `\nFailed to guess answer\nMake sure you entered feedback properly`
      )
    );
    break;
  }

  suggWord = suggestWord(curList);
  if (curList.length == 1) {
    console.log(chalk.green(`\nOnly possible Answer is ${suggWord}\n`));
    break;
  }

  console.log(
    chalk.yellow("Try"),
    chalk.red(suggWord),
    chalk.yellow("as your next guess")
  );
  //   console.log("Guess count: ", x);
  game_res = await guessResults();
  x++;
}
if (game_res.game.toUpperCase() == "GGGGG") {
  console.log(chalk.green(`\nGame Solved : ${suggWord}\n`));
}
