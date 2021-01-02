# Java Script Trivia
>  This application allows the user to complete a timed quiz based on JavaScript trivia questions. Your highscore is based on your remaining time after you've finished answering all of your queations. But be careful, for every question you answer incorrectly, you'll be deducted 10 seconds of your remaining time!  

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshot)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info
Fourth weekly assignment due on Sunday January 10, 2021 @ 11:59 PM.
## Screenshot
![Homepage Screenshot](https://alovatt83.github.io/bootcamp-trivia/assets/images/screenshot.png)

## Technologies
* HTML
* CSS
* JavaScript


## Setup
Clone files into your own root directory, file extensions are relative and will operate normally.

## Code Examples
Show examples of usage:

HTML:


 <body>
  <nav class="navbar navbar-expand-md fixed-top">
    <div class="container">

      <h1 id="navbar-title">Module 4: JavaScript Trivia!</h1>
      <div id="timeRem">
        <div>Time Remaining:</div><div><span id="masterTimer" class="nav"></span> </div>
      </div>

  </nav>

  <div class="container">
   <section id="gameWindow"> </section>
  </div>
  <nav class="navbar fixed footer">
    <div class="footer-text">&copy ADL Software Solutions</div>
    </br>
    <div id="scores" class="nav nav-secondary">View High Scores</div>
  </nav>
  <script src='./assets/js/script.js'></script>
</body>

CSS:

.nav-secondary {
  text-decoration: none;
  text-align: center;

}

#gameWindow {
  background-color: lightgrey;  
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 40px;
  text-align: center;
} 

li {
  height: 20px;
  margin-top: 8px;
  margin-bottom: 5px;
  padding: 8px;
  background-color: #1519f3;
  color: #fff;
  font-size: 14px;
  line-height: 1;
  list-style-type: none;
  border-right: none;
  cursor: pointer;
}

.timeRem {
  font-weight: 900;
  text-align: left;
}

.footer {
  background-color: rgb(0, 0, 0);
  height: 70%;
  border-top: solid;
  border-top-color: #1519f3;  
  border-top-width: 70px;
 
}

.footer-text {
  width: 100%;
  text-align: center;
  font-size: 30px;
  color:rgb(255, 255, 255);
  font-weight: 900;
}

JavaScript:

var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUZWXYZ";
var numbers = "0123456789";
var special = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
var passwordReturn = document.querySelector ("#password");
var generator = document.querySelector ("#generate");

var selectedItem;
var triviaLength = 90;

init();


function init() {clearDetails();

reset();
// Assigns Button Functions and Attributes
let title = document.createElement("p");
  title.setAttribute("id", "main-title");
  title.textContent = "JavaScript Quiz : Timed";

let directions = document.createElement("p");
  directions.setAttribute("id", "directions");
  directions.textContent = "You'll have 90 seconds to finish the Quiz! Your points will be based on time remaining on the clock. Wrong answers are penalized by reducing 10 seconds of your time remaining."; 

let beginTrivia = document.createElement("button");
  beginTrivia.setAttribute("id", "beginTrivia");
  beginTrivia.setAttribute("class", "btn btn-secondary");
  beginTrivia.textContent= "Start Javascript Quiz";

  divEl.appendChild(title);
  divEl.appendChild(directions);
  divEl.appendChild(beginTrivia);
 

  beginTrivia.addEventListener("click", function () {
  
    playQuiz(triviaQuestions);
  });
}

//Assign Content to #Details DIV
function clearDetails() {divEl.innerHTML = "";
}

function reset() {
  score = 0;
  triviaLength = 90;
  timeElapsed = 0;


  questionDuration = 15;
  questionSecElapsed = 0;

}

// Trivia Quiz Question Selections & Answers
var triviaQuestions = [
  {
    title: "Inside which HTML element do we put the JavaScript?:",
    questions: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: "<script>"
  },
  {
    title: "Where is the correct place to insert a JavaScript?:",
    questions: ["The <body> section", "The <head> section", "Both <head> and <body>", "The <link> section"],
    answer: "Both <head> and <body>"
  },
  {
    title: "How does a WHILE loop start?:",
    questions: ["while (i <= 10; i++)", "while (i <= 10)", "while i = 1 to 10", "While I wait for my supper."],
    answer: "while (i <= 10)"
  },
  {
    title: "How do you create a function in JavaScript?:",
    questions: ["function = myFunction()", "function:myFunction()", "function myFunction()", "call me maybe"],
    answer: "function myFunction()"
  },
  {
    title: "The external JavaScript file must contain the <script> tag:",
    questions: ["True", "False"],
    answer: "False"
  },
  {
    title: "What will the following code return: Boolean(10 > 9):",
    questions: ["True", "False"],
    answer: "True"
  }
];


// Start Quiz and Begin Session Timer
function playQuiz(questionSet) {
  if (questions) { console.log("<playQuiz>"); }

  
  trivia = setUpQuestions(questionSet);


  timerRemain.setAttribute("style", "visibility: visible;");


  triviaLength = trivia.length * 10 + 30;
  if (questions) { console.log("<duration>:",triviaLength,questionDuration); }

  startGameTimer();
  renderTime();

presentQuestion();
}

## Features
List of features
* Trivia initialized by pressing customized button.
* Timer begings upon initialization.
* Correct answer is presented once an answer is selected.
* User is automatically presented the next questions until the quiz is completed.
* User is deducted 10 seconds from their remaining time for each incorrect answer.
* User can enter their initials for their highscores to be saved on local storage.

To-do list:
* Project completed

## Status
Project is: completed. Assignment ready for submission.

## Contact
Created by Allen Lovatt - allenlovatt@gmail.com
