// Initialize variables
var questionsContainer = document.getElementById("questions-container");
var resultRow = document.getElementById("result-row");
var questions = [];
var answers = [];
var currentIndex = 0;
var totalQuestions = 40;
var correctAnswers = 0;
var currentQuestion = 1;
const barEl = document.getElementById('myBar');
var mark=document.getElementById("marks");


// Create questions and answers
for (var i = 0; i < totalQuestions; i++) {
  var number1 = Math.floor(Math.random() * 10) + 1;
  var number2 = Math.floor(Math.random() * 10) + 1;
  var lcm = findLCM(number1, number2);
  questions.push(number1 + " and " + number2);
  answers.push(lcm);
}

// Show questions
showQuestions();

// Function to show questions
function showQuestions() {
  // Clear questions container
  questionsContainer.innerHTML = "";

  // Create question elements
  for (var i = 0; i < totalQuestions; i++) {
    var questionDiv = document.createElement("div");
    questionDiv.classList.add("col-md-3", "mb-3");
    var questionText = document.createElement("p");
    questionText.innerHTML = `<span class="question-num">${i + 1}</span> ${questions[i]}`
    // questionText.innerText = questionNumber + questions[i];
    questionText.style.fontSize="18px"
    questionDiv.appendChild(questionText);
    var answerInput = document.createElement("input");
    answerInput.type = "number";
    answerInput.classList.add("form-control");
    answerInput.id = "answer-input-" + i;
    answerInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
       
        var index = parseInt(event.target.id.split("-")[2]);
        checkAnswer(index);
        currentIndex++;
        if (currentIndex < totalQuestions) {
          var nextInput = document.getElementById("answer-input-" + currentIndex);
          nextInput.focus();
        } else {
          showResult();
        }
      }
    });
    questionDiv.appendChild(answerInput);
    var feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("feedback");
    questionDiv.appendChild(feedbackDiv);
    questionsContainer.appendChild(questionDiv);
       
  }
}

// Function to check answer
function checkAnswer(index) {
  var answerInput = document.getElementById("answer-input-" + index);
  var answer = parseInt(answerInput.value);
  answerInput.disabled = true;
  if (answer === answers[index]) {
    answerInput.classList.add("is-valids");
    answerInput.classList.remove("is-invalids");
    var feedbackDiv = answerInput.nextElementSibling;
    feedbackDiv.innerHTML = "<span class='text-success'>Correct!</span>";
    correctAnswers++;
  } else {
    answerInput.classList.add("is-invalids");
    answerInput.classList.remove("is-valids");
    var feedbackDiv = answerInput.nextElementSibling;
    feedbackDiv.innerHTML = "<span class='text-danger'>Wrong.</span>";
  }
  // Call Barmove() function to update progress bar
  Barmove();
}

// Function to show result
function showResult() {
  mark.innerText = "You got " + correctAnswers + " out of " + totalQuestions + " correct.";
}

// Function to find LCM
function findLCM(a, b) {
  var max = Math.max(a, b);
  var min = Math.min(a, b);
  var lcm = max;
  while (lcm % min !== 0) {
    lcm += max;
  }
  return lcm;
}


function showAnswers() {
  for (var i = 0; i < totalQuestions; i++) {
    var answerInput = document.getElementById("answer-input-" + i);
    answerInput.value = answers[i];
    answerInput.disabled = true;
  }
}


// Function to move progress bar
function Barmove() {
  barEl.innerHTML = currentQuestion + ' / ' + totalQuestions;
  let move = (currentQuestion / totalQuestions) * 100;
  barEl.style.width = Math.round(move) + '%';
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
  }
}

// Focus on first input element when the page loads
setTimeout(function () {
  var firstInput = document.getElementById('answer-input-0');
  firstInput.focus();
  }, 500);
