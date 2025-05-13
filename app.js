




const firebaseConfig = {
  apiKey: "AIzaSyC3Q6AAU6BI2O5f16Fq9eBHbKLCmY7-QjY",
  authDomain: "quizapp-with-db-1ddaa.firebaseapp.com",
  databaseURL: "https://quizapp-with-db-1ddaa-default-rtdb.firebaseio.com",
  projectId: "quizapp-with-db-1ddaa",
  storageBucket: "quizapp-with-db-1ddaa.firebasestorage.app",
  messagingSenderId: "354326949706",
  appId: "1:354326949706:web:ae9c297c4fcdcd40f19bb3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// getting username to stored with name in DB

var username = "";
function getUsername() {
  username = prompt("Enter your name:");
  if (!username) {
    username = "Anonymous";
  }
}
 
   
var questions = [
  {
    question: "HTML Stands for",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique ",
    option1: "id",
    option2: "class  ",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css ",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with __ methods ",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____ ",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var index = 0;
var score = 0;
var timer = document.getElementById("timer");
var min = 1;
var sec = 59;
var interval;

function starttimer() {
  clearInterval(interval);
  min = 1;
  sec = 59;
  timer.innerHTML = `${min} : ${sec}`;
  interval = setInterval(function () {
    timer.innerHTML = `${min} : ${sec}`;
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;
      if (min < 0) {
        min = 1;
        sec = 59;
        nextQuestion();
      }
    }
  }, 1000);
}

starttimer();

function nextQuestion() {
  var nextBtn = document.getElementById("btn");

  var allOptions = document.getElementsByTagName("input");
  for (var i = 0; i < allOptions.length; i++) {
    if (allOptions[i].checked) {
      allOptions[i].checked = false;
      var selectedValue = allOptions[i].value;
      var selectedOption = questions[index - 1][`option${selectedValue}`];
      var correctAnswer = questions[index - 1]["corrAnswer"];
      if (selectedOption === correctAnswer) {
        score++;
      }
    }
  }
  nextBtn.disabled = true;

  if (index > questions.length - 1) {
    clearInterval(interval);
    var percentage = ((score / questions.length) * 100).toFixed(2);

    //  Save result to Firebase
    
    var resultId = firebase.database().ref("quizResults").push().key;
    var resultObj = {
      username: username,
      score: score,
      totalQuestions: questions.length,
      percentage: percentage,
      time: new Date().toLocaleString(),
    };
    firebase.database().ref(`quizResults/${resultId}`).set(resultObj);

    //  SweetAlert
    Swal.fire({
      title: `You got ${percentage}%`,
      text: `Thanks, ${username}!`,
      icon: "success"
    });
  } else {
    quesElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;
    starttimer();
  }
}

function clicked() {
  var nextBtn = document.getElementById("btn");
  nextBtn.disabled = false;
}
