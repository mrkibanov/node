var prompt = require('prompt');
var colors = require('colors/safe');

prompt.message = '';
prompt.delimiter = ':';

var first = 0;
var last = 100;
var count = 1;

var schema = {
    properties: {
        answer: {
            description: colors.cyan('Your answer'),
            message: 'This field is required',
            required: true
        }
    }
};

console.log('Hi! Let\'s play a game!');
console.log('You can write "+", "-" or "yes"');
console.log('===============================');
console.log('Your number is ' + colors.cyan('50!'));

prompt.start();

var getGame = function(schema) {
    prompt.get(schema, function(err, result) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        if ((result.answer === '+' || result.answer === '-') || result.answer === 'yes') {
            if (result.answer === 'yes') {
                console.log('===============================');
                console.log('Thank\'s for game. It was to easy for me, because this code wrote a genius!');
                console.log('I\'m guessing your number in ' + colors.cyan(count) + ' steps!');
                process.exit(0);
            }

            if (result.answer === '+') {
                first = getNumber(first, last);
                var newNumber = getNumber(first, last);
                if (newNumber === first) {
                    console.log('===============================');
                    console.log('Thank\'s for game. It was to easy for me, because this code wrote a genius!');
                    console.log('Your number is ' + colors.cyan(newNumber + '!'));
                    console.log('I\'m guessing your number in ' + colors.cyan(count) + ' steps!');
                    process.exit(0);
                }
                console.log('Your number is ' + colors.cyan(newNumber + '!'));
                getGame(schema);
                count++;
            }

            if (result.answer === '-') {
                last = getNumber(first, last);
                var newNumber = getNumber(first, last);
                if (newNumber === last) {
                    console.log('===============================');
                    console.log('Thank\'s for game. It was to easy for me, because this code wrote a genius!');
                    console.log('Your number is ' + colors.cyan(newNumber + '!'));
                    console.log('I\'m guessing your number in ' + colors.cyan(count) + ' steps!');
                    process.exit(0);
                }
                console.log('Your number is ' + colors.cyan(newNumber + '!'));
                getGame(schema);
                count++;
            }
        } else {
            console.log(colors.yellow('Warning!') + ' Please write a valid data! You can write "+", "-" or "yes"');
            getGame(schema);
        }
    })
};

var getNumber = function(first, last) {
    var result = first + (last - first) / 2;
    if (result >= 99.5) return 100;
    return Math.floor(result);
};

getGame(schema);