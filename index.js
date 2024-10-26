function calculateScore(callback){
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
/*une fonction qui a la responsabilité d'afficher le score*/
function displayResult(score, callback){
    const resultDIV = document.getElementById("result")
        //badkiks pour écrire js dans html avec ${}
    resultDIV.innerHTML= `votre score est de ${score} sur 3.`
    callback(score)
}
/*une fonction qui a la responsabilité d'afficher un mss en f° du score*/
/**
 * 
 * @param {*int} score 
 */
function handleMessage(score){
    const resultDIV = document.getElementById("result")
    /*To clean the result on page*/
    resultDIV.classList.remove("excellent","good","try-again")
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
        loadQuestions()
    }else{
        window.location.href="login.html"
    }
})

document.getElementById("logout-btn").addEventListener("click", function(){
    localStorage.setItem("isAuthenticated",false)
    window.location.href="login.html"
})
let currentquestionIndex= 0;
let questions= [];

async function loadQuestions(){
    try {
        const response= await fetch("questions.json");
        questions= await response.json();

        console.log(questions);
    } catch (error) {
        console.log ("erreur lors du chargement des questions", error);
    }
}