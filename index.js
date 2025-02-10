document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.addEventListener("click",function(){
        const level= btn.getAttribute("data-level")
        loadQuestions(level)
    })
})

let currentQuestionIndex= 0;
let questions= [];
let selectedDifficulty= "";

const URL= "https://lyjoyce.github.io/appli_quiz2_level/"
async function loadQuestions(difficulty){
    try {
        const response = await fetch(URL);
        if (!response.ok){
            throw new Error(`Erreur HTTP: ${response.status}`)
        }
        const allQuestions = await response.json();

        questions=allQuestions.filter((q)=> q.difficulty===difficulty)
        selectedDifficulty=difficulty
        currentQuestionIndex = 0

        startQuiz()
    }catch(error) {
        console.log=("erreur lors du chargement des questions", error.message);
    }
}

/*function loadQuestions(choiceDifficulty = ""){
    selectedDifficulty = choiceDifficulty;
    console.log("Difficulté : " + selectedDifficulty)

    try {
        const response= fetch("questions.json")
        //const AllQuestions= await response.json();
        //questions=AllQuestions.filter(
       //     (q) q.difficulty===difficulty
       // )
        
        .then((response) => {
            return response.json();
        })
        .then((questions) => {
            const filteredQuestions = questions.filter(
                (q)=>q.difficulty===selectedDifficulty
            )
            selectedDifficulty = choiceDifficulty;
            currentQuestionIndex = 0
            startQuiz()
        });
    } catch (error) {
        console.log=("erreur lors du chargement des questions", error);
    }
}*/

function startQuiz() {
    document.querySelector(".difficulty-selection").classList.add("hidden")
    document.getElementById("quiz-container").classList.remove("hidden")
    showQuestions()
}

function showQuestions() {
    if(currentQuestionIndex<questions.length) {
        console.log(questions)
        const questionData= questions[currentQuestionIndex]
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
                <label> 
                    <input type="radio" name="answer" value="${option}">
                    <span class="custom-radio"></span>
                    ${option}
                </label>
                `
                )
            .join("")}
            <button type="button" onclick= "submitAnswer()">Soumettre</button>
        </form>
        `
        }else{
            showFinalResult()
        }
}




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
//une fonction qui a la responsabilité d'afficher le score
function displayResult(score, callback){
    const resultDIV = document.getElementById("result")
        //badkiks pour écrire js dans html avec ${}
    resultDIV.innerHTML= `votre score est de ${score} sur 3.`
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
function submitQuiz() {
    calculateScore(function(score) {
        displayResult(score, function() {
            handleMessage(score)
        })
    })
}

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
    }else{
        window.location.href="login.html"
    }
})

document.getElementById("logout-btn").addEventListener("click", function(){
    localStorage.setItem("isAuthenticated",false)
    window.location.href="login.html"
})
document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.addEventListener("click",function(){
        const level= btn.getAttribute("data-level")
        loadQuestions(level)
    })
})


