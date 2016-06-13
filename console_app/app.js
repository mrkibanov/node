var argv = require('minimist')(process.argv.slice(2));
var prompt = require('prompt');
var colors = require('colors/safe');

prompt.override = argv;
prompt.message = '';
prompt.delimiter = colors.cyan(':');

var schema = {
    properties: {
        name: {
            description: colors.cyan('name'),
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
        password: {
            description: colors.cyan('password'),
            hidden: true,
            required: true,
            message: 'You must write your password'
        }
    }
};

prompt.start();

prompt.get(schema, function(err, result) {
    console.log('Your name is: ' + result.name);
    console.log('And your password is: ' + result.password);
    console.log('That is all!');
});