var firstChecked = false;
var secondChecked = false;
var thirdChecked = false;

var firstAnswer = "sorsa";
var secondAnswer = "sorsa";
var thirdAnswer = "sorsa";

var words_raw = '{"words":[{"fi":"sytyttää","eng1":"light","eng2":"lit","eng3":"lit"},{"fi":"syödä","eng1":"eat","eng2":"ate","eng3":"eaten"},{"fi":"särkyä","eng1":"break","eng2":"broke","eng3":"broken"},{"fi":"taistella, tapella","eng1":"fight","eng2":"fought","eng3":"fought"},{"fi":"taipua, taivuttaa","eng1":"bend","eng2":"bent","eng3":"bent"},{"fi":"takertua johonkin","eng1":"cling","eng2":"clung","eng3":"clung"},{"fi":"tarkoittaa","eng1":"mean","eng2":"meant","eng3":"meant"},{"fi":"tavata","eng1":"meet","eng2":"met","eng3":"met"},{"fi":"tavata (sana)","eng1":"spell","eng2":"spelt","eng3":"spelt"},{"fi":"tehdä","eng1":"do","eng2":"did","eng3":"done"},{"fi":"tehdä, valmistaa","eng1":"make","eng2":"made","eng3":"made"},{"fi":"tietää","eng1":"know","eng2":"knew","eng3":"known"},{"fi":"tulla","eng1":"come","eng2":"came","eng3":"come"},{"fi":"tulla joksikin","eng1":"become","eng2":"became","eng3":"become"}]}';
var words;
var WordCount = 0;
var WordsTotal = 0;

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

	if(WordCount != WordsTotal-1) {
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
	$("#counter").text(WordCount + "/" + WordsTotal + " Suoritettu")

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
	$("#counter").text(WordCount + "/14 Suoritettu")
	firstAnswer = words.words[index].eng1
	secondAnswer = words.words[index].eng2
	thirdAnswer = words.words[index].eng3
	console.log(words.words.splice(index, 1));
}

//Wait for site to load
jQuery(document).ready(function($) {
	words = JSON.parse(words_raw);
	WordsTotal = words.words.length;
	onStart();
	WordCount--;
	$("#counter").text(WordCount + "/" + WordsTotal + " Suoritettu")
});