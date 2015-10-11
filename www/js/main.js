'use strict';

var chasm = new Chasm();

var theInputBuff = '';

$(document).on('keydown', function (e) {
  switch (e.which) {
  case 8:
    e.preventDefault();
    theInputBuff = theInputBuff.substring(0, theInputBuff.length - 1);
    chasm.publish(Events.INPUT_WRITE, theInputBuff);
    break;
  case 13:
    e.preventDefault();
    processInput();
    theInputBuff = '';
    chasm.publish(Events.INPUT_WRITE, theInputBuff);
    break;
  case 32:
    // hack to prevent page from scrolling when SPACE BAR is pressed.
    e.preventDefault();
    theInputBuff += ' ';
    chasm.publish(Events.INPUT_WRITE, theInputBuff);
    break;
  }
});

$(document).on('keypress', function (e) {
  if (theInputBuff.length < 39) {
    theInputBuff += String.fromCharCode(e.which);
    chasm.publish(Events.INPUT_WRITE, theInputBuff);
  }
});

function processInput() {
  var sInput = theInputBuff.toLowerCase().trim();
  chasm.publish(Events.OUTPUT_WRITE, '&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
  chasm.publish(Events.INPUT_CLEAR);
  if (sInput === 'run') {
    $('.upper').removeClass('upper');
    $('#screen').addClass('game');
    chasm.initGame();
    processInput = processGameInput;
  }
}

function processGameInput() {
  var input, words, verb;

  function removeInsignificantWords(list) {
    for (var i=list.length; i>=0; i--) {
      if (UselessWords.has(list[i])) {
        list.splice(i, 1);
      } 
    }
    return list;
  }

  input = theInputBuff.toLowerCase().trim();
  words = removeInsignificantWords(input.split(' '));

  if (words.lenth < 1) return;

  verb = KnownVerbs[words.shift()];

  chasm.publish(Events.OUTPUT_WRITE, '>'+input+'<br>');
  chasm.publish(Events.INPUT_CLEAR);

  if (verb) {
    chasm.publish(verb, {
        input: input,
        verb: verb,
        words: words
      });
  } else {
    chasm.publish(Events.OUTPUT_WRITELN, 'I don\'t understand that command.');
  }

  chasm.publish(Events.PLAYER_MOVE);
}

setTimeout(processInput, 300);