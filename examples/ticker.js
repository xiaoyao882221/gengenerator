'use strict';
const gengenerator = require('../index');
const ticker = gengenerator({
  index: 1,
  day: new Date().toISOString().substring(0, 10)
}, function * f(init) {
  while(1) {
    let today = new Date().toISOString().substring(0, 10);
    if(init.day !== today) {
      init.day = today;
      init.index = 1;
    }
    yield `${init.day}-${init.index++}`;
  }
});

console.log(ticker.next().value); // 2016-01-01-1
console.log(ticker.next().value); // 2016-01-01-2
console.log(ticker.next().value); // 2016-01-01-3
// Run in next day, maybe change your system time right now and test it
console.log(ticker.next().value); // 2016-01-02-1
