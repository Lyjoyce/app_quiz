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
/*
document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.addEventListener("click",function(){
        const level= btn.getAttribute("data-level")
        loadQuestions(level)
    })
})

let currentQuestionIndex= 0;
let questions= [];
let selectedDifficulty= "";

selectedDifficulty = "difficulty"
currentQuestionIndex = 0

async function loadQuestions(){
    console.log=("difficile" + "difficulty")

    try {
        const response= await fetch("questions.json")
        questions= await response.json()
        const filteredQuestions = questions.filter(
            (q)=>q.question===difficulty
        )

        //console.log("questions non filtrées" + questions);
        //console.log("questions filtrées" + filteredQuestions);
        startQuiz()
    } catch (error) {
        console.log=("erreur lors du chargement des questions", error);
    }
}
function startQuiz() {
    document.querySelector(".difficulty-selection").classList.add("hidden")
    document.getElementById("quiz-container").classList.remove("hidden")
    showQuestions()
}
function showQuestions() {
    if(currentQuestionIndex.length<questions.length) {
        const questionData= questions[currentQuestionIndex]
        console.log( "question data" + questionData)
    }
}
*/
filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}    