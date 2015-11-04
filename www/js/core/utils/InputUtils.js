'use strict';

class InputUtils {

  static tokenize(input) {
    var tokens = input.split(/\s+/);
    var token;

    for (let i=tokens.length-1; i>=0; i--) {
      token = tokens[i];
      if (nArticles[token]) {
        tokens.splice(i, 1);
      } 
      else if (nVocabulary[token]) {
        if (tokens.length > i) {
          token += ' ' + tokens[i+1];
          if (nItems[token] || nTwoWordVerbs[token]) {
            tokens[i] = token;
            tokens.splice(i+1, 1);
          }
        }
      }
      else {
        return `I don't know the word ${token}`;
      }
    }

    if (tokens.length === 0) {
      return 'I beg your pardon?';
    }

    return tokens;
  }

  static parse(data) {
    var verb  = data[0];
    var prepList = PrepLookup[verb];
    var noun1 = (data[1]) ? ItemsProxy.findAll(data[1]) : null;
    var prep  = (data[2] && (prepList && prepList.indexOf(data[2]) !== -1)) ? data[2] : null;
    var noun2 = (data[3]) ? ItemsProxy.findAll(data[3]) : null;
    var item, target;

    if (noun1) {
      item = noun1.item;
    }

    if (noun2) {
      target = noun2.item;
    }

    prep = prep || (prepList) ? prepList[0] : null;

    return {verb, noun1, prep, noun2, item, target};
  }

  static testVerb(input) {
    if (!input.item) {
      return `What do you want to ${input.verb}?`;
    }
  }

  static testNoun1(input) {
    if (input.noun1 && input.noun1.output) {
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
    else if (input.noun2.output) {
      return input.noun2.output;
    }
    else if (input.item === input.target) {
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
    var result = input.item.canDo(input.verb);
    if (typeof result === 'string') {
      return result;
    } else if (result === false) {
      return `The ${input.noun1.term} isn't something you can ${input.verb}.`;
    }
  }

  static testActionWithTarget(input) {
    if (!input.item.canDoWith(input.verb, input.target.title)) {
      return `You cannot ${input.verb} the ${input.noun1.term} ${input.prep} the ${input.noun2.term}.`;
    }
  }

  static testVerbItem(input) {
    return InputUtils.testVerb(input) ||
           InputUtils.testNoun1(input) ||
           InputUtils.testAction(input);
  }

  static testVerbItemWithTarget(input) {
    return InputUtils.testVerb(input) ||
           InputUtils.testNoun1(input) ||
           InputUtils.testPrep(input) ||
           InputUtils.testNoun2(input) ||
           InputUtils.testActionWithTarget(input);
  }

}