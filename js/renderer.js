var goToPage = function(pageName) {

}

var renderTestA = function() {
	var tmpl = 
	'<h1>Питання <span id="num"></span><span id="answer"></span></h1>' +
	'<div class="task">' +
		'<img id="taskImg" src="" />' +
	'</div>' +
	'<div class="answers">' +
		'<table>' +
			'<tr>' + 
				'<td>' +
					'<input type="radio" name="answer" value="a" id="radio01" />' +
					'<label for="radio01"><span></span>А</label>' +
				'</td>' +
				'<td>' +
					'<input type="radio" name="answer" value="b" id="radio02" />' +
					'<label for="radio02"><span></span>Б</label>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td>' +
					'<input type="radio" name="answer" value="c" id="radio03" />' +
					'<label for="radio03"><span></span>В</label>' +
				'</td>' +
				'<td>' +
					'<input type="radio" name="answer" value="d" id="radio04" />' +
					'<label for="radio04"><span></span>Г</label>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td>' +
					'<input type="radio" name="answer" value="e" id="radio05" />' +
					'<label for="radio05"><span></span>Д</label>' +
				'</td>' +
				'<td>' +
					'<input id="tip" type="button" value="Підказка" />' +
					'<input id="miss" type="button" value="Пропустити" />' +
					'<input id="button" type="button" value="Відповісти" />' +
				'</td>' +
			'</tr>' +
		'</table>' +
	'</div>';
	$('.inner').html(tmpl);
}