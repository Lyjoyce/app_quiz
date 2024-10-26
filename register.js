function registerUser(){
    const username= document.getElementById("username").value
    const password= document.getElementById("password").value

    if(username&&password){
        /*localStorage fonctionne avec clé,valeur*/
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
   
        alert("inscription réussie! Vous pouvez maintenant vous connecter")
        window.location.href="http://127.0.0.1:3000/login.html"
    }else{
        alert("Veuillez remplir tous les champs")
    }
}


