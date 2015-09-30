var firstChecked = false;
var secondChecked = false;
var thirdChecked = false;

var firstAnswer = "sorsa";
var secondAnswer = "sorsa";
var thirdAnswer = "sorsa";

var words_raw = '{"words":[{"fi":"Lyödä, iskeä","eng1":"strike","eng2":"struck","eng3":"struck"},{"fi":"Lyödä, osua","eng1":"hit","eng2":"hit","eng3":"hit"},{"fi":"Lyödä Vetoa","eng1":"bet","eng2":"bet","eng3":"bet"},{"fi":"Lyödä, voittaa","eng1":"beat","eng2":"beat","eng3":"beaten"},{"fi":"Lähettää","eng1":"send","eng2":"sent","eng3":"sent"},{"fi":"Lähteä","eng1":"leave","eng2":"left","eng3":"left"},{"fi":"Löytää","eng1":"find","eng2":"found","eng3":"found"},{"fi":"Maata, olla","eng1":"lie","eng2":"lay","eng3":"lain"},{"fi":"Maksaa","eng1":"pay","eng2":"paid","eng3":"paid"},{"fi":"Maksaa, olla hintana","eng1":"cost","eng2":"cost","eng3":"cost"},{"fi":"Menettää","eng1":"lose","eng2":"lost","eng3":"lost"},{"fi":"Mennä","eng1":"go","eng2":"went","eng3":"gone"},{"fi":"Myydä","eng1":"sell","eng2":"sold","eng3":"sold"},{"fi":"Nousta","eng1":"rise","eng2":"rose","eng3":"risen"},{"fi":"Nukkua","eng1":"sleep","eng2":"slept","eng3":"slept"}]}'
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