<?php
require_once '../handlers/dbConnect.php';

   

    $mail = "bdo@vo.fr";
    $mdp = "123456";

    $query = "SELECT * FROM users WHERE mailUsers = '$mail' AND passUsers = '$mdp' ";
//     $query ="INSERT INTO" users (`firstName`, `lastName`...)
    // VALUES ('$fName', '$lName', //etc... );

    $result = mysqli_query($db, $query); //returns true if all is good
    $myArray = array();
    $myArrayError = array("error"=>"");

    while ($row = mysqli_fetch_assoc($result)) {
        $tototo = json_encode($row);
        echo $tototo;
        echo $tototo[6];
        foreach ($tototo as $key => $jsons) { // This will search in the 2 jsons
    foreach ($jsons as $key => $value) {
        echo $value; // This will show jsut the value f each key like "var1" will print 9
        // And then goes print 16,16,8 ...
    }
}


        $myArray[] = $row;

    }
echo 'icicicicic   '.json_encode($myArray);
// echo Object.keys(json_encode($myArray)[0]);


$toto = json_encode($myArray);
echo $toto["mailUsers"];

for ($i = 0; $i < 1; $i++) {
    foreach ($toto as $value => $val2) {
      echo $toto[0]['.$value'];
      echo $toto[0]['.$value']['.$val2'];
      echo $toto[0][$value];
    }
  }

    foreach($toto as $value => $val2){
echo "totototot   " .$val2;
    }
        echo json_encode($myArray);
        $toto =  json_encode($myArray);
        echo $toto[0]['idusers'];
    mysqli_close($db);


?>

<div>
<script language="javascript">console.log(<?php echo $toto ?>)</script>;
</div>

