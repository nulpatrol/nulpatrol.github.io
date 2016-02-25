var answers = "babd";

function loadEndScreen() {
	$(".inner").html("<h1>Finish</h1><img style=\"width:400px;\" src=\"img/finish.jpg\">");
}

function parseHash() {
	var hash = window.location.hash || "";
	if (hash.length < 2) return "";
	var params = hash.substring(1).split('-');
	return params;
}

/**
 * Write one of "wrong answer" messages
 * @param int i - number of message
 */
function wrongAnswer(i) {
	var answers = ["Неправильно", "Знову неправильно", "І вкотре неправильно"];
	$("#answer").text(" - " + answers[i % 3] + "!");
}

function load(imgId, theme) {
	console.log(imgId, theme);
	$("#taskImg").attr("src", "img/" + theme + "/" + imgId + ".png");
	$("#num").text(imgId);
	$("#answer").text("");
}

function parse(a) {
	
}

$(document).ready(function() {
	var taskId = parseInt(getCookie("taskId"));
	var wrongAnswerId = 0;
	var params = parseHash();
	var theme = params[0];
	var task = params[1];
	
	if (task != undefined) 
		taskId = task;
	if (taskId == undefined || isNaN(taskId))
		taskId = 1;

	load(taskId, theme);

	$("#button").click(function() {
		checkedRadio = $("input[name=answer]:checked");
		userAns = checkedRadio.val();

		if (userAns != answers[taskId - 1]) {
			wrongAnswer(wrongAnswerId++);
			return false;
		} 
		checkedRadio.prop('checked', false);

		taskId++;
		if (taskId > answers.length) {
			loadEndScreen();
			setCookie("taskId", 1);
		}
		load(taskId, theme);
		setCookie("taskId", taskId);
	});

});