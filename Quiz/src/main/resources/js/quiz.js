
const API_QUIZ = 'http://localhost:8080/api/questions'
let questions;
let page = 0
let size = 1
let totalPage = 0
// function renderQuiz(){
//     $.ajax({
//         url: `http://localhost:8080/api/questions?page=${page || 0}&size=${size || 0}`,
//         method: "GET",
//         headers:{
//             'Accept':'application/json',
//             'Content-Type': 'application/json'},
//     }).done(data => {
//
//         const totalPage = data.totalPages;
//         let str = '';
//         data.forEach(quiz => {
//             questions = quiz.questions;
//             let ques = '';
//             quiz.questions.forEach((question,index) => {
//                 let ans = '';
//                 question.answers.forEach(answer => {
//                     if(question.type === "radio"){
//                         ans += ` <div class="form-check">
//               <input class="form-check-input" value="${answer.title}" type="radio" name="ques-${question.id}" id="answer-${answer.id}">
//               <label class="form-check-label" for="flexRadioDefault1">
//                   ${answer.title}.${answer.content}
//               </label>
//           </div>`
//                     }
//                     else if (question.type === 'true/false') {
//                         ans += `
//             <div class="form-check">
//               <input class="form-check-input" value="${answer.title}" type="radio" name="ques-${question.id}" id="answer-${answer.id}">
//               <label class="form-check-label" for="flexRadioDefault1">
//                 ${answer.title}.${answer.content}
//               </label>
//             </div>
//           `;
//                     } else {
//                         ans += ` <div class="form-check">
//               <input class="form-check-input" value="${answer.title}" type="checkbox" name="ques-${question.id}" id="answer-${answer.id}">
//               <label class="form-check-label" for="flexRadioDefault1">
//                   ${answer.title}.${answer.content}
//               </label>
//           </div>`
//                     }
//                 })
//                 ques += ` <h4 class="alert alert-primary disabled">${index+1}.${question.content}</h4>
//             ${ans}
//           `
//             })
//             str += ` <h1 align="center">${quiz.content}</h1>
//   <div id="">
//       <div id="question">
//          ${ques}
//       </div>
//   </div>`
//         })
//         document.getElementById('quiz').innerHTML = str;
//     })
//     renderPagination();
//     if(page > 0 && quiz.length === 0){
//         page = 0;
//         renderQuiz();
//     }
//
// }

const renderQuiz = () => {
    body.innerHTML = '';

    $.ajax({
        url: `http://localhost:8080/api/questions?page=${page || 0}&size=${size || 0}`,
        method: 'GET'
    }).done(data => {
        let ques = '';
        const questionsAll = data.content;
         totalPage = data.totalPages;

            questionsAll.forEach((question, index) => {
                let ans = '';
                    ques += `
                    <div class="form-check">
                            <label class="form-check-label" for="flexRadioDefault1">
                                ${question.content}
                            </label>
                        </div>
                    `;
                question.answers.forEach(answer => {
                    if (question.type === 'single'|| question.type === 'true/false') {
                        ans += `
                        <div class="form-check">
                            <input class="form-check-input" value="${answer.title}" type="radio" name="ques-${question.id}" id="answer-${answer.id}">
                            <label class="form-check-label" for="flexRadioDefault1">
                                ${answer.title}.${answer.content}
                            </label>
                        </div>
                    `;
                    } else {
                        ans += `
                        <div class="form-check">
                            <input class="form-check-input" value="${answer.title}" type="checkbox" name="ques-${question.id}" id="answer-${answer.id}">
                            <label class="form-check-label" for="flexRadioDefault1">
                                ${answer.title}.${answer.content}
                            </label>
                        </div>
                    `;
                    }
                });





                 ques += ans;
            });
        ofOnSubmitEnd();
        body.innerHTML = ques;
        renderPagination();
    }).fail(error => {
        console.error('Error:', error);
    });
};

renderQuiz();

function submit() {
    if (!questions) {
        console.error("Biến 'questions' chưa được khởi tạo hoặc có giá trị undefined.");
        return;
    }

    let values = [];
    let isFull = true;

    for (let i = 0; i < questions.length; i++) {
        let inputElements = document.querySelectorAll(`input[name="ques-${i + 1}"]:checked`);

        if (inputElements.length === 0) {
            isFull = false;
            break;
        } else {
            let answerObject = {};
            let selectedAnswers = [];

            inputElements.forEach(inputElement => {
                selectedAnswers.push(inputElement.value);
            });

            answerObject.answer = selectedAnswers;
            answerObject.type = inputElements[0].type === 'radio' ? 'radio' : 'checkbox';
            values.push(answerObject);
        }
    }

    if (!isFull) {
        alert("Vui lòng trả lời hết các câu hỏi.");
    } else {
        alert(`Bạn đã đạt được ${checkAnswer(values)} điểm / ${questions.length} điểm.`);
    }
}


function randomQuestionAndAnswer(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
const renderPagination = () => {
    const pagination = $('#pagination');
    pagination.empty();
    pagination.append(` <li onclick="onPageChange(${page})"
        class="page-item ${page === 0 ? 'disabled' : ''}">
      <a class="page-link" href="#" tabindex="-1" ${page === 0 ? 'aria-disabled="true"' : ''} >Previous</a>
    </li>`)

    pagination.append(` <li onclick="onPageChange(${page + 2})"
        class="page-item ${page === totalPage - 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" tabindex="-1" ${page === totalPage - 1 ? 'aria-disabled="true"' : ''} >Next</a>
        </li>`);
}

renderQuiz();
const onPageChange = (pageChange) => {
    if(pageChange < 1 || pageChange > totalPage || pageChange === page+1){
        return;
    }
    page = pageChange - 1;
    renderQuiz();
    ofOnSubmitEnd();
}
function ofOnSubmitEnd(){
    if (page === totalPage -1){
        document.getElementById("sub").style.display = 'block';
    }
    else {
        document.getElementById("sub").style.display = 'none';
    }
}


function onChoose(index){
    const inputCheck = document.getElementsByName(`quet-${questions[index].id}`);
    let hasChecked = false;
    for (let i = 0; i < inputCheck.length; i++) {
        if(inputCheck[i].checked){
            hasChecked = true;
            break; // Nếu đã tìm thấy ít nhất một lựa chọn được chọn, thoát vòng lặp
        }
    }
    // Đặt màu nền cho nút chọn số tương ứng dựa trên trạng thái lựa chọn
    const numberButton = document.getElementById(`number-question-${index}`);
    if (hasChecked) {
        numberButton.style.background = 'blue';
    } else {
        numberButton.style.background = 'none';
    }
}
// function choose(index){
//     document.getElementById("question-"+index).style.display = "block";
//     console.log(index)
// }
function choose(index){
    const summitCoure = document.getElementById("summit-coure");
    if (index === questions.length - 1){
        summitCoure.style.display = "flex";
    }else {
        summitCoure.style.display = "none";
    }
    // Ẩn tất cả các câu hỏi
    for (let i = 0; i < questions.length; i++) {
        document.getElementById("question-" + i).style.display = "none";
    }
    // Hiển thị câu hỏi tương ứng với số được chọn
    document.getElementById("question-" + index).style.display = "block";
    console.log(index);
}