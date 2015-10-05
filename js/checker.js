var firstChecked = false;
var secondChecked = false;
var thirdChecked = false;

var firstAnswer = "sorsa";
var secondAnswer = "sorsa";
var thirdAnswer = "sorsa";

var words_raw = '{"words":[{"fi":"Nähdä","eng1":"see","eng2":"saw","eng3":"seen"},{"fi":"Näyttää, osoittaa","eng1":"show","eng2":"showed","eng3":"shown"},{"fi":"Olla","eng1":"be","eng2":"was/were","eng3":"been"},{"fi":"Olla (jollakulla)","eng1":"have","eng2":"had","eng3":"had"},{"fi":"Ommella","eng1":"sew","eng2":"sewed","eng3":"sewn"},{"fi":"Opettaa","eng1":"teach","eng2":"taught","eng3":"taught"},{"fi":"Oppia","eng1":"learn","eng2":"learnt","eng3":"learnt"},{"fi":"Ostaa","eng1":"buy","eng2":"bought","eng3":"bought"},{"fi":"Osua","eng1":"hit","eng2":"hit","eng3":"hit"},{"fi":"Ottaa","eng1":"take","eng2":"took","eng3":"taken"},{"fi":"Ottaa kiinni","eng1":"catch","eng2":"caught","eng3":"caught"},{"fi":"paistaa (aurinko)","eng1":"shine","eng2":"shone","eng3":"shone"},{"fi":"palaa","eng1":"burn","eng2":"burnt","eng3":"burnt"},{"fi":"panna, asettaa","eng1":"lay","eng2":"laid","eng3":"laid"},{"fi":"panna, asettaa","eng1":"put","eng2":"put","eng3":"put"}]}'
var words;
var WordCount = 0;

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
	$("#fi-txt").text(words.words[index].fi)
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