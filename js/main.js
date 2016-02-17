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
	{img: 81, answer: "d"}, 
	{img: 82, answer: "e"},
	{img: 83, answer: "c"},
	{img: 84, answer: "a"},
	{img: 85, answer: "c"},
	{img: 86, answer: "d"},
	{img: 87, answer: "b"},
	{img: 88, answer: "b"},
	{img: 89, answer: "d"},
	{img: 810, answer: "c"},
	{img: 811, answer: "b"},
	{img: 812, answer: "d"},
	{img: 813, answer: "a"},
	{img: 814, answer: "a"},
	{img: 815, answer: "e"},
	{img: 816, answer: "c"},
	{img: 817, answer: "d"},
	{img: 818, answer: "a"},
	{img: 819, answer: "e"},
	{img: 820, answer: "b"},
	{img: 821, answer: "d"},
	{img: 822, answer: "c"},
	{img: 823, answer: "b"},
	{img: 824, answer: "d"},
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
