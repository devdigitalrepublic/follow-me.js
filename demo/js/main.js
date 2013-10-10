function hitTop() {
  $("#information").append("Top!<br>");
}

function hitBottom() {
  $("#information").append("Bottom!<br>");
}

function moving() {
  $("#information").append("Moving!<br>");
}

$(document).ready(function() {
  $("#follow-me").follow({
    topCallback: hitTop,
    bottomCallback: hitBottom,
    movingCallback: moving
  });
});