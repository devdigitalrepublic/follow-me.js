function hitTop() {
	$("#callback-output").append("Top touched.<br>");
}

function hitBottom() {
	$("#callback-output").append("Bottom touched.<br>");
}

function endMoving() {
	$("#callback-output").append("Stopped moving.<br>");
}

function movingToTop() {
	$("#callback-output").append("Heading for top.<br>");
}

function movingToBottom() {
	$("#callback-output").append("Heading for bottom.<br>");
}

function startMoving() {
	$("#callback-output").append("Started moving.<br>");
}

$(document).ready(function() {
	$("#follow-me").follow({
		container: 'demo',
		topStart: movingToTop,
		topEnd: hitTop,
		bottomStart: movingToBottom,
		bottomEnd: hitBottom,
		movingStart: startMoving,
		movingEnd: endMoving
	});
});

