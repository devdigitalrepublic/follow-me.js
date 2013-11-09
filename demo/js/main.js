function hitTop() {
	$("#information").append("Top touched.<br>");
}

function hitBottom() {
	$("#information").append("Bottom touched.<br>");
}

function endMoving() {
	$("#information").append("Stopped moving.<br>");
}

function movingToTop() {
	$("#information").append("Heading for top.<br>");
}

function movingToBottom() {
	$("#information").append("Heading for bottom.<br>");
}

function startMoving() {
	$("#information").append("Started moving.<br>");
}

$(document).ready(function() {
	$("#follow-me").follow({
		container: "example-container",
		offsetElement: "navigation",
		topStart: movingToTop,
		topEnd: hitTop,
		bottomStart: movingToBottom,
		bottomEnd: hitBottom,
		movingStart: startMoving,
		movingEnd: endMoving,
	});
});