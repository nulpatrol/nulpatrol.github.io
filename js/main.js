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

function notAnswer() {
	$("#answer").css("color", "yellow").text(" - спершу оберіть варіант!");
}

function load(tid, theme) {
	if (tid > answers.length) {
		loadEndScreen();
		setCookie("taskId", 1);
		return;
	}
	setCookie("taskId", taskId);
	wrongAnswerId = 0;
	$("#taskImg").attr("src", "img/" + theme + "/" + tid + ".png");
	$("#num").text(tid);
	$("#answer").text("");
}

function parse(a) {
	
}

var missedTasks = [];

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

		if (userAns == undefined) {
			notAnswer();
			return false;
		}

		if (userAns != answers[taskId - 1]) {
			wrongAnswer(wrongAnswerId++);
			return false;
		} 
		
		checkedRadio.prop('checked', false);

		load(++taskId, theme);
	});

	$("#miss").click(function() {
		missedTasks.push(taskId);
		load(++taskId, theme);
	});

});