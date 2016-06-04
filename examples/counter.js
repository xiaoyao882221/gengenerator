'use strict';
const gengenerator = require('../index');
const counter = gengenerator({ count: 0 }, function * f(init) {
  while(1) {
    yield init.count++;
  }
});

console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
