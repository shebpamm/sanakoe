var firstChecked = false;
var secondChecked = false;
var thirdChecked = false;

var firstAnswer = "sorsa";
var secondAnswer = "sorsa";
var thirdAnswer = "sorsa";

var words_raw = '{"words":[{"fi":"Pidellä","eng1":"hold","eng2":"held","eng3":"held"},{"fi":"piilottaa, piiloutua","eng1":"hide","eng2":"hid","eng3":"hidden"},{"fi":"piirtää","eng1":"draw","eng2":"drew","eng3":"drawn"},{"fi":"pilata","eng1":"spoil","eng2":"spoilt","eng3":"spoilt"},{"fi":"pistää, laittaa","eng1":"stick","eng2":"stuck","eng3":"stuck"},{"fi":"pitää (esim. kädessä)","eng1":"hold","eng2":"held","eng3":"held"},{"fi":"pitää yllään","eng1":"wear","eng2":"wore","eng3":"worn"},{"fi":"pitää, säilyttää","eng1":"keep","eng2":"kept","eng3":"kept"},{"fi":"polttaa","eng1":"burn","eng2":"burnt","eng3":"burnt"},{"fi":"pudota","eng1":"fall","eng2":"fell","eng3":"fallen"},{"fi":"puhaltaa","eng1":"blow","eng2":"blew","eng3":"blown"},{"fi":"puhua","eng1":"speak","eng2":"spoke","eng3":"spoken"},{"fi":"purra","eng1":"bite","eng2":"bit","eng3":"bitten"},{"fi":"päästä","eng1":"get","eng2":"got","eng3":"got"},{"fi":"rakentaa","eng1":"build","eng2":"built","eng3":"built"}]}';
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
	//Flash Background
	$("body").css('background-color', '#27ae60');

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
		//redirect to winning site
		/*TODO: Make some fancy js thingy 
		instead of loading a different site*/
		window.location.replace("win.html");
	}
}


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