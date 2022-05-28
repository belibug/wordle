#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";

// define variables
let finalWord = "00000";
let userFeed = "XXXXX";
let yellowChars = [];
let suggWord = "ADMIN";

// Sample words
const sampleWords = fs.readFileSync("./data/words", "utf-8");
// converting everytihg to array and capital letters
let curList = sampleWords.split(/\r?\n/).map((w) => w.toUpperCase());

suggWord = curList[Math.floor(Math.random() * curList.length)];

// function to update finalWord and YellowChars
function afterUserFeed(userFeed, suggWord) {
  userFeed.split("").map((c, i) => {
    // console.log("working on : ", c);
    switch (c) {
      case "X":
        // console.log(suggWord[i], ": Ignoring");
        break;
      case "Y":
        // console.log(suggWord[i], ": Yellow word");
        yellowChars.push(suggWord[i] + i);
        break;
      case "G":
        // console.log(suggWord[i], ": Green word");
        finalWord = finalWord.split("");
        finalWord[i] = suggWord[i];
        finalWord = finalWord.join("");
        // finalWord[i] = c;
        break;
      default:
        break;
    }
  });
}

// function to filter based on finalWord and yellowChars
function iterateFilter(yellowChars, finalWord, curList) {
  let filtList = curList;
  console.log("list before filter", filtList.length);
  // filter for Green words
  finalWord.split("").map((c, i) => {
    if (c !== "0") {
      filtList = filtList.filter((word) => word[i] == finalWord[i]);
    } else {
      null;
    }
  });

  // yellowChars.map((yc) => {
  //   filtList = filtList.filter((word) => {
  //     let sli =
  //       word.slice(0, parseInt(yc[1])) + word.slice(parseInt(yc[1] + 1));
  //     console.log(word, yc, sli);
  //     return (
  //       word.slice(0, parseInt(yc[1])) + word.slice(parseInt(yc[1] + 1))
  //     ).includes(yc[0]);
  //   });
  // });

  yellowChars.map((yc) => {
    filtList = filtList.filter((word) => {
      for (let i = 0; i < 5; i++) {
        word[i] == yc[0] && i != parseInt(yc[1]) ? true : false;
      }
    });
  });

  // yellowChars.split("").map((c) => {
  //   filtList = filtList.filter((word) => word.includes(c));
  // });
  console.log("list after filter", filtList.length);
  console.log(filtList);
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

console.log(`
${chalk.red("Wordle Solver: ")}
Lets start with ${suggWord}

`);

let game_res = await guessResults();
let x = 1;
while (game_res.game != "GGGGG") {
  console.log(chalk.blue(`Suggested word : ${suggWord}`));
  afterUserFeed(game_res.game, suggWord);
  console.log(
    chalk.blue(
      `Yellow Chars : ${yellowChars.join(";")}\nFinal Word: ${finalWord}`
    ),
    chalk.cyan("\n------------------------------------------------------")
  );

  curList = iterateFilter(yellowChars, finalWord, curList);
  curList = curList.filter((w) => w != suggWord);

  // TODO: Should remove the previous suggWord item
  suggWord = curList[Math.floor(Math.random() * curList.length)];

  console.log(
    chalk.yellow("Try"),
    chalk.red(suggWord),
    chalk.yellow("as your next guess")
  );
  console.log("Guess count: ", x);
  game_res = await guessResults();
  x++;
}
console.log(chalk.green(`\nGame Solved : ${suggWord}\n`));
