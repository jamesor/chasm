'use strict';

class ProcessInputCommand {
  execute(data) {
    var list = data.input.split(' ');

    for (var i=list.length; i>=0; i--) {

      // first remove useless words
      if (UselessWords[list[i]]) {
        list.splice(i, 1);
      } 
    
      

    }
  }
}