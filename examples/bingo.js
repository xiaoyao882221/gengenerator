'use strict';
const gengenerator = require('../index');
const bingo = gengenerator({
  min: 0,
  max: 101,
  bonus: 30, // You can make it random
}, function * f(init) {
  const io = (min, max) => `${min} - ? - ${max}`;
  while(1) {
    let input = yield io(init.min, init.max);
    if(input <= init.min || input >= init.max) {
      console.log('Wrong input, input again');
    }
    if(input === init.bonus) {
      return 'Bingo!';
    }
    if(input < init.bonus && input > init.min) {
      init.min = input;
    } else if(input > init.bonus && input < init.max) {
      init.max = input;
    }
  }
});

bingo.next(); // Start the game
console.log(bingo.next(31).value); // 0 - ? - 31
console.log(bingo.next(29).value); // 29 - ? - 31
console.log(bingo.next(30).value); // Bingo!
