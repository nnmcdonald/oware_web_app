$("#TestButton").click(function() {
  $.getJSON("http://127.0.0.1:8000/getComputerMove/", function(data, status, xhr) {
    $("#RandomNum").html("Random: " + data["randomNum"]);
  });
});
