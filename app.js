let htmlQuiz = [
    {
      question: "What does HTML stand for _______________ ?",
      options: [
        "Hyper Text Markup Language",
        "Hot Mail",
        "How to Make Lasagna",
        "None of these",
      ],
      correctAnswer: "Hyper Text Markup Language",
    },
    {
      question: "How many tags are in a regular element?",
      options: ["2 tag", "1 tag", "3 tag", "4 tag"],
      correctAnswer: "2 tag",
    },
    {
      question:
        "What is the difference between an opening tag and a closing tag?",
      options: [
        "Opening tag has a / in front",
        "Closing tag has a / in front",
        "There is no difference",
        "There is major difference",
      ],
      correctAnswer: "Closing tag has a / in front",
    },
    {
      question: "< br / > What type of tag is this?",
      options: ["Break tag", "A broken one", "An opening tag", "An spacing tag"],
      correctAnswer: "Break tag",
    },
    {
      question: "< body > Is this an opening tag or a closing tag?",
      options: [
        "Opening",
        "Closing",
        "Opening n Closing",
        "Both Opening n Closing",
      ],
      correctAnswer: "Opening",
    },
    {
      question: "< / body > Is this an opening tag or a closing tag?",
      options: [
        "Opening",
        "Closing",
        "Opening n Closing",
        "Both Opening n Closing",
      ],
      correctAnswer: "Closing",
    },
    {
      question: "Where is the meta tag only found?",
      options: [
        "The last page",
        "The home page",
        "The second page",
        "None of these",
      ],
      correctAnswer: "The home page",
    },
  
    {
      question: "Which of the following is an example of an empty element?",
      options: ["< img / >", "< img > < / img >", "< / img >", "None of these"],
      correctAnswer: "< img / >",
    },
    {
      question: "What should values always be enclosed in?",
      options: ["Quotation marks", "Commas", "Parenthesis", "< >"],
      correctAnswer: "Quotation marks",
    },
    {
      question: "Where do all items for the same website need to be saved?",
      options: [
        "In the same folder",
        "Where ever is fine",
        "In different folders",
        "In new files",
      ],
      correctAnswer: "In the same folder",
    },
  
    {
      question:
        "What is always a welcome page, and explains the purpose or topic of the site?",
      options: ["Page 4", "Homepage", "Table of contents", "None of these"],
      correctAnswer: "Homepage",
    },
    {
      question: "What does View Source do?",
      options: [
        "Nothing",
        "Brings up a note pad with the HTML code already used for the site.",
        "Open a new website.",
        "Both B and C",
      ],
      correctAnswer:
        "Brings up a note pad with the HTML code already used for the site.",
    },
  ];
  
  let playBtn = document.getElementById("play");
  let imgCont = document.getElementById("imgCont");
  

  let startBtn = document.getElementById("startQuiz")
 
  let quizContainer = document.getElementById("quizContainer");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let questions = document.getElementById("displayQuestion");
  let options = document.getElementById("optionContainer");
  let results = document.getElementById("resultDisplay");
  let percent_age = document.getElementById("percentage");
  
  let runningQueNum = document.getElementById("runningQueNum");
  let totalQue = document.getElementById("totalQueNum");
  let nextBtn = document.getElementById("btn");
  let resetBtn = document.getElementById("reset");
  let msg = document.getElementById("msg");
  
  let started = false;
  let indx = 0;
  let marks = 0;
  
  let min = 15;
  let sec = 0;
  let interval;
  
  minutes.innerHTML = "15 ";
  seconds.innerHTML = "00 ";




  playBtn.addEventListener("click", () => {
    quizContainer.style.display = "block";
    imgCont.style.display = "none";
  });
  
  startBtn.addEventListener("click" , () =>{
    if (started === false) {
      started = true;
  
      start();
      
      
      msg.innerHTML = `
      <div class="fw-bold text-center p-3 mb-1" style="background-color: #f8f9fa; border: 2px solid #007bff; border-radius: 8px; color: #343a40;">
        <h4>Quiz is started<br><span style="font-size: 1.2rem; font-weight: normal;">Duration: 15:00 Minutes</span></h4>
      </div>`;
    
    
    }
  })



  function start() {
    interval = setInterval(function () {
      if (sec > 0) {
        sec--;
      } else if (min > 0) {
        min--;
        sec = 59;
      }
  
      let formattedSec = sec < 10 ? "0" + sec : sec;
      let formattedMin = min < 10 ? "0" + min : min;
  
      seconds.innerHTML = formattedSec + "<small></small>";
      minutes.innerHTML = formattedMin + "<small></small>";
  
      if (min === 0 && sec === 0) {
        clearInterval(interval);
        Swal.fire("Times Up");
        result();
      }
    }, 1000);
  }

  

  options.addEventListener("click", function (event) {
    if (started === true) {
      if (event.target.type === "radio") {
        nextBtn.disabled = false;
      }
    } else {
      alert("Please press start quiz button first.");
    }
  });
  
  
  
  function showQuestion() {
    questions.innerHTML = htmlQuiz[indx].question;
    let correctAns = htmlQuiz[indx].correctAnswer;
  
    options.innerHTML = "";
  
    for (let optionsValue of htmlQuiz[indx].options) {
      options.innerHTML += `
  <div>
    <h4 class="w-75 mt-2 p-3 rounded" style="background-color: #4A0E33; color: #F4F6F7; display: flex; align-items: center;">
      <input id="option-${optionsValue}" class="form-check-input m-1 me-3" style="cursor: pointer" type="radio" value="${optionsValue}" name="flexRadioDefault">
      <label class="form-check-label text-light fw-bold" for="option-${optionsValue}" style="cursor: pointer; margin: 0;">${optionsValue}</label>
    </h4>
  </div>
`;

    }
  
    indx++;
    runningQueNum.innerHTML = indx;
    totalQue.innerHTML = htmlQuiz.length;
    nextBtn.disabled = true;
  }
  
  function checkAnswer() {
    let selectedOption = document.querySelectorAll(
      'input[name="flexRadioDefault"]:checked'
    );
  
    let userAnswer = selectedOption.length > 0 ? selectedOption[0].value : null;
    let correctAns = htmlQuiz[indx - 1].correctAnswer;
    if (userAnswer === correctAns) {
      marks++;
  
      Swal.fire("Correct!", "", "success");
    } else {
      Swal.fire("Wrong!", `The correct answer was: ${correctAns}`, "error");
    }
  }
  
  nextBtn.addEventListener("click", () => {
    checkAnswer();
    result();
  });
  
  function result() {
    if (indx === htmlQuiz.length) {
      quizContainer.style.display = "none";
      results.style.display = "block";
  
      let totalPercent_age = (marks / htmlQuiz.length) * 100;
      percent_age.innerHTML = totalPercent_age.toFixed(2) + " % ";
  
      setTimeout(function () {
        Swal.fire({
          title: "Quiz Completed!",
          text: " Good luck next time!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }, 2000);
    } else {
      showQuestion();
    }
  }
  
  // resetBtn.addEventListener("click", resetQuiz);
  
  function resetQuiz() {
    indx = 0;
    marks = 0;
    started = false;
    min = 15;
    sec = 0;
    clearInterval(interval);
    showQuestion();
  
    quizContainer.style.display = "block";
    results.style.display = "none";
  
    nextBtn.setAttribute("disabled", true);
  
   
    minutes.innerHTML = "15 ";
    seconds.innerHTML = "00 ";
  }
  
  resetBtn.addEventListener("click", () => {
    resetQuiz();
    quizContainer.style.display = "none";
    imgCont.style.display = "flex";
  });
  showQuestion();
  