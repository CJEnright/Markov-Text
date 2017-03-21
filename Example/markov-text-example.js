var markovExample = new MarkovText();

function learnFromInput() {
	markovExample.learn(document.getElementById('textAreaInput').value);
	console.log("Example model trained");
}

function resetModel() {
	markovExample.reset();
	console.log("Example model cleared")
}

function outputFromModel() {
	var markovOutput =  markovExample.output(document.getElementById('numberOfWords').value);
	document.getElementById('textAreaOutput').value = markovOutput;
}

function importPAP() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    	markovExample.load(xmlHttp.responseText);
    	document.getElementById('textAreaInput').value = "Got and loaded Pride and Prejudice data, click Output button below for Pride and Prejudice output."
      outputFromModel();
    }
  }
  xmlHttp.open("GET", 'https://raw.githubusercontent.com/CJEnright/Markov-Text/master/Example/markov-pride-prejudice.json', true);
  xmlHttp.send(null);
}
