const effect = {

    navItemWhitOut: () => {
        // recupere obj avec id=L=logOut
        // modifie en jQuery class sans logOut
        $("#logOut").removeClass("logOut");
    },

    navItemWhit: () => {
        // recupere obj avec id=L=logOut
        // modifie en javaScript class avec logOut
        var logOut = document.getElementById("logOut");
        logOut.className += "logOut";
    },

    navBar: () => {
        $(".navbar").toggle("slow");
        libChevron();
    }

    // chevrons : ()=>{
    //     chevron.html("<strong>>></strong>");
    // }
}

const form = {
    blank: `<div id = "f-blank" class= "fc-blank"`,

    signin: `
    <form id = "f-signin"
    class = "fc-signin"
    method = "post"
    enctype = "text/plain"
    name = "connexion">
    
        <div id = "f-signin1"> e-mail: </br> 
            <input type = "email" id = "mail" name = "user_mail" >
        </div> 
        <div id = "f-signin2" > Mot de passe: </br> 
            <input type = "password" id = "mdp" name = "user_mdp" >
            <script>
            var mailGet = document.getElementById("mail");
            mailGet.addEventListener('keypress', keyPress);

            var mdpGet = document.getElementById("mdp");
            </script>
        </div> </br>
        <div id = "f-signin3" >
            <input type = "submit" id = "connexion" value = "Sign In" >
            &nbsp;
            <input type = "submit" id = "inscription" value = "Sign Up" >
        </div>
        
    </form> `,

    signup: `
    <form id = "f-signup"
    class = "fc-signin"
    method = "post"
    enctype = "text/plain"
    name = "inscription">
    
        <div id = "f-signin1"> e-mail: </br> 
            <input type = "email" id = "mail" name = "user_mail" >
        </div> 
        <div id = "f-signin2" > Mot de passe: </br> 
            <input type = "password" id = "mdp" name = "user_mdp" >
        </div> </br>
        <div id = "f-signin2-2" > Confirmation: </br> 
            <input type = "password" id = "mdp2" name = "user_mdp_conf" >
        </div> </br>
        <div id = "f-signin4"> Nom: </br>  
            <input type = "text" id = "nom" name = "user_name" >
        </div> 
        <div id = "f-signin5" > Prenom: </br>
            <input type = "text" id = "prenom" name = "user_prenom" >
        </div> 
        <div id = "f-signin6" class="token"> token: </br>
            <input type = "text" id="token" class="token" name="user_token" >
        </div> 
        <div id = "f-signin3" >
            <input type = "submit" id = "inscription" value = "Sign Up" >
            &nbsp;
            <a href = "javascript:displayHtml('3');"><strong>retour</strong></a>
            </div>
       
    </form> `,

    mainPage: `
    <div class = "container-fluid" >
        <h1 > Two Unequal Responsive Columns </h1> 
        <p> Resize the browser window to see the effect. </p> 
        <p> The columns will automatically stack on top of each other when the screen is less than 576 px wide. </p> 
        <div class = "row" >
            <div class = "col-sm-4" style = "background-color:lavender;" > .col - sm - 4 
                <h2> Vertical Nav </h2> 
                <p> Use the.flex - column class to create a vertical nav: </p> 
                    <ul class = "nav flex-column" >
                        <li class = "nav-item" >
                            <a class = "nav-link" href = "#" > Link </a> 
                        </li> 
                        <li class = "nav-item" >
                            <a class = "nav-link" href = "#" > Link < /a> 
                        </li> 
                        <li class = "nav-item" >
                            <a class = "nav-link" href = "#" > Link </a> 
                        </li> 
                        <li class = "nav-item" >
                            <a class = "nav-link disabled" href = "#" > Disabled </a> 
                        </li> 
                    </ul>
            </div> 
            <div class = "col-sm-8" style = "background-color:lavenderblush;">
            </div> 
        </div> 
    </div>
    `
}


// onSubmit = "return verif_connect()" >
// 