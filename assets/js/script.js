// Set Limited Variales
let hsDiv = document.querySelector("#scores");
let masterTimerEl = document.querySelector("#masterTimer");
let divEl = document.querySelector("#gameWindow");
let timerRemain = document.querySelector("#timeRem");
// Set Global Variables
var questions = false;
var score = 0;
var trivia = {};
var timeElapsed = 0;
var quizTime;
var questionTurn;
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
  directions.textContent = "You'll have 60 seconds to finish the Quiz! Your points will be based on time remaining on the clock. Wrong answers are penalized by reducing 10 seconds of your time remaining."; 

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

// Push questions into #Details Div / Define Time
function setUpQuestions(arr) {if (questions) {console.log("<questionSetup>");}

  let arrayQuest = [];

  for (let i=0; i<arr.length; i++) {
    arrayQuest.push(arr[i]);
  }
  return arrayQuest;
}

function presentQuestion() {if (questions) {console.log("<currentQuestion>");}

questionSecElapsed = 0;


  if ( trivia.length === 0 ) {
    endOfGame();
    return;
  }
quizQuestion = trivia.pop();

  clearDetails();
   
// Set Question Elemnet Attributes 
let question = document.createElement("h1");

  question.setAttribute("question", quizQuestion.title);
  question.textContent = quizQuestion.title;
  divEl.appendChild(question);

let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  divEl.appendChild(choiceBox);

  for( let i=0; i<quizQuestion.questions.length; i++ ) {

let listChoice = document.createElement("li");

    listChoice.setAttribute("choice-value", quizQuestion.questions[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = quizQuestion.questions[i];

    choiceBox.appendChild(listChoice);
  }

  if (questions) { console.log("quiz", quizQuestion);}


  choiceBox.addEventListener("click", function (){
    scoreAnswer(quizQuestion);
  });

}
// Comnsole Log Sentences
function scoreAnswer(quiz) {if (questions) { console.log("<scoreAnswer>");}

var e = event.target;
  if ( e.matches("li")) {let selectedItem = e.textContent;

  if (questions) { console.log("JavaScript Quiz " + selectedItem); }

  if ( selectedItem === quiz.answer ) {

      score += questionDuration - questionSecElapsed;

    } else {
  if (questions) { console.log("Incorrect Answer ");}

      triviaLength -= 10;
    }
  if (questions) { console.log("selected ",selectedItem);}
    showAnswers(quiz);

  }
}


function showAnswers(quiz) {if (questions) { console.log("<showAnswer>"); }

  if (questions) { console.log("Questions & Answers ",quiz);}
  if (questions) { console.log("selected ",selectedItem);}


  for (let i=0; i<quiz.questions.length; i++) {
  if (questions) { console.log("In for a ",i);}

let questid = "#questionNum-" + i;

let questrow = document.querySelector(questid);


// Display 'Green" for Correct Answers
    if (questions) { console.log("<selected>" + selectedItem + "<");}
    if (questions) { console.log("<color questions>" +  quiz.questions[i] +"<");}

    if ( quiz.questions[i] !== quiz.answer ) {
   
    } else {
    if (questions) { console.log("color questions true");}
      questrow.setAttribute("style","background-color: green");
    }
  }

  setTimeout(presentQuestion,500);
}


function setGameTime() {
  if (questions) { console.log("<setGameTime>"); }
  if (questions) { console.log("triviaLength" + triviaLength); }
  clearInterval(quizTime);

}


function renderTime() {

  masterTimerEl.textContent = triviaLength - timeElapsed;
 
  if ( (triviaLength - timeElapsed) < 1 ) {endOfGame();}
}

function startGameTimer () {if (questions) { console.log("<startGameTimer>"); }
  setGameTime();

  quizTime = setInterval(function() {timeElapsed++; 
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {if (questions) { console.log("<stopTime>");}

  clearInterval(quizTime);
}

//Score Calculation
function endOfGame() {if (questions) { console.log("<endOfGame>"); }
  stopTime();
  clearDetails();

  timerRemain.setAttribute("style", "visibility: hidden;");

  let title = document.createElement("p");
  title.setAttribute("id", "main-title");
  title.textContent = "Game Over! Click 'Play Again' for another shot!";


  let directions = document.createElement("p");
  directions.setAttribute("id", "directions");
  directions.textContent = " Your score is " + score; 


  let tryAgain = document.createElement("button");
  tryAgain.setAttribute("id", "tryAgain");
  tryAgain.setAttribute("class", "btn btn-secondary");
  tryAgain.textContent = "Play again";

// Highscore Input
  let bra = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("size","10");
  initialsInput.setAttribute("border-color", "black");

 



  divEl.appendChild(title);
  divEl.appendChild(directions);
  divEl.appendChild(initialsLabel);
  divEl.appendChild(initialsInput);
  divEl.appendChild(bra);
  divEl.appendChild(tryAgain);

  tryAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function() {initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 


  let thisScore = [ { name: initialsInput.value, score: score } ]; 

// Access Local Storage for Highscores
  let storedScores = JSON.parse(localStorage.getItem("highScores")); 
      if (questions) { console.log("storedScore",storedScores); }

      if (storedScores !== null) { 
        storedScores.push(thisScore[0]); 
      } else {
        storedScores = thisScore;
      }

  localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {stopTime();
  clearDetails();

  timerRemain.setAttribute("style", "visibility: hidden;");
// Display Ranked Highscores from Local Storage
let storedScores = JSON.parse(localStorage.getItem("highScores")); 
let title = document.createElement("h2");
  title.setAttribute("id", "main-title");
  title.textContent = "Top 10 Highscores";

  divEl.appendChild(title);


  if ( storedScores !== null ) {storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);

let scoreDisplay = 10;
  if ( storedScores.length < 10 ) {scoreDisplay = storedScores.length; 
    }

for (var i = 0; i < scoreDisplay; i++) {var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score;
      divEl.appendChild(p);
    }
  } else {var p = document.createElement("p");

    p.textContent =  "Enter Your Three Initials";
    divEl.appendChild(p);
  }
// Try Again Link To Restart Game
let tryAgain = document.createElement("button");
  tryAgain.setAttribute("id", "tryAgain");
  tryAgain.setAttribute("class", "btn btn-secondary");
  tryAgain.textContent = "Play!";

  divEl.appendChild(tryAgain);

  tryAgain.addEventListener("click", init);
}

hsDiv.addEventListener("click", highScores);