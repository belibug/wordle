import chalk from "chalk";
import fs from "fs";

// define variables
let finalWord = "00000";
let userFeed = "XXXXX";
let yellowChars = "";
let suggWord = "STING";

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

function afterUserFeed(userFeed) {
  userFeed.split("").map((c, i) => {
    // console.log("working on : ", c);
    switch (c) {
      case "X":
        console.log("ignoring ", suggWord[i]);
        break;
      case "Y":
        console.log("yellow word ", suggWord[i]);
        yellowChars += suggWord[i];
        break;
      case "G":
        console.log("should add to final word ", suggWord[i]);
        finalWord = finalWord.split("");
        finalWord[i] = c;
        finalWord = finalWord.join("");
        // finalWord[i] = c;
        break;
    }
  });
}
// console.log(yellowChars, finalWord);
afterUserFeed("YYGGX");
console.log(`\nYellow Chars : ${yellowChars}\nFinal Word: ${finalWord}`);
