
const API_QUIZ = 'http://localhost:8080/api/quiz'
let questions;

function renderQuiz(){
    $.ajax({
        url: API_QUIZ,
        method: "GET",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'},
    }).done(data => {
        let str = '';
        data.forEach(quiz => {
            questions = quiz.questions;
            let ques = '';
            quiz.questions.forEach((question,index) => {
                let ans = '';
                question.answers.forEach(answer => {
                    if(question.type === "radio"){
                        ans += ` <div class="form-check">
              <input class="form-check-input" value="${answer.title}" type="radio" name="ques-${question.id}" id="answer-${answer.id}">
              <label class="form-check-label" for="flexRadioDefault1">
                  ${answer.title}.${answer.content}
              </label>
          </div>`
                    }
                    else {
                        ans += ` <div class="form-check">
              <input class="form-check-input" value="${answer.title}" type="checkbox" name="ques-${question.id}" id="answer-${answer.id}">
              <label class="form-check-label" for="flexRadioDefault1">
                  ${answer.title}.${answer.content}
              </label>
          </div>`
                    }
                })
                ques += ` <h4 class="alert alert-primary disabled">${index+1}.${question.content}</h4>
            ${ans}
          `
            })
            str += ` <h1 align="center">${quiz.content}</h1>
  <div id="">
      <div id="question">
         ${ques}
      </div>
  </div>`
        })
        document.getElementById('quiz').innerHTML = str;
    })

}
renderQuiz();

function submit(){
    let values = [];
    let isFull = true;
    for (let i = 1; i <= questions.length; i++) {
        let inputName = "ques-" + i;

        let inputElement = document.querySelectorAll('input[name="' + inputName + '"]:checked');

        if(inputElement.length<=0){
            isFull=false;
            break;
        } else {
            let answerO = {};
            let checkAns= [];
            if (inputElement[0].type === "radio") {
                valueInput = inputElement[0].value;
                answerO.answer = valueInput;
                answerO.type = "radio"
                values.push(answerO);
            } else  {
                // Lặp qua tất cả các checkbox đã chọn và lấy giá trị của chúng
                inputElement.forEach(function(checkbox) {
                    checkAns.push(checkbox.value);
                });
                answerO.answer = checkAns;
                answerO.type = "checkbox"
                values.push(answerO);
            }
        }
    }
    if(!isFull){
        alert("nhập cho hết đê")
    } else {
        alert("bạn đã được " + checkAnswer(values) + "/" + questions.length + " điểm")
    }
    console.log(values)
    console.log(questions)

}

function checkAnswer(value){
    let count = 0;
    let check = false;
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (value[i].type === "radio") {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (questions[i].answers[j].title === value[i].answer && questions[i].answers[j].status === true)
                    score++;
            }
        } else if (value[i].type === "checkbox") {
            for (let j = 0; j < questions[i].answers.length; j++) {
                for (let k = 0; k <questions[i].answers.length ; k++) {
                    if (questions[i].answers[j].title === value[i].answer[k] && questions[i].answers[j].status === false){
                        count++;
                    }
                }
            }
            if(count === 0){
                score ++ ;
            }
            count = 0;
        }
    }
    return score;
}
