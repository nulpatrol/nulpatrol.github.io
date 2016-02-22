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

function load(imgId) {
	$("#taskImg").attr("src", "img/" + imgId + ".PNG");
}

var tasks = [
	{img: 1, answer: "b"}, 
	{img: 2, answer: "a"},
	{img: 3, answer: "b"},
	{img: 4, answer: "d"},
	{img: 5, answer: "e"},
	{img: 6, answer: "d"},
	{img: 7, answer: "b"},
	{img: 8, answer: "d"},
	{img: 9, answer: "e"},
	{img: 10, answer: "c"},
	{img: 11, answer: "e"},
	{img: 12, answer: "c"},
	{img: 13, answer: "e"},
	{img: 14, answer: "b"},
	{img: 15, answer: "d"},
	{img: 16, answer: "c"},
	{img: 17, answer: "a"},
	{img: 18, answer: "b"},
	{img: 19, answer: "e"},
	{img: 20, answer: "c"},
	{img: 21, answer: "d"},
	{img: 22, answer: "e"},
	{img: 23, answer: "d"},
];

$(document).ready(function() {
	var taskId = getCookie("taskId");
	if (taskId == undefined) {
		taskId = 0;
	} else {
		load(tasks[taskId].img);
	}

	$("#button").click(function() {
		checkedRadio = $("input[name=answer]:checked");
		userAns = checkedRadio.val();
		if (userAns != tasks[taskId].answer) {
			alert("Неправильно!"); 
			return false;
		}
		checkedRadio.prop('checked', false);

		taskId++;
		if (taskId + 1 >= tasks.length) {
			loadEndScreen();
			setCookie("taskId", 0);
		}
		load(tasks[taskId].img);
		setCookie("taskId", taskId);
	});
});
