// en javascript pure
var divButon = document.getElementsByClassName("nav-item");
const nameConnectStorage = "connectUser";


var chevron = $("#chevron");
var buton = $(".nav-link");
// var elements = document.getElementsByClassName("container");
var elements = $("#container");


/* mailGet et mdpGet sont crees dans le code du view.js, sinon pas encore cree est generation erreur
pour mailGet ajout evenement des que presse une touche avec mailGet.addEventListener('keypress', keyPress)*/

function keyPress() {
    // la classe err est ajoutee pour permettre le focus et la bordure en rouge
    // donc suppression de cette classe des nouvelle saisie
    mailGet.classList.remove("err");
}



function libChevron() {
    var libChev = document.getElementsByClassName("fa-3x");
    if (libChev[0].className != null || libChev[0].className != "") {

        let val = libChev[0].classList;

        for (i = 0; i < libChev[0].classList.length; i++) {
            if (val[i] == "fa-chevron-circle-down") {
                libChev[0].classList.remove('fa-chevron-circle-down');
                libChev[0].classList.add('fa-chevron-circle-up');
                break;
            }
            if (val[i] == "fa-chevron-circle-up") {
                libChev[0].classList.remove('fa-chevron-circle-up');
                libChev[0].classList.add('fa-chevron-circle-down');
            }

        }

    }
}
// function libChevron() {
//     var libChev = "";
//     if (chevron.text() == "<<") {
//         libChev = ">>"
//     } else {
//         libChev = "<<";
//     }
//     chevron.html('<strong>' + libChev + '</strong>');
// }


function displayHtml(idButon) {
    switch (idButon) {
        case "0":
            elements.html(form.blank);
            break;
        case "1":
            elements.html(form.blank);
            break;
        case "2":
            elements.html(form.blank);
            break;
        case "3":
            elements.html(form.signin);
            $("#container").fadeIn(2000);
            $("#container").fadeTo("slow", 1);
            $("#container").fadeOut(1000);
            $("#container").fadeTo("fast", 1);
            $("#container").fadeIn(2000);


            // pour connaitre le bouton choisit
            // affectation du onclick sur l'objet selectionne par document.getElementById("#id")
            document.getElementById("connexion").onclick = () => {
                var theForm = document.getElementById("f-signin");
                var field = theForm.getElementsByTagName("input");
                callSign("connexion", theForm, field);
            }

            // obligation de repeter le code car le formulaire form.signup, n'existe pas encore
            // il est affiche qu'apres le click sur le bouton inscription
            document.getElementById("inscription").onclick = () => {
                elements.html(form.signup);
                document.getElementById("inscription").onclick = () => {
                    var theForm = document.getElementById("f-signup");
                    var field = theForm.getElementsByTagName("input");
                    callSign("inscription", theForm, field);
                }

            }

            break;

    }


}


// verif des saisies connexion
function verif_connect() {
    // alert("ici verif");
    if (document.connexion.user_mail.value.indexOf('@') == -1) {
        document.connexion.user_mail.focus();
        return false;
    } else if (document.connexion.user_mdp.value.length <= 0) {
        document.connexion.user_mdp.focus();
        return false;
    } else {

    }
}


function checkForSuccess(data, field, _id) {
    switch (_id) {
        case "connexion":
            if (data['error'] == "") {
                // ouverture page principale
                // reaffichage du menu avec le bouton logOut
                effect.navItemWhit;

            } else if (data['error'] == "token") {
                // gestion du token
            } else {
                alert(data['error']);
                document.connexion.user_mail.value = "";
                document.connexion.user_mdp.value = "";
                document.connexion.user_mail.focus();
            }
            break;


        case "inscription":
            break;
    }
}


// lors de la tentative de connexion ou de l'inscription
// verification si existe cle dans local storage
// oui: verification si cette entree existe dans l'objet du local storage
// oui: verication et gestion du token avec la BDD
// non: creation de l'objet local storage et gestion du token avec la BDD

// obj = tableau associatif avec resultat de la requete
// app = type d'appel de la fonction

async function manageStorage(token, obj, app) {

    var id = 0;
    // ici obj est le tableau associatif que retourne la requete  de ./server/api/inscription.php
    for (cle in obj) {
        if (obj.hasOwnProperty(cle)) {
            if (cle == 'idusers') {
                // recuperation de la valeur du id de connexion pour le passage a nodejs et le remplissage de localStorage
                id = obj['idusers'];
            }
        }


        userJSON = localStorage.getItem(nameConnectStorage);

        if (userJSON != null) {
            userJSON = JSON.parse(userJSON);
            // existe dans l'objet -> gestion du token dans localStorage
            var res = confirmeUserStorage(userJSON, token);
            // le JSON existe mais cette entree n'est pas trouvee
            if (!res) {
                userJSON.push({
                    nom: "lname",
                    prenom: "fname",
                    mail: document.querySelector('#mail').value,
                    mdp: document.querySelector('#mdp').value,
                    token: token,
                    id: id
                });
            }
        } else {
            // n'existe pas -> creation dans l'objet et gestion token dans le LocalStorage
            if (app == "I") {
                var mail = document.querySelector('#mail').value
                var mdp = document.querySelector('#mdp').value
                // creation de l'objet et gestion token avec BDD

                var newConnect = new Connect(document.querySelector('#prenom').value, document.querySelector('#nom').value, mail, mdp, token, id);

            } else {
                var mail = document.querySelector('#mail').value
                var mdp = document.querySelector('#mdp').value
                // creation de l'objet et gestion token avec BDD

                var newConnect = new Connect("fName", "lName", mail, mdp, token, id);
            }

            connectStorage.push(newConnect);
            userJSON = JSON.stringify(connectStorage);
            localStorage.setItem(nameConnectStorage, userJSON);

        }
        // retourne id pour site des traitements et du nodejs
        return id;

    }
}

async function manageBdd(_token, id, obj) {
    /*******  nodejs  ***********
     ******* manageBdd en *******
     ****************************/
    var CheminComplet = document.location.href;
    var CheminRepertoire = CheminComplet.substring(0, CheminComplet.lastIndexOf("/"));
    var NomDuFichier = CheminComplet.substring(CheminComplet.lastIndexOf("/") + 1);

    // const maj={"id": id, "token": _token};
    const maj = [id, _token];

    // document.location.href = `http://localhost:60003/tpphp3/index.html?id=${id}&tok=${_token}`;
    document.location.href = `http://localhost:60003/tpphp3/index.html?maj=${maj}`;

    // le setTimeOut ainsi que le re-localisation sur le port 60002 de mysql sont dans le code
    // server.js . obligation de les y mettre car c'est le serveur node qui a la main et c'est lui qui doit la rendre
    clearTimeout(timeOut);
}


// alert('NomDuFichier : \n' + NomDuFichier + ' \n\n CheminRepertoire : \n' + CheminRepertoire + ' \n\n CheminComplet :\n ' + CheminComplet);
// const app = require ("./modulesJS/updateBdd.js");
// app.funcAppCo;


function confirmeUserStorage(_userJSON, _token) {
    var res = false;

    _userJSON.forEach(element => {
        for (key in element) {
            if ((key == 'mail' && element[key] == document.querySelector('#mail').value) &&
                (element['mdp'] == document.querySelector('#mdp').value)) {
                // change token dans storage
                element['token'] = _token;
                res = true;
            }
        }
    });

    return res;
}


function confirmeConnexion(obj, app) {
    var res = {
        'resMail': false,
        'resMdp': false,
        'reslName': '',
        'resfName': '',
    }

    // si app = 1 il s'agit de l'inscription
    if (app != 1) {

        // var resMail = false;
        // var resMdp = false;
        for (cle in obj) {
            if (obj.hasOwnProperty(cle)) {
                // verifcation que on est sur les cles mail et pawd
                // que les valeurs sont les bonnes 
                if (cle == 'mailUsers' && res['resMail'] != true) {
                    if (obj[cle] == document.querySelector('#mail').value) {
                        res['resMail'] = true;
                    }
                } else if (cle == 'passUsers' && res['resMdp'] != true) {
                    if (obj[cle] == document.querySelector('#mdp').value) {
                        res['resMdp'] = true;
                    }
                }
                // if (cle == 'tokenUsers' && obj[cle] == null) {
                //     alert("token null");
                // }
            }
        }
    } else //appel du forme inscription
    {

    }
    return res;

}

async function genereToken() {
    // const rand = () => Math.random(0).toString(36).substr(2);
    // const token = (length) => (rand() + rand() + rand() + rand()).substr(0, length);

    // console.log(token(40));
    // //example1:  token(10) => result: tsywlmdqu6
    // //example2:  token(40) => result: m4vni14mtln2547gy54ksclhcv0dj6tp9fhs1k10


    var date = new Date();
    var heure = date.getHours();
    var minutes = date.getMinutes();

    var res = (heure + minutes) + date.getDay();
    return res.toString();
}

function verifSaisieInscription() {
    var resVerif = {
        mail: false,
        mdp: false
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.querySelector('#mail').value)) {
        resVerif[mail] = true;
    } else {
        resVerif[mail] = false;
    }


    if (document.querySelector('#mdp').value == document.querySelector('#mdp2').value) {
        resVerif[mdp] = true;
    } else {
        resVerif[mdp] = false;
    }

    if (resVerif[mail] && resVerif[mdp]) {
        return 0;
    } else if (!resVerif[mail] && resVerif[mdp]) {
        return 1;
    } else if (resVerif[mail] && !resVerif[mdp]) {
        return 2;
    } else if (!resVerif[mail] && !resVerif[mdp]) {
        return 3;
    }
}


// function actionButon(idButon) {
//     // recupere tableau de tous les nav-item a savoir tous les boutons
//     // id=signin , id=cars, id=addcar, id=home
// // console.log(buton[1].children)
//     var btChild = $(buton[idButon]).children
//         $(btChild)[0].click((idButon)=> {
//             displayHtml(idButon);
//         });
// 