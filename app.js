var prompt = require('prompt');
var colors = require('colors/safe');

prompt.message = '';
prompt.delimiter = ':';

var schema = {
    properties: {
        number: {
            description: colors.cyan('Number'),
            pattern: /^[0-9]$/,
            message: 'This field must be only number and have only 1 character',
            required: true
        }
    }
};

prompt.start();
prompt.get(schema, function(err, result) {

    setTimeout(function() {
        var randomNumber = Math.floor(Math.random() * (9 - 0) + 0);

        if (result.number == randomNumber) {
            console.log(colors.cyan('You Win!'));
            console.log('My number was: ' + colors.cyan(randomNumber));
        } else {
            console.log(colors.red('You lose!'));
            console.log('My number was: ' + colors.red(randomNumber));
        }

    }, 500);
});