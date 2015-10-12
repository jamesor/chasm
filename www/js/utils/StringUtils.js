'use strict';

class StringUtils {
  static setChars(str, len) {
    var result = str;
    while (result.length < len) {
      result += ' ';
    }
    return result.substr(0, len);
  }
}