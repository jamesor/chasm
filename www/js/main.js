'use strict';

var $outText = $('#output');
var $prompt = $('#prompt');
var $banner = $('#banner');
var $image = $('#image img');

var theInputBuff = '';
var score, moves, gameStarted, hasSword, inventory = new Map();

inventory.getList = function () {
  var str;

  if (this.size === 0) {
    return 'You are not carrying anything.';
  }

  str = 'You are carrying:<br>';
  this.forEach(function (item) {
    str += ' - ' + item.description + '<br>';
  });
  return str;
};

inventory.drop = function (title) {
  var result = {}, item; 
  if (this.size === 0) {
    result.text = 'You are not carrying anything.';
  } else {
    item = this.get(title);
    if (item) {
      inventory.delete(title);
      result.item = item;
      result.text = 'You have dropped ' + item.description + '.';
    } else {
      result.text = 'You are not holding that.';
    }
  }
  return result;
}

$(document).on('keydown', function (e) {
  switch (e.which) {
  case 8:
    e.preventDefault();
    theInputBuff = theInputBuff.substring(0, theInputBuff.length - 1);
    app.publish('writeInput', theInputBuff);
    break;
  case 13:
    e.preventDefault();
    processInput();
    theInputBuff = '';
    app.publish('writeInput', theInputBuff);
    break;
  case 32:
    // hack to prevent page from scrolling when SPACE BAR is pressed.
    e.preventDefault();
    theInputBuff += ' ';
    app.publish('writeInput', theInputBuff);
    break;
  }
});

$(document).on('keypress', function (e) {
  if (theInputBuff.length < 39) {
    theInputBuff += String.fromCharCode(e.which);
    app.publish('writeInput', theInputBuff);
  }
});

function setChars(str, len) {
  var result = str;
  while (result.length < len) {
    result += ' ';
  }
  return result;
}

function drawBanner() {
  var strLoc = setChars(game.place.title, 21);
  var strScore = setChars("Score:"+score, 9);
  var strMoves = setChars("Moves:"+moves, 10);
  var str = (strLoc+strScore+strMoves).replace(/\s/g, '&nbsp;');
  $banner.html(str);
}

function drawImage() {
  $image.attr('src', game.place.imagePath); console.log(game.place)
}

function initGame() {
  $('.upper').removeClass('upper');
  $('#screen').addClass('game');
  visitPlace(game.places[Places.FOREST_CLEARING]);
  $('#output').empty();
  app.publish('writeOutput', game.place.describe());
  gameStarted = true;
  score = 0;
  moves = 0;
  hasSword = false;
  $prompt.text('>');
  processGameInput();
}

function processInput() {
  if (gameStarted) {
    processGameInput();
  } else {
    processBasicInput();
  }
}

function processBasicInput() {
  var sInput = theInputBuff.toLowerCase().trim();
  app.publish('writeInput', '');
  app.publish('writeOutput', '&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
  if (sInput === 'run') {
    initGame();
  }
}

function visitPlace(place) {
  game.place = place;
  drawBanner();
  drawImage();
}

function removeInsignificantWords(str) {
  var result = str;
  result = result.replace(/the\s/g, '');
  result = result.replace(/go\s/g, '');
  result = result.replace(/walk\s/g, '');
  result = result.replace(/climb\s/g, '');
  return result;
}

function processGameInput() {
  var sInput = theInputBuff.toLowerCase().trim();
  var words = removeInsignificantWords(sInput).split(' ');
  var newOutText = 'You can\'t do that here.';
  var newPlace;
  var item, ary = [];

  app.publish('writeInput', '');

  drawBanner();

  switch (words[0]) {
    case 'i':
    case 'inventory':
      newOutText = inventory.getList();
      break;
    case 'l':
    case 'look':
      newOutText = game.place.describe();
      break;
    case 'n':
    case 'north':
      newPlace = game.place.exits.go(Directions.NORTH);
      break;
    case 's':
    case 'south':
      newPlace = game.place.exits.go(Directions.SOUTH);
      break;
    case 'e':
    case 'east':
      newPlace = game.place.exits.go(Directions.EAST);
      break;
    case 'w':
    case 'west':
      newPlace = game.place.exits.go(Directions.WEST);
      break;
    case 'u':
    case 'up':
      newPlace = game.place.exits.go(Directions.UP);
      break;
    case 'd':
    case 'down':
      newPlace = game.place.exits.go(Directions.DOWN);
      break;
    case 'take':
      if (game.place.items.size === 0) {
        newOutText = 'You don\'t see anything here worth taking.';
      } else {
        item = game.place.items.get(words[1]);
        if (item) {
          inventory.set(item.title, item);
          game.place.items.delete(item.title);
          newOutText = 'You have taken ' + item.description + '.';
        } else {
          newOutText = 'You cannot pick that up.';
        }
      }
      break;
    case 'drop':
      var result = inventory.drop(words[1]);
      newOutText = result.text;
      if (result.item) {
        game.place.items.set(words[1], result.item);
      }
      break;
    case 'turn':
      switch (words[1]) {
        case 'on':
          break;
        case 'off':
          break;
      }
      break;
    default:
      newOutText = 'I don\'t understand that command.';
  }

  if (typeof newPlace === 'string') {
    newOutText = newPlace;
  }

  if (typeof newPlace === 'object') {
    visitPlace(newPlace);
    newOutText = game.place.describe();
  }

  if (moves > 0) {
    app.publish('writeOutput', '>'+sInput+'<br>'+newOutText);
    // Update the output area to force a scroll to the bottom
    $outText[0].scrollTop = $outText[0].scrollHeight;
  }

  moves++;
  app.publish('move');
}

setTimeout(processBasicInput, 300);