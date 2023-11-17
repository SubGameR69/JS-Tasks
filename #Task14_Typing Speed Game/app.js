/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];


// set the level
const lvls = {
  "Easy" : 6,
  "Normal" : 4,
  "Hard" : 2
}

// default level
let defaultLevel = "Normal"; // change level from here
let defLvlSeconds = lvls[defaultLevel];

// catch selectors
let startBtn = document.querySelector(".start");
let lvlName = document.querySelector(".message .lvl");
let lvlSeconds = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let totalScore = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// setting the level
lvlName.innerHTML = defaultLevel;
lvlSeconds.innerHTML = defLvlSeconds;
timeLeft.innerHTML = defLvlSeconds;
totalScore.innerHTML = words.length;

// Disable the paste event
input.onpaste = function() {
  return false;
}

// Start Game
startBtn.onclick = function () {
  this.remove();
  input.focus();
  // generate word
  generateWord();
} 

function generateWord() {
  // get random word from words
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIdx = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIdx, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // clear the upcoming words
  upcomingWords.innerHTML = "";
  // generate words
  for (let i = 0; i < words.length; i++) {
    // create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }

  // call start play function
  startPlay();
}

function startPlay() {
  timeLeft.innerHTML = defLvlSeconds;
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      // stop timer
      clearInterval(start);
      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
        // clear the input field
        input.value = "";
        // increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // call generate function
          generateWord();
        }else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("Congratulations!");
          span.appendChild(spanTxt);
          finishMessage.appendChild(span);
        }
      }else{
        let span = document.createElement("span");
        span.classList = "bad";
        let spanTxt = document.createTextNode("Game Over!");
        span.appendChild(spanTxt);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
