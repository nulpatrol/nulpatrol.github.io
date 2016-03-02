var answers = "dcaeecedadedbcddebdba";

var topics = [
	{ "id" : 1, "theme": "Похідні" },
	{ "id" : 2, "theme": "Інтеграли" },
];

function makeSelect(options, header) {
	var newSelect = $('<select />');
	newSelect.appendTo(".inner");
	
	$('<option />', { value: "hide", text: header }).appendTo(newSelect);
	
	options.forEach(function(item, i, options) {
		$('<option />', { value: item.id, text: item.theme }).appendTo(newSelect);
	});
	
	styleSelect(newSelect);
}

function selectChange(value, id) {
	alert(id);
}

function styleSelect(scope) {
	var $this = $(scope), numberOfOptions = $(scope).children('option').length;
	console.log(numberOfOptions);
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
		selectChange($this.val(), $this.attr("id"));
        $list.hide();
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

}

var tips = [
	"Сума двох сторін трикутника завжди більша, ніж третя сторона. УВАГА: це потрібно перевірити для кожної сторони",
	"Сума кутів трикутника - 180 градусів",
];
var missedTasks = [];
var loadMissed = false;
var isReturn = 0;
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
	if (loadMissed && isReturn == 1) {
		tid = missedTasks.shift();
		taskId = tid;
	}
	if (tid > answers.length || tid == null) {
		if (missedTasks.length == 0 || isReturn == 0) {
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
	
	makeSelect(topics, "-- Оберіть тему --")
	
	var wrongAnswerId = 0;
	var params = parseHash();
	var theme = params[0];
	var task = params[1];
	isReturn = params[2];
	
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