'use strict';

class InputUtils {
  
  static parse(data, prepList) {
    var verb  = data[0];
    var noun1 = (data[1]) ? ItemsProxy.findAll(data[1]) : null;
    var prep  = (data[2] && (prepList && prepList.indexOf(data[2]) !== -1)) ? data[2] : null;
    var noun2 = (data[3]) ? ItemsProxy.findAll(data[3]) : null;
    var validPrep = (prepList) ? prepList[0] : null;
    return {verb, noun1, prep, noun2, validPrep};
  }

  static testVerb(input) {
    if (!input.noun1) {
      return `What do you want to ${input.verb}?`;
    }
  }

  static testNoun1(input) {
    if (!input.noun1.item) {
      return input.noun1.output;
    }
    else if (!input.noun1) {
      return `You do not see the ${input.noun1.term} here.`;
    }
  }

  static testPrep(input) {
    if (!input.prep) {
      return `What do you want to ${input.verb} the ${input.noun1.term} ${input.validPrep}?`;
    }
  }

  static testNoun2(input) {
    if (!input.noun2) {
      return `What do you want to ${input.verb} the ${input.noun1.term} ${input.prep}?`;
    }
    else if (!input.noun2.item) {
      return input.noun2.output;
    }
    else if (input.noun1.item === input.noun2.item) {
      return 'I should recurse infinitely to teach you a lesson, but...';
    }
  }

  static getAlreadyDoneResponse() {
    let resp = [
      'I think you\'ve already done that.',
      'You think it isn\'t?',
      'Look around.'
    ];
    return resp[MathUtils.getRandomInt(0, resp.length)];
  }

  static testVerbNoun(input) {
    var output = InputUtils.testVerb(input);
    if (output) return output;
    output = InputUtils.testNoun1(input);
    if (output) return output;
  }

  static testVerbNounPrepNoun(input) {
    var output = InputUtils.testVerbNoun(input);
    if (output) return output;
    output = InputUtils.testPrep(input);
    if (output) return output;
    output = InputUtils.testNoun2(input);
    if (output) return output;
  }

  static testUsage(input) {
    if (input.noun1 && input.noun2) {
      if (!input.noun1.item.usage[input.verb]) {
        return `The ${input.noun1.term} isn't something you can ${input.verb}.`;
      }
      else if (input.noun1.item.usage[input.verb].indexOf(input.noun2.item.title) === -1) {
        return `The ${input.noun1.term} can't be used with the ${input.noun2.term}.`;
      }
    }
  }

}