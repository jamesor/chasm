'use strict';

class InputUtils {

  static parse(data) {
    var verb  = data[0];
    var prepList = PrepLookup[verb];
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
    if (!input.noun1) {
      return `You do not see the ${input.noun1.term} here.`;
    }
    else if (!input.noun1.item) {
      return input.noun1.output;
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

  static testAction(input) {
    var result = input.noun1.item.canDo(input.verb);
    if (typeof result === 'string') {
      return result;
    } else if (result === false) {
      return `The ${input.noun1.term} isn't something you can ${input.verb}.`;
    }
  }

  static testActionWithTarget(input) {
    if (!input.noun1.item.canDoWith(input.verb, input.noun2.item.title)) {
      return `You cannot ${input.verb} the ${input.noun1.term} ${input.prep} the ${input.noun2.item.term}.`;
    }
  }

  static testVerbNoun(input) {
    return InputUtils.testVerb(input) ||
           InputUtils.testNoun1(input) ||
           InputUtils.testAction(input);
  }

  static testVerbNounPrepNoun(input) {
    return InputUtils.testVerb(input) ||
           InputUtils.testNoun1(input) ||
           InputUtils.testPrep(input) ||
           InputUtils.testNoun2(input) ||
           InputUtils.testActionWithTarget(input);
  }

}