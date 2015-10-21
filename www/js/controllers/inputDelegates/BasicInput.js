'use strict';

class BasicInput {
  processInput(eventBus, inputBuff) {
    var sInput = inputBuff.toLowerCase().trim();
    eventBus.publish(Events.OUTPUT_WRITE, '&nbsp;&nbsp;&nbsp;&nbsp;**** COMMODORE 64 BASIC V2 ****<br><br>&nbsp;64K RAM SYSTEM &nbsp;38911 BASIC BYTES FREE<br><br>READY.<br>LOAD "CHASM",8,1<br><br>SEARCHING FOR CHASM<br>LOADING<br>READY.<br>');
    eventBus.publish(Events.INPUT_CLEAR);
    if (sInput === 'run' || 1) {
      var upper = document.querySelectorAll('.upper')[0];
      upper.className = (upper.className || '').replace('upper', '');
      var scr = document.getElementById('screen');
      scr.className = scr.className + ' game';
      eventBus.publish(Events.GAME_START);
    }
  }
}