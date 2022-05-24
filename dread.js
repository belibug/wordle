import chalk from "chalk";
import fs from "fs";

// define variables
let finalWord = "00000";
let userFeed = "XXXXX";
let yellowChars = "";
let suggWord = "ADMIN";

console.log(chalk.red("lets read Data"));

// Sample words
const sampleWords = fs.readFileSync("./data/sample_words", "utf-8");
// converting everytihg to array and capital letters
let curList = sampleWords.split(/\r?\n/).map((w) => w.toUpperCase());
// console.log(curList[2]);

// let newList = curList.filter((word) => word[0] == "S");
// console.log(newList);

function filterList(finalWord) {
  let newList = curList;
  for (let i = 0; i < 5; i++) {
    finalWord[i] !== "0"
      ? (newList = newList.filter((word) => word[i] == finalWord[i]))
      : null;
  }
  return newList;
}
// console.log(filterList("A000E"));

function afterUserFeed(userFeed, suggWord) {
  userFeed.split("").map((c, i) => {
    // console.log("working on : ", c);
    switch (c) {
      case "X":
        console.log(suggWord[i], ": Ignoring");
        break;
      case "Y":
        console.log(suggWord[i], ": Yellow word");
        yellowChars += suggWord[i];
        break;
      case "G":
        console.log(suggWord[i], ": Green word");
        finalWord = finalWord.split("");
        finalWord[i] = suggWord[i];
        finalWord = finalWord.join("");
        // finalWord[i] = c;
        break;
    }
  });
}
// console.log(yellowChars, finalWord);
console.log(chalk.blue(`Suggested word : ${suggWord}`));
afterUserFeed("GXXYG", suggWord);
console.log(
  chalk.blue(`Yellow Chars : ${yellowChars}\nFinal Word: ${finalWord}`),
  chalk.cyan("\n------------------------------------------------------")
);

// console.table(curList);
// function to filter bases on finalWord and yellowChars
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
  console.log("list after filter", filtList);
  return filtList;
}
curList = iterateFilter(yellowChars, finalWord, curList);
console.table(curList);
