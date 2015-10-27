'use strict';

class InputUtils {
  
  static parse(data, prepList) {
    var verb  = data[0];
    var noun1 = (data[1]) ? ItemsProxy.findAll(data[1]) : null;
    var prep  = (data[2] && (prepList && prepList.includes(data[2]))) ? data[2] : null;
    var noun2 = (data[3]) ? ItemsProxy.findAll(data[3]) : null;
    return {verb, noun1, prep, noun2};
  }

}