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
	{img: 51, answer: "d"}, 
	{img: 52, answer: "e"},
	{img: 53, answer: "b"},
	{img: 54, answer: "a"},
	{img: 55, answer: "b"},
	{img: 56, answer: "c"},
	{img: 57, answer: "e"},
	{img: 58, answer: "c"},
	{img: 59, answer: "a"},
	{img: 510, answer: "a"},
	{img: 511, answer: "a"},
	{img: 512, answer: "e"},
	{img: 513, answer: "d"},
	{img: 514, answer: "c"},
	{img: 515, answer: "c"},
	{img: 516, answer: "b"},
	{img: 517, answer: "e"},
	{img: 518, answer: "d"},
	{img: 519, answer: "d"},
	{img: 520, answer: "c"},
	{img: 521, answer: "d"},
	{img: 522, answer: "e"},
	{img: 523, answer: "a"},
	{img: 524, answer: "a"},
	{img: 525, answer: "d"},
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
		load(tasks[taskId].img);
		setCookie("taskId", taskId);
	});
});
