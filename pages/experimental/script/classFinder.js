window.onload = function() {
  console.log('Gonna find some classes');


  var http = new XMLHttpRequest();
  var url = "get_data.php";
  var params = "lorem=ipsum&name=binny";
  http.open("POST", url, true);

}