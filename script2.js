var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'left',
  'right',
  'front',
  'back'
//   'she enjoys reading books and playing games',
//   'where are you going',
//   'have a great day',
//   'she sells seashells on the seashore'
];
var audio1=new Audio("punch.mp3");
var audio2=new Audio("game_over.mp3");
var audio3=new Audio("fail.mp3");
var audio= [ new Audio("left_final.mp3"),
new Audio("right_final.mp3"),
new Audio("front_final.mp3"),
new Audio("back_final.mp3")]
var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');
var k; // variable for storing the random variable
var testBtn = document.querySelector('.button_play');
var score_value=document.querySelector('.score_val');
var life_value=document.querySelector('.life_val');
var score_local_val=0;
var life_local_val=5;
var flag_life_speech=0;
var fin_score=document.querySelector('.final_score');
HideObjects();
function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function testSpeech() {
	HideObjects();
	flag_life_speech=0; //changes
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';
  k=randomPhrase();
  k=0;
  audio[k].play();
  if(k==0){
	  console.log("k=0");
	 myMove1();
  }
 else if(k==1){
	 console.log("k=1");
	 myMove2();
 }
 else if(k==2){
	 console.log("k=2");
	 myMove3();
 }
 else if(k==3){
	 console.log("k=3");
	 myMove4();
 }
//audio[k].addEventListener("ended", function(){
    // audio[k].currentTime = 0;
    // testSpeech();
//});

audio[k].onended = function(){
	life_local_val=life_local_val-1;
            //console.log(life)
		//flag_life_speech=1;
            life_value.textContent="Lives-"+life_local_val;
            if(life_local_val==0){
              localStorage.setItem("myScore", score_local_val); 
			  audio2.play();
                 audio2.onended = function(){
              //testSpeech();
                       speaks=[{"name":"Alex", "lang":"en-US"}]
					   const msg=new SpeechSynthesisUtterance();
					   msg.volume=1; // 0 to 1
					   msg.rate=1;   // 0.1 to 10
					   msg.pitch=1; // 0 to 2
					   msg.text="hey how are you";
					   const voice =speaks[0];
					   console.log("voice dtected");
					   msg.voiceURI=voice.name;
					   msg.lang=voice.lang;
					   speechSynthesis.speak(msg);
                   }
        window.location = 'game over.html';
        //window.location = 'game over.html';
        //fin_score.textContent=score_local_val
  }
  /*var elem = document.getElementById("animate");   
  var elem12 = document.getElementById("animate12");   
  var man = document.getElementById("centerPerson");
  var man2 = document.getElementById("diecenterPerson"); 
  console.log("i am here");
  HideObjects();
  man.style.display="none";
  elem12.style.display="none";
  elem.style.display="none";
  man2.style.display="block";*/
  //var ms=7000;
	//  var start = new Date().getTime();
	//  var end = start;
	 // while(end < start + ms) {
	//	  end = new Date().getTime();
  //}
  audio1.play();
  audio1.onended = function(){
testSpeech();
}
//testSpeech();
}
  var phrase = phrases[k];
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase();
  //amplify.store("myPhrase", phrase);
  localStorage.setItem("myPhrase", phrase); 
  phrasePara.textContent = phrase;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    if(speechResult === phrase) {
      score_local_val=score_local_val+1;
	  flag_life_speech=1;
          //console.log(score)
		  HideObjects2();
          score_value.textContent = "Score-"+score_local_val;
		  localStorage.setItem("myScore", score_local_val); 
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
   audio[k].pause();
  audio[k].currentTime =0;
  audio1.play();
  audio1.onended = function(){
testSpeech();
}
 testSpeech();
    } else {
       life_local_val=life_local_val-1;
            //console.log(life)
		flag_life_speech=1;
            life_value.textContent="Lives-"+life_local_val;
			audio[k].pause();
			audio[k].currentTime =0;
            if(life_local_val==0){
              localStorage.setItem("myScore", score_local_val); 
			  console.log("Score is "+score_local_val);
			  audio2.play();
                 audio2.onended = function(){
              //testSpeech();
                       speaks=[{"name":"Alex", "lang":"en-US"}]
					   const msg=new SpeechSynthesisUtterance();
					   msg.volume=1; // 0 to 1
					   msg.rate=1;   // 0.1 to 10
					   msg.pitch=1; // 0 to 2
					   msg.text="hey how are you";
					   const voice =speaks[0];
					   console.log("voice detected");
					   msg.voiceURI=voice.name;
					   msg.lang=voice.lang;
					   speechSynthesis.speak(msg);
                   }

 

              window.location = 'game over.html';
              //window.location = 'game over.html';
              //fin_score.textContent=score_local_val
  }
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
    
    audio[k].pause();
  audio[k].currentTime =0;
  audio3.play();
  audio3.onended = function(){
testSpeech();
}
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}
function stopaudio() {
	console.log("function enetred stopaudio");
	audio[k].pause();
  audio[k].currentTime =0;
 testSpeech();
}
function stopaudio2() {
	console.log("function enetred");
	audio[k].pause();
  audio[k].currentTime =0;
}
function correct(){  audio[k].pause();
 audio[k].currentTime=0;
  audio1.play();
  audio1.onended = function(){
testSpeech();
}
}
function fail(){  audio[k].pause();
 audio[k].currentTime=0;
  audio3.play();
  audio3.onended = function(){
testSpeech();
}
}
function myMove1() {
  var elem = document.getElementById("animate");   
  var elem12 = document.getElementById("animate12");
var elem13 = document.getElementById("animate13");
var elem14 = document.getElementById("animate14");  
  var man = document.getElementById("centerPerson");
var man2 = document.getElementById("diecenterPerson");  
  elem.style.display="block";
  var pos = 0;
  var id = setInterval(frame, 12);
  function frame() {
    if (pos == 560) {
      clearInterval(id);
	  man.style.display="none";
	  elem12.style.display="none";
	  elem.style.display="none";
	  man2.style.display="block";
	  
    } 
	else if(elem.style.display=="none"&&elem12.style.display=="none"){
		clearInterval(id);
		elem14.style.left=pos+"px";
		 elem14.style.display="block";
		 var ms=100;
	     var start = new Date().getTime();
	     var end = start;
	     while(end < start + ms) {
	     end = new Date().getTime();
  }
        elem14.style.display="none";
		 elem13.style.left=pos+"px";
		 elem13.style.display="block";
	}
	else {
      pos++; 
	  console.log("position is "+pos);
	  if(pos%10==0)
	  {
		  console.log("inside");
		  elem.style.display="block";
		  elem12.style.display="none";
	  }
	  else{
		  elem.style.display="none";
		  elem12.style.display="block";
	  }
      //elem.style.top = pos + "px"; 
      //elem.style.right = pos + "px"; 
	  elem.style.left=pos+"px";
	  elem12.style.left=pos+"px";
    }
  }
}
 
function myMove2() {
  var elem = document.getElementById("animate2");  
  var man = document.getElementById("centerPerson");  
  elem.style.display="block";
  var pos = 0;
  var id = setInterval(frame, 7);
  function frame() {
    if (pos == 700) {
      clearInterval(id);
	  man.style.display="none";
    } 
	else if(elem.style.display=="none")
		clearInterval(id);
	else {
      pos++; 
      //elem.style.top = pos + "px"; 
      //elem.style.left = pos + "px"; 
	  elem.style.right = pos + "px";
	  //elem.style.left=pos+"px";
    }
  } 
}
//for front
function myMove3() {
  var elem = document.getElementById("animate3"); 
  var man = document.getElementById("centerPerson");   
  elem.style.display="block";
  var pos = 0;
  var id = setInterval(frame, 7);
  function frame() {
    if (pos == 850) {
      clearInterval(id);
	  man.style.display="none";
    } 
	else if(elem.style.display=="none")
		clearInterval(id);
	else {
      pos++; 
      elem.style.bottom = pos + "px"; 
      //elem.style.left = pos + "px"; 
	  //elem.style.right=pos+"px";
	  console.log("h1");
    }
  }
}
// for back
function myMove4() {
  var elem = document.getElementById("animate4"); 
var man = document.getElementById("centerPerson");   
  elem.style.display="block";  
  var pos = 0;
  var id = setInterval(frame, 7);
  function frame() {
    if (pos == 1000) {
      clearInterval(id);
	  man.style.display="none";
    } 
	else if(elem.style.display=="none")
		clearInterval(id);
	else {
      pos++; 
      elem.style.top = pos + "px"; 
      //elem.style.left = pos + "px"; 
	  //elem.style.right=pos+"px";
	  console.log("h2");
    }
  }
}

function HideObjects() {
	var x1 = document.getElementById("animate");
    var x12 = document.getElementById("animate12");	
	var x13 = document.getElementById("animate13");
	var x14 = document.getElementById("animate14");
	var x2 = document.getElementById("animate2"); 
	var x3 = document.getElementById("animate3"); 
	var x4 = document.getElementById("animate4"); 
	var x5 = document.getElementById("centerPerson"); 
	var x51 = document.getElementById("diecenterPerson"); 
	var x52 = document.getElementById("rightcenterPerson"); 
  //var x = document.getElementById("myDIV");
  //if (x.style.display === "none") {
   // x.style.display = "block";
  //} else {
   // x.style.display = "none";
  //}
  x1.style.display="none";
  x12.style.display="none";
  x13.style.display="none";
  x14.style.display="none";
  x2.style.display="none";
  x3.style.display="none";
  x4.style.display="none";
  x5.style.display="block";
  x51.style.display="none";
  x52.style.display="none";
}
function HideObjects2() {
	var x1 = document.getElementById("animate");
    var x12 = document.getElementById("animate12");	
	var x2 = document.getElementById("animate2"); 
	var x3 = document.getElementById("animate3"); 
	var x4 = document.getElementById("animate4"); 
	var x5 = document.getElementById("centerPerson"); 
	var x51 = document.getElementById("rightcenterPerson"); 
  //var x = document.getElementById("myDIV");
  //if (x.style.display === "none") {
   // x.style.display = "block";
  //} else {
   // x.style.display = "none";
  //}
  x1.style.display="none";
  x12.style.display="none";
  x2.style.display="none";
  x3.style.display="none";
  x4.style.display="none";
  x5.style.display="none";
  x51.style.display="block";
}
testBtn.addEventListener('click', testSpeech);
