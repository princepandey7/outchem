<?php
if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  if (isset($_POST["name"]) && isset($_POST["email"]))
  {
    // Standard form submission
    $result = "RECEIVED PERSON DATA:" .
      "<br />name = " . $_POST["name"] .
      "<br />email = " . $_POST["email"];
  }
  else if (isset($_GET["person"]))
  {
    // AJAX form submission
    $person = json_decode($_GET["person"]);

    $result = json_encode(array(
      "receivedFirstName" => $person->name,
      "receivedLastName" => $person->email));
  }
  else
  {
    $result = "INVALID REQUEST DATA";
  }

  echo $result;
}
?>