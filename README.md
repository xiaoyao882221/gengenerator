# gengenerator
gengenerator is a useless generator. Don't be serious. Here is also a repository to collect examples for ES6 generator.

### Install

To install the stable version
```bash
$ npm install gengenerator
```

### Examples

Define a global gengenerator
```javascript
const gengenerator = require('gengenerator');
```

**gengenerator(any, generator)**

`any` can be any primitive data types<br/>
`generator` is a generator function with one parameter

- **Infinite counter**

```javascript
const counter = gengenerator({ count: 0 }, function * f(init) {
  while(1) {
    yield init.count++;
  }
});

console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
```

- **Ticket number generator**

```javascript
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

```

- **Guess the Numbers Puzzle**

Intercept a value with `.next`. Guess a number between 1 and 100.
```javascript
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
```

Have fun !

### Contribute

We're happy to discuss and see suggestions. Feel free to contribute in order to see the power of generator.

### License

[MIT](LICENSE)

### Copyright

Copyright (C) 2016 Tony Ngan, released under the MIT License.
