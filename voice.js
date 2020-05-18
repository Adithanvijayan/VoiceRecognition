try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
}

var noteTextarea = document.getElementById('note-textarea');
var instructions = document.getElementById('recording-instructions');
var noteContent = '';

recognition.continuous = true;

recognition.onresult = function(event) {
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.value = noteContent;
  }
};

recognition.onstart = function() { 
  instructions.innerHTML = 'Voice recognition activated. Try speaking into the microphone.';
}

recognition.onspeechend = function() {
  instructions.innerHTML = 'You were quiet for a while so voice recognition turned itself off.';
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.innerHTML = 'No speech was detected. Try again.';  
  };
}

document.getElementById('start-record-btn').addEventListener('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});


document.getElementById('stop-record-btn').addEventListener('click', function(e) {
  recognition.stop();
  instructions.innerHTML = 'Voice recognition Stopped.';
});

noteTextarea.addEventListener('input', function() {
  noteContent = noteTextarea.value;
});

document.getElementById('clear-note-btn').addEventListener('click', function(e) {
	noteTextarea.value = "";
	instructions.innerHTML = 'Press the Start Recognition button and allow access.';
});
