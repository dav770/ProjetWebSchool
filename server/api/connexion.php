<?php
require_once '../handlers/dbConnect.php';
if
($_SERVER['REQUEST_METHOD'] == 'POST') {
    $mail = (mysqli_real_escape_string($db, $_POST['user_mail']));

    $mdp = (mysqli_real_escape_string($db, $_POST['user_mdp'])); //etc...

    // $mail = "bdo@vo.fr";
    // $mdp = "123456";

    $query = "SELECT * FROM users WHERE mailUsers = '$mail' AND passUsers = '$mdp' ";
//     $query ="INSERT INTO" users (`firstName`, `lastName`...)
    // VALUES ('$fName', '$lName', //etc... );

    $result = mysqli_query($db, $query); //returns true if all is good
    $myArray = array();
    $myArrayError = array("error"=>"");

    while ($row = mysqli_fetch_assoc($result)) {
        $myArray[] = $row;

    }
        echo json_encode($myArray);
    mysqli_close($db);

}
?>

