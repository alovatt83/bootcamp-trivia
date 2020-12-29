
var myQuestions = [
  {
    question: "What is 10/2?",
    answers: {
      a: '3',
      b: '5',
      c: '115'
    },
    correctAnswer: 'b'
  },
  {
    question: "What is 30/3?",
    answers: {
      a: '3',
      b: '5',
      c: '10'
    },
    correctAnswer: 'c'
  }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for(var i=0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}
divEl.appendChild(title);
  divEl.appendChild(directions);
  divEl.appendChild(initialsLabel);
  divEl.appendChild(initialEntry);
  divEl.appendChild(par);
  divEl.appendChild(tryAgain);

  tryAgain.addEventListener("click", init);

  initialEntry.addEventListener("input", function() {
    initialEntry.value = initialEntry.value.toUpperCase();
    if ( initialEntry.value.length === 3 ) { 


      let thisScore = [ { name: initialEntry.value, score: score } ]; 


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
  title.textContent = "Top 10 Highscores!";

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