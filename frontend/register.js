function registerUser(){
    const username= document.getElementById("username").value
    const password= document.getElementById("password").value

    if(username&&password){

     /*localStorage fonctionne avec clé,valeur*/
     localStorage.setItem("username", username)
     LocalStorage.setItem("password", password)

     alert("inscription réussie! Vous pouvez maintenant vous connecter")
     window.location.href="login.html"
    }else{
     alert("Veuillez remplir tous les champs")
    }
}
 

/*
async function registerUser(){
    const username= document.getElementById("username").value
    const password= document.getElementById("password").value
    //const URL = ""

    if(username&&password){
        try{
            const userData = {
                username :  username,
                password : password
            }

           const response = await fetch(url,{
           method : "POST",
           headers : {"Content-Type" : "application/json"},
           body : JSON.stringify(userData)
            })

            if(response.ok){
            const data = await response.json()
            console.log("userRegistered:" , data) 

            alert("inscription réussie! Vous pouvez maintenant vous connecter")
            window.location.href="login.html"

         }else{
            const errorData = await response.json()
            console.log("Error:" , errorData)
            
            alert("Erreur lors de l'inscription" + (errorData.message || response.statusText))
        }
    }catch(error){
        console.log("Une erreur s'est produite", error)
        alert("Une erreur inattendue s'est produite, veuillez recommencer plus tard")
    }
}else{
    alert("Veuillez remplir tous les champs")
   }
}
*/
/*
@Bean
public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
}
    */
   /*
   @Autowired
private PasswordEncoder passwordEncoder;

@Override
public User registerNewUserAccount(UserDto accountDto) throws EmailExistsException {
    if (emailExist(accountDto.getEmail())) {
        throw new EmailExistsException(
          "There is an account with that email adress:" + accountDto.getEmail());
    }
    User user = new User();
    user.setFirstName(accountDto.getFirstName());
    user.setLastName(accountDto.getLastName());
    
    user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
    
    user.setEmail(accountDto.getEmail());
    user.setRole(new Role(Integer.valueOf(1), user));
    return repository.save(user);
}
    */





