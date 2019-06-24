// for (var i = 0; i < buton.length; i++) {
//     // if (buttons.hasOwnProperty(key)) {
//     buton[i].click(displayHtml(i));
// }

// divButon.forEach(div => divButon.children.addEventListener("click",
//     displayHtml(divButon.id), {
//         capture: false,
//         once: true //equivaut removelistener et libere memoire qui qttend evenement
//     }));

// ***************************************
// ********** David Cassuto **************
// ***************************************






// creation de l'objet pour la verification du local storage
var connectStorage = [];
var userJSON;




function Connect(_nom, _prenom, _mail, _mdp, _token, _id) {
    this.nom = _nom;
    this.prenom = _prenom;
    this.mail = _mail;
    this.mdp = _mdp;
    this.token = _token;
    this.id = _id;
}

// passage des formulaires au API php en fonction de l'appel
// connexion : verifie donnees saisies
// inscrition : effectue l'INSERT dans la base
function callSign(_id, theForm, field) {
    switch (_id) {

        case "connexion":

            theForm.addEventListener("submit", function (e) {
                e.preventDefault(); // otherwise, sends to 'Action'.
                var formData = new FormData(theForm);
                var url = "./server/api/connexion.php";
                fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        /* on verifie le contenu du select
                        connexion ok=> generation token base sur time et modif localstorage et bdd
                        connexion non ok=> rejet */

                        var obj = data[0];
                        var res = confirmeConnexion(obj);
                        if (res['resMail'] && res['resMdp']) {
                            // genere token et enregistre dans localstorage et bdd et ouverture page
                            var resToken = await genereToken();
                            var id = await manageStorage(resToken, obj, "C");
                            await manageBdd(resToken, id, obj);
                            elements.html(form.mainPage);

                        } else {
                            // message erreur connexion
                            alert("Email ou Mot de passe incorrect");

                            document.querySelector('#mail').value = "";
                            mailGet.focus();
                            mailGet.className += "err";

                            document.querySelector('#mdp').value = "";
                        }

                        // checkForSuccess(data, field, _id);

                    })

            })

            break;

        case "inscription":
            // avant envoie du formulaire. Verification des champs
            switch (verifSaisieInscription()) {


                case 1:
                    alert("Saisie du mail incorrect !");
                    document.querySelector('#mail').value = "";
                    mailGet.focus();
                    mailGet.className += "err";

                    break;


                case 2:
                    alert("Les mots de passe ne sont pas identiques !");
                    mdpGet.focus();
                    document.querySelector('#mdp').value = "";
                    document.querySelector('#mdp2').value = "";
                    break;

                case 3:
                    alert("Les mots de passe et l'email sont incorrects !");
                    document.querySelector('#mail').value = "";
                    mailGet.focus();
                    mailGet.className += "err";
                    document.querySelector('#mdp').value = "";
                    document.querySelector('#mdp2').value = "";
                    break;

                case 0:
                    /*tout est bon on poursuit avec la suite du traitement ci-dessous */

            }

            // on genere le token et on le place dans le input non visible pour la transmission en POST a inscription.php
            resToken = genereToken();
            document.querySelector('#token').value = resToken;


            theForm.addEventListener("submit", function (e) {
                e.preventDefault(); // otherwise, sends to 'Action'.
                var formData = new FormData(theForm);
                var url = "./server/api/inscription.php";

                fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {

                        if (data[0].erreur == "duplicate") {
                            alert("erreur de saisie : mail " + data[0].erreur);
                            document.querySelector('#mail').value = "";
                            mailGet.focus();
                            mailGet.className += "err";
                        } else {
                            var obj = data[0];

                            var id = await manageStorage(resToken, obj, "I");
                            elements.html(form.mainPage);
                        }


                    })
                    .catch(error => {
                        alert("erreur de connexion au serveur" + error.message);
                    })

            })
            break;
    }

}





// parcours de tous les elements liste <li> du menu
// recuperation des enfants de chaque liste. Qui sont les boutons
for (let div of divButon) {
    var divChild = div.childNodes;

    //sur chaque bouton identifie par son id (#home etc)
    // ajout de l evenement click qui declemche la fonction displayHtml avec l argument id de chaque <li>
    document.getElementById(divChild[1].id)
        .addEventListener("click", function () {
            displayHtml(div.id)
        });
}

// affection de l'evenement click avec effet JQUERY sur le menu
chevron.click(effect.navBar);


function checkForSuccess(_data, _field) {
    // alert("rentrez ici check");
    verif_connect();
}