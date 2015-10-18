'use strict';

class UseCommand {
  execute(data) {
    var thing1, thing2;

    function getThing(str) {
      var thing = chasm.player.items.get(str);
      if (!thing) {
        thing = chasm.place.items.get(str);
      }
      return thing;
    }

    thing1 = getThing(data.words[0]);
    thing2 = getThing(data.words[1]);
    
    if (thing1 && thing2) {
      thing2.useWith(thing1);
    } else if (!str.test(/use \w \w/)) {
      chasm.publish(Events.OUTPUT_WRITELN, 'SYNTAX: use &lt;thing 1&gt; with &lt;thing 2&gt;');
    } else {
      chasm.publish(Events.OUTPUT_WRITELN, 'You cannot do that.');
    }
  }
}

/*

lock door with key
pick lock with pin
unlock door with key

use key with door
use match with torch
use <item> with <item>

*/