class MathUtils {
  // Returns true or false randomly
  static getRandomBoolean() {
    return !!Math.floor(Math.random() * 2);
  }
  
  // Returns a random number between 0 (inclusive) and 1 (exclusive)
  static getRandom() {
    return Math.random();
  }

  // Returns a random number between min (inclusive) and max (exclusive)
  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Returns a random integer between min (included) and max (excluded)
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Returns a random integer between min (included) and max (included)
  static getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}