var answers = "babd";

function loadEndScreen() {
	$(".inner").html("<h1>Finish</h1><img style=\"width:400px;\" src=\"img/finish.jpg\">");
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
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

function load(imgId) {
	$("#taskImg").attr("src", "img/" + imgId + ".png");
	$("#num").text(imgId);
	$("#answer").text("");
}

function parse(a) {
	
}



$(document).ready(function() {
	var taskId = parseInt(getCookie("taskId"));
	var wrongAnswerId = 0;
	
	if (taskId == undefined) {
		taskId = 1;
	} else {
		load(taskId);
	}

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
		load(taskId);
		setCookie("taskId", taskId);
	});
});
