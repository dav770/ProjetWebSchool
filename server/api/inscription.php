<?php
require_once '../handlers/dbConnect.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $mail = (mysqli_real_escape_string($db, $_POST['user_mail']));

    $mdp = (mysqli_real_escape_string($db, $_POST['user_mdp']));

    $nom = (mysqli_real_escape_string($db, $_POST['user_name']));

    $prenom = (mysqli_real_escape_string($db, $_POST['user_prenom']));

    $token = (mysqli_real_escape_string($db, $_POST['user_token']));
    // echo $mail;
    // echo $mdp;

    // $query ="SELECT * FROM users WHERE mailUsers = '$mail' AND passUsers = '$mdp' ";
    $query = " INSERT INTO `users` (`lastNameUsers`, `nameUsers`, `mailUsers`, `passUsers`, `tokenUsers`)
                VALUES ('$nom','$prenom', '$mail', '$mdp', '$token')";

    $result = mysqli_query($db, $query); //returns true if all is good

// mysqli_close($db);

    $myArray = array();
    $myArrayError = array();
    // $myArray = array();
    // while ($row = mysqli_fetch_assoc($result)) {
    //     $myArray[] = $row;
    // }
    // ;
    if ($result) {
        $query = "SELECT * FROM `users` WHERE `mailUsers` = '$mail' AND `passUsers` = '$mdp' ";
//     $query ="INSERT INTO" users (`firstName`, `lastName`...)
        // VALUES ('$fName', '$lName', //etc... );

        $result = mysqli_query($db, $query); //returns true if all is good
        // $myArrayError = array("error" => "");

        while ($row = mysqli_fetch_assoc($result)) {
            $myArray[] = $row;

        }
        echo json_encode($myArray);
        mysqli_close($db);

    } else {
        $myArrayError[] = ["erreur"=>'duplicate'];
        mysqli_close($db);

        echo json_encode($myArrayError);

    }

}
