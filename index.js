
/*function calculateScore(callback){
    const correctAnswers ={
        q1:"Paris",
        q2:"Mercure",
        q3:"Jupiter",
    }
    const form = document.getElementById("quiz-form")
    let score=0
    for(const question in correctAnswers){
        const userAnswers= form[question].value
        if(userAnswers===correctAnswers[question]){
            score++
        }
    }
    callback(score)
}


//une fonction qui a la responsabilité d'afficher un mss en f° du score*/
/**
 * 
 * @param {*int} score 
 */
/*function handleMessage(score){
    const resultDIV = document.getElementById("result")
    
    //To clean the result on page
    /*resultDIV.classList.remove("excellent","good","try-again")
    if(score===3){
        resultDIV.innerHTML+=" <br>Excellent!"
        resultDIV.classList.add("excellent")
        }else if(score===2){
        resultDIV.innerHTML+=" <br>Bon travail, vous pouvez vous améliorer!"
        resultDIV.classList.add("good")
        }else{
        resultDIV.innerHTML+=" <br>Vous pouvez faire mieux!"
        resultDIV.classList.add("try-again")
    }
}
    */
/**
 * cette function affiche username dans le span, le nom utilisateur du localStorage
 * @param {*} username 
 */
function showUserMenu(username){
    const usernameDisplay= document.getElementById("username-display")
    usernameDisplay.textContent= username
}
//Unefois le DOM chargé, la fonction récupère l'username ()=>
document.addEventListener("DOMContentLoaded", function(){
    const storedUsername= localStorage.getItem("username")
    const isAuthenticated= localStorage.getItem("isAuthenticated")
    if(storedUsername && isAuthenticated === "true"){
        const usernameDisplay= document.getElementById("username-display")
        usernameDisplay.textContent= storedUsername 
        showUserMenu(storedUsername)
        loadQuestions()
    }else{
        window.location.href="login.html"
    }
})

document.getElementById("logout-btn").addEventListener("click", function(){
    localStorage.setItem("isAuthenticated",false)
    window.location.href="login.html"
})


function submitQuiz() {
    calculateScore(function(score) {
        displayResult(score, function() {
            handleMessage(score)
        })
    })
}

let currentQuestionIndex =0
let questions = []
let selectedDifficulty = ""

async function loadQuestions(difficulty){
    console.log("difficulté choisie" + difficulty)
    try{
        const response = await fetch ("questions.json")
        const allQuestions = await response.json()

        questions= allQuestions.filter((q) => q.difficulty === difficulty)
        selectedDifficulty = difficulty
        currentQuestionIndex = 0

        startQuiz()
    }catch (error) {
        console.log("Erreur lors du chargement des questions", error)
    }
}
function startQuiz() {
    document.querySelector(".difficulty-selection").classList.add("hidden")
    document.getElementById("quiz-container").classList.remove("hidden")
    showQuestion()
}
function showQuestion() {
    if(currentQuestionIndex < questions.length) {
        console.log(questions)
        const questionData = questions[currentQuestionIndex]
        console.log( "question data" + questionData)
        const questionContainer= document.getElementById("quiz-container")

        questionContainer.innerHTML = `
        <div class"question">
        <p> ${questionData.question} <p/>
        <div/>
        <form id="quiz-form">
         ${questionData.options
         .map(
                (option, index)=> `
                <label class="option"> 
                    <input type="radio" name="answer" value="${option}">
                    <span class="custom-radio"></span>
                    ${option}
                </label>
                `
                )
            .join("")}
            <button type="button" onclick="submitAnswer()">Soumettre</button>
        </form>
        `
        }else{
            showFinalResult()
        }
}
//Soumettre la réponse actuelle

function submitAnswer(){
    const form = document.getElementById("quiz-form")
    const selectAnswer = form.answer.value

    if (!selectAnswer){
        alert("Veuillez sélectionner une réponse")
        return
    }
    //Vérifier la réponse et passer à la question suivante
    checkAnswer(selectAnswer)
    currentQuestionIndex++
    showQuestion()
}

// Vérifier si la réponse est correcte

function checkAnswer(selectAnswer) {
    const currentQuestion = questions[currentQuestionIndex]
    if (selectAnswer === currentQuestion.answer){
        incrementScore()
    }
}
let score = 0
function incrementScore() {
    score++
}
//Afficher le résultat final
function showFinalResult() {
    const quizContainer = document.getElementById("quiz-container")
    quizContainer.innerHTML = `
    <div id="result>
    <p>Votre score final est de ${score} sur ${questions.length}.</p>
    </div>
    `
}
//Choisir le niveau de difficulté
document.querySelectorAll(".difficulty-btn").forEach((btn) =>{
    btn.addEventListener("click", function () {
        const level = btn.getAttribute("data-level")
        loadQuestions(level)
    })
})

//Vérifier l'authentification de l'utilisateur
document.addEventListener("DOMcontentLoaded", function () {
    const storedUsername = localStorage.getItem("username")
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (storedUsername && isAuthenticated === "true") {
        showUserMenu(storedUsername)
    } else {
        window.location.href = "login.html"
    }
})

// Afficher le menu utilisateur 
function showUserMenu(username) {
    const unsernameDisplay = document.getElementById("username-display")
    usernameDisplay.textContent = username
    }

// Gérer la déconnexion
document.getElementById("logout-btn").addEventListener("click", function (){
    localStorage.setItem("isAuthenticated", false)
    window.location.href = "login.html"
})
