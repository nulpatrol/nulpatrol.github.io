var answers = "dcaeecedadedbcddebdba";
var tips = [
	"Сума двох сторін трикутника завжди більша, ніж третя сторона. УВАГА: це потрібно перевірити для кожної сторони",
	"Сума кутів трикутника - 180 градусів",
];
var missedTasks = [];
var loadMissed = false;
var taskId = parseInt(getCookie("taskId"));

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
	$("#answer").css("color", "red").text(" - " + answers[i % 3] + "!");
}

function notAnswer() {
	$("#answer").css("color", "yellow").text(" - спершу оберіть варіант!");
}

function load(tid, theme) {
	if (loadMissed) {
		tid = missedTasks.shift();
		taskId = tid;
	}
	if (tid > answers.length || tid == null) {
		if (missedTasks.length == 0) {
			loadEndScreen();
			setCookie("taskId", 1);
			return;
		} else {
			loadMissed = true;
			tid = missedTasks.shift();
			taskId = tid;
		}
	}
	setCookie("taskId", tid);
	wrongAnswerId = 0;
	$("#taskImg").attr("src", "img/" + theme + "/" + tid + ".png");
	$("#num").text(tid);
	$("#answer").text("");
}

$(document).ready(function() {
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

	$("#tip").click(function() {
		alert(tips[taskId - 1]);
	});
});