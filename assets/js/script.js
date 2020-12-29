// Set Limited Variales
let hsDiv = document.querySelector("#highscore");
let masterTimerEl = document.querySelector("#gameTimer");
let divEl = document.querySelector("#details");
let timerRemain = document.querySelector("#timers");
// Set Global Variables
var questions = false;
var score = 0;
var trivia = {};
var trivialength = 0;
var timeElapsed = 0;
var quizTime;
var questionTurn;

init();


function init() {clearDetails();
reset();
// Assigns Button Functions and Attributes
  let title = document.createElement("p");
  title.setAttribute("id", "main-title");
  title.textContent = "JavaScript Quiz : Timed";

  let directions = document.createElement("p");
  directions.setAttribute("id", "directions");
  directions.textContent = "You'll have 90 seconds to finish the Quiz! You points will be based on time remaining on the clock. Wrong answers are penalized by reducing your time remaining."; 

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
  triviaLength = 0;
  timeElapsed = 0;
  quizTime;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionTurn;
}

// Trivia Quiz Question Selections & Answers
var triviaQuestions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Is JavaScript fun to work with?",
    choices: ["No", "Sometimes", "What is Javascript", "Not just yes, but HELL YES!"],
    answer: "Not just yes, but HELL YES!"
  },
  {
    title: "DOM is an abreviation for ____",
    choices: ["Data Object Mode", "Dumb Old Man", "Document Object Model", "Dutle Opo Mipsy"],
    answer: "Document Object Model"
  },
  {
    title: "JavaScript is Textile Mark Up (TML) version of Java?",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    title: "JavaScript is strongly typed language",
    choices: ["True", "False"],
    answer: "False"
  }
];


// Start Quiz and Begin Session Timer
function playQuiz(questionSet) {
  if (questions) { console.log("--- playQuiz ---"); }

  
  trivia = setUpQuestions(questionSet);


  timerRemain.setAttribute("style", "visibility: visible;");


  triviaLength = trivia.length * 15;
  if (questions) { console.log("<<duration g,q>>:",triviaLength,questionDuration); }

  startGameTimer();
  renderTime();

presentQuestion();
}

//Push questions into #Details Div
function setUpQuestions(arr) {
  if (questions) {console.log("<<setUpQuestions>>");}

  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

function presentQuestion() {
  if (questions) {console.log("<<presentQuestion>>");}


  questionSecElapsed = 0;


  if ( trivia.length === 0 ) {
    endOfGame();
    return;
  }


  curQuestion = trivia.pop();


  clearDetails();
   

  let question = document.createElement("h1");

  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  divEl.appendChild(question)


  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  divEl.appendChild(choiceBox);

  for( let i=0; i<curQuestion.choices.length; i++ ) {

    let listChoice = document.createElement("li");

    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = curQuestion.choices[i];

    choiceBox.appendChild(listChoice)
  }

  if (questions) { console.log("cur", curQuestion);}


  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });

}

function scoreAnswer(cur) {
  if (questions) { console.log("--- scoreAnswer ---");}

  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;

    if (questions) { console.log("selectedItem quiz " + selectedItem); }

    if ( selectedItem === cur.answer ) {

      score += questionDuration - questionSecElapsed;

    } else {
      if (questions) { console.log("Incorrect Answer");}

      triviaLength -= 10;
    }
  if (questions) { console.log("sselected ",selectedItem);}
    showAnswers(cur);

  }
}


function showAnswers(cur) {
  if (questions) { console.log("--- showAnswer ---"); }

  if (questions) { console.log("sa qanda",cur);}
  if (questions) { console.log("sselected ",selectedItem);}


  for (let i=0; i<cur.choices.length; i++) {
    if (questions) { console.log("sa in for ",i);}

    let questid = "#questionNum-" + i;

    let questrow = document.querySelector(questid);



    if (questions) { console.log("saf selected" + selectedItem + "<");}
    if (questions) { console.log("saf color questions >" +  cur.choices[i] +"<");}

    if ( cur.choices[i] !== cur.answer ) {
      if (questions) { console.log("color questions flase");}
      questrow.setAttribute("style","background-color: red");
    } else {
      if (questions) { console.log("color questions true");}
      questrow.setAttribute("style","background-color: green");
    }
  }

  setTimeout(presentQuestion,500);
}


function setGameTime() {
  if (questions) { console.log("--- setGameTime ---"); }
  if (questions) { console.log("triviaLength " + triviaLength); }
  clearInterval(quizTime);
  gameSeconds = triviaLength;
}


function renderTime() {

  masterTimerEl.textContent = triviaLength - timeElapsed;
 
  if ( (triviaLength - timeElapsed) < 1 ) {
   endOfGame();
  }
}

function startGameTimer () {
  if (questions) { console.log("--- startGameTimer ---"); }
  setGameTime();

  quizTime = setInterval(function() {
    timeElapsed++; 
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {
  if (questions) { console.log("--- stopTime --- ");}
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(quizTime);
}


function endOfGame() {
  if (questions) { console.log("--- endOfGame ---"); }
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


  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","3");
  initialsInput.setAttribute("size","3");
 



  divEl.appendChild(title);
  divEl.appendChild(directions);
  divEl.appendChild(initialsLabel);
  divEl.appendChild(initialsInput);
  divEl.appendChild(par);
  divEl.appendChild(tryAgain);

  tryAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 


      let thisScore = [ { name: initialsInput.value, score: score } ]; 


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

function highScores() {
  stopTime();
  clearDetails();

  timerRemain.setAttribute("style", "visibility: hidden;");


  let storedScores = JSON.parse(localStorage.getItem("highScores")); 

  let title = document.createElement("h2");
  title.setAttribute("id", "main-title");
  title.textContent = "Top 10 Highscores";

  divEl.appendChild(title);


  if ( storedScores !== null ) {

    storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);


    let numScores2Display = 10;
    if ( storedScores.length < 10 ) { 
      numScores2Display = storedScores.length; 
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score;
      divEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent =  "Enter Your Three Initials"
    divEl.appendChild(p);
  }



  let tryAgain = document.createElement("button");
  tryAgain.setAttribute("id", "tryAgain");
  tryAgain.setAttribute("class", "btn btn-secondary");
  tryAgain.textContent = "Play!";

  divEl.appendChild(tryAgain);

  tryAgain.addEventListener("click", init);
}

hsDiv.addEventListener("click", highScores);