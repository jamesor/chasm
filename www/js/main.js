var $inText = $('#response');
var $outText = $('#output');
var $prompt = $('#prompt');
var $banner = $('#banner');
var $image = $('#image img');

var theInputBuff = '';
var theLocation, score, moves, gameStarted, hasSword, inventory = [];

$(document).on('keydown', function (e) {
  if (e.which === 8) {
    e.preventDefault();
    theInputBuff = theInputBuff.substring(0, theInputBuff.length - 1);
    $inText.text(theInputBuff);
  }
  if (e.which === 13) {
    processInput();
    $inText.text('');
    theInputBuff = '';
  }
});

$(document).on('keypress', function (e) {
  if (theInputBuff.length < 39) {
    theInputBuff += String.fromCharCode(e.which);
    $inText.text(theInputBuff);
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
  var strLoc = setChars(theLocation, 21);
  var strScore = setChars("Score:"+score, 9);
  var strMoves = setChars("Moves:"+moves, 10);
  var str = (strLoc+strScore+strMoves).replace(/\s/g, '&nbsp;');
  $banner.html(str);
}

function drawImage() {
  var filename = 'images/'+theLocation.toLowerCase().replace(/\s/g,'-')+'.png';
  $image.attr('src', filename);
}

function initGame() {
  $('.upper').removeClass('upper');
  $('#screen').addClass('game');
  $outText.html(visitLocation('Forest Clearing')+'<br><br>');
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
  $inText.text('');
  $outText.html('&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
  if (sInput === 'run') {
    initGame();
  }
}

function visitLocation(loc) {
  if (theLocation !== loc) {
    theLocation = loc;
    drawBanner();
    drawImage();
    return getLocationText(theLocation);
  }
  return '';
}

function getLocationText(loc) {
  var result = '';
  switch (loc) {
  case 'Forest Clearing':
    result = 'You are standing in a forest clearing with a path leading to the east where you see a rocky mountainside. All other directions are impassable.';
    break;
  case 'Chasm Entrance':
    result = 'You are standing at the entrance to a chasm which can be entered by climbing down. There is a clearing to the west.';
    break;
  case 'Narrow Passage':
    result = 'You begin your decent through the crack in the mountainside. It\'s a pretty tight fit, but you manage.';
    break;
  case 'Troll Room':
    result = 'You are in the Troll\'s Room. It\'s dark and smelly.';
    if (!hasSword) {
      result += 'In the corner leaning against the wall is a shiny katana sword.';
    }
  }
  return result;
}

function removeWords(str) {
  var result = str;
  result = result.replace(/the\s/g, '');
  result = result.replace(/go\s/g, '');
  result = result.replace(/the\s/g, '');
  result = result.replace(/walk\s/g, '');
  result = result.replace(/climb\s/g, '');
  return result;
}

function processGameInput() {
  var sInput = theInputBuff.toLowerCase().trim();
  var newOutText = 'You can\'t do that here.';

  $inText.text('');

  drawBanner();

  // See if the user is trying to view their inventory
  if (sInput === 'i' || sInput === 'inventory') {
    newOutText = 'You are carrying ';
    if (inventory.length === 0) {
      newOutText += "nothing.";
    } else {
      newOutText += inventory.join(', ') + '.';
    }
  // See if the user wants to have the room description
  // displayed again.
  } else if (sInput === 'l' || sInput === 'look') {
    newOutText = getLocationText('Forest Clearing');
  // Otherwise they are doing something room specific
  } else {
    switch (removeWords(theLocation)) {
    case 'Forest Clearing':
      switch (sInput) {
      case 'e':
      case 'east':
        newOutText = visitLocation('Chasm Entrance');
        break;
      case 'w':
      case 'west':
      case 'n':
      case 'north':
      case 's':
      case 'south':
      case 'u':
      case 'up':
      case 'd':
      case 'down':
        newOutText = 'You are unable to travel in that direction.';
        break;
      }
      break;
    case 'Chasm Entrance':
      switch (sInput) {
      case 'w':
      case 'west':
        newOutText = visitLocation('Forest Clearing');
        break;
      case 'd':
      case 'down':
        newOutText = visitLocation('Narrow Passage');
        break;
      case 'n':
      case 'north':
      case 's':
      case 'south':
      case 'u':
      case 'up':
      case 'e':
      case 'east':
        newOutText = 'You are unable to travel in that direction.';
        break;
      }
      break;
    case 'Narrow Passage':
      switch (sInput) {
      case 'u':
      case 'up':
        newOutText = visitLocation('Chasm Entrance');
        break;
      case 'd':
      case 'down':
        newOutText = visitLocation('Troll Room');
        break;
      case 'w':
      case 'west':
      case 'n':
      case 'north':
      case 's':
      case 'south':
      case 'e':
      case 'east':
      case 'd':
      case 'down':
        newOutText = 'You are unable to travel in that direction.';
        break;
      }
      break;
    case 'Troll Room':
      switch (sInput) {
      case 'u':
      case 'up':
        newOutText = visitLocation('Narrow Passage');
        break;
      case 'w':
      case 'west':
      case 'n':
      case 'north':
      case 's':
      case 'south':
      case 'e':
      case 'east':
      case 'd':
      case 'down':
        newOutText = 'You are unable to travel in that direction.';
        break;
      case 'take sword':
      case 'take katana':
      case 'take katana sword':
      case 'take shiny katana sword':
        if (hasSword) {
          newOutText = 'You don\'t see a sword here.';
        } else {
          hasSword = true;
          inventory.push('a shiny katana sword');
          score += 5;
          drawBanner();
          newOutText = 'You now wield the katana sword and it begins to glow brightly.';
        }
        break;
      }
      break;
    }
  }

  if (moves > 0) {
    $outText.html($outText.html()+'>'+sInput+'<br>'+newOutText+'<br><br>');
  }

  moves++;

  // Update the output area to force a scroll to the bottom
  $outText[0].scrollTop = $outText[0].scrollHeight;
}

setTimeout(processBasicInput, 300);