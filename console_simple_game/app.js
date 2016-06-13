var argv = require('minimist')(process.argv.slice(2));
var prompt = require('prompt');
var colors = require('colors/safe');
var fs = require('fs');
var sugar = require('sugar');

var scores = argv['showscores'] || false;
var scoreFile = 'score.txt';

prompt.message = '';
prompt.delimiter = colors.cyan(':');

if (scores) {
    fs.readFile(scoreFile || 'score.txt', function(err, data) {
        var beginRead = process.hrtime()[1];
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            var text = data.toString().lines().remove('');
            var regEx = /Win:User;/gm;
            var count = 0;
            while (regEx.exec(text) !== null) {
                count++;
            }

            console.log(colors.blue('=============================='));
            console.log('User win: ' + colors.cyan(count));
            console.log('User lose: ' + colors.cyan(text.length - count));
            console.log('Total games: ' + colors.cyan(text.length));

            console.log(colors.blue('=============================='));
            var endRead = process.hrtime()[1];
            console.log('Done in ' + (endRead - beginRead) + ' nanoseconds');
        }
    });
} else {
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

    console.log(colors.blue('Hi! Let\'s play a game!'));
    console.log(colors.blue('Please write a number from 0 to 9'));
    prompt.start();
    prompt.get(schema, function(err, result) {
        console.log(colors.rainbow('=============================='));

        setTimeout(function() {
            var randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
            var score;

            fs.readFile(scoreFile || 'score.txt', function(err, data) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } else {
                    var text = data.toString().lines().remove('');
                    var gameNumber = text.length + 1;

                    if (result.number == randomNumber) {
                        console.log(colors.cyan('You Win!'));
                        console.log('My number was: ' + colors.cyan(randomNumber));
                        score = 'Game:#' + gameNumber + '; User:' + result.number + '; Computer:' + randomNumber + '; Win:User;' + '\n';
                    } else {
                        console.log(colors.red('You lose!'));
                        console.log('My number was: ' + colors.red(randomNumber));
                        score = 'Game:#' + gameNumber + '; User:' + result.number + '; Computer:' + randomNumber + '; Win:Computer;' + '\n';
                    }

                    fs.appendFile(scoreFile || 'score.txt', score, function(err) {
                        if (err) console.log(err);
                    });
                }
            });
        }, 500);
    });
}