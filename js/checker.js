var firstChecked = false;
var secondChecked = false;
var thirdChecked = false;

var firstAnswer = "sorsa";
var secondAnswer = "sorsa";
var thirdAnswer = "sorsa";

var words_raw = '{"words":[{"fi":"ravistaa","eng1":"shake","eng2":"shook","eng3":"shaken"},{"fi":"repiä","eng1":"tear","eng2":"tore","eng3":"torn"},{"fi":"riippua kiinni jossakin","eng1":"cling","eng2":"clung","eng3":"clung"},{"fi":"riippua, ripustaa","eng1":"hang","eng2":"hung","eng3":"hung"},{"fi":"rikkoa","eng1":"break","eng2":"broke","eng3":"broken"},{"fi":"ruokkia","eng1":"feed","eng2":"fed","eng3":"fed"},{"fi":"ryömiä","eng1":"creep","eng2":"crept","eng3":"crept"},{"fi":"saada","eng1":"get","eng2":"got","eng3":"got"},{"fi":"saada kiinni","eng1":"catch","eng2":"caught","eng3":"caught"},{"fi":"sanoa","eng1":"say","eng2":"said","eng3":"said"},{"fi":"satuttaa","eng1":"hurt","eng2":"hurt","eng3":"hurt"},{"fi":"seisoa","eng1":"stand","eng2":"stood","eng3":"stood"},{"fi":"soida, soittaa","eng1":"ring","eng2":"rang","eng3":"rung"},{"fi":"sulkea","eng1":"shut","eng2":"shut","eng3":"shut"},{"fi":"sylkeä","eng1":"spit","eng2":"spat","eng3":"spat"}]}';
var words;
var WordCount = 0;

//Add Capitalizion to string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//Word Checkers
	function CheckWord1() {
		checkSpaces('1');
		var value = document.getElementById("1").value;
			if (value.toLowerCase() == firstAnswer.toLowerCase()) {
			$("#1").css('border-color', '#26A65B');
			firstChecked = true;
			document.getElementById("2").focus();
		} else if(value == "") {
			$("#1").css('border-color', '#1abc9c');
			firstChecked = false;
		}
		else{
			$("#1").css('border-color', '#c0392b');
			firstChecked = false;
		};
		CheckAnswers();
	}

	function CheckWord2() {
		checkSpaces('2');
		var value = document.getElementById("2").value;
			if (value.toLowerCase() == secondAnswer.toLowerCase()) {
			$("#2").css('border-color', '#26A65B');
			secondChecked = true;
			document.getElementById("3").focus();
		} else if(value == "") {
			$("#2").css('border-color', '#1abc9c');
			secondChecked = false;
		}
		else{
			$("#2").css('border-color', '#c0392b');
			secondChecked = false;
		};
		CheckAnswers();
	}

	function CheckWord3() {
		checkSpaces('3');
		var value = document.getElementById("3").value;
			if (value.toLowerCase() == thirdAnswer.toLowerCase()) {
			$("#3").css('border-color', '#26A65B');
			thirdChecked = true;
		} else if(value == "") {
			$("#3").css('border-color', '#1abc9c');
			thirdChecked = false;
		}
		else{
			$("#3").css('border-color', '#c0392b');
			thirdChecked = false;
		};
		CheckAnswers();
	}

function checkSpaces(i) {
	value = document.getElementById(i).value;
	if(value[value.length-1] == ' ') {
		document.getElementById(i).value = value.slice(0, value.length-1)
	}
}

//Retrieve a new word
function GetRandomInt() {
	num = Math.floor((Math.random() * words.words.length));
	WordCount++;
	return num;

}

//Self Explanatory
function CheckAnswers() {
	if (firstChecked == true && secondChecked == true && thirdChecked == true) {
		ProceedToNext()
	}
}

function ProceedToNext() {

	//Clear Boxes
	document.getElementById("1").value = "";
	document.getElementById("2").value = "";
	document.getElementById("3").value = "";

	$("#1").css('border-color', '#1abc9c');
	$("#2").css('border-color', '#1abc9c');
	$("#3").css('border-color', '#1abc9c');

	//Reset Vars
	firstChecked = false;
	secondChecked = false;
	thirdChecked = false;

	if(WordCount != 14) {
		//Start Again
		onStart();
	}
	else
	{
		//Initiate Win thing
		moveToLeft();
	}
}

//You should know what this does
function showAnswers() {
	var button = document.getElementById("btn");
	if (button.innerHTML == "Nyt en kyllä tiedä") 
	{
		document.getElementById("1").value = firstAnswer;
		document.getElementById("2").value = secondAnswer;
		document.getElementById("3").value = thirdAnswer;		

		button.innerHTML = "Seuraava Kysymys";

	}
	else 
	{

		button.innerHTML = "Nyt en kyllä tiedä";
		ProceedToNext();
	}

}

//Resets/Reloads the game
function reset() {
	document.getElementById("btn").innerHTML = "Nyt en kyllä tiedä"
	document.getElementById("1").value = "";
	document.getElementById("2").value = "";
	document.getElementById("3").value = "";

	WordCount = 0;
	words = JSON.parse(words_raw);
	onStart();
	WordCount--;
	$("#counter").text(WordCount + "/15 Suoritettu")

	moveToRight();
}

function moveToLeft() {
	$('.container').animate({'right' : "105%"}, 200, function() {
	  $('.container').css('display', 'none');

	  $('.wincontainer').css('display', 'block');
	  $('.wincontainer').animate({'right' : "0%"});

	});

}

function moveToRight() {
	$('.wincontainer').animate({'right' : "-105%"}, 200, function() {
	  $('.wincontainer').css('display', 'none');

	  $('.container').css('display', 'block');
	  $('.container').animate({'right' : "0%"});

	});

}

//Gets ran on startup
function onStart() {
	document.getElementById("1").focus();
	var index = GetRandomInt();
	$("#fi-txt").text(words.words[index].fi.capitalize())
	$("#counter").text(WordCount + "/15 Suoritettu")
	firstAnswer = words.words[index].eng1
	secondAnswer = words.words[index].eng2
	thirdAnswer = words.words[index].eng3
	console.log(words.words.splice(index, 1));
}

//Wait for site to load
jQuery(document).ready(function($) {
	words = JSON.parse(words_raw);
	onStart();
	WordCount--;
	$("#counter").text(WordCount + "/15 Suoritettu")
});