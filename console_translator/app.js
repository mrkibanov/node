var prompt = require('prompt');
var request = require('request');

prompt.start();
prompt.get('t', function (err, result) {
    if (err) {
        console.error(err);
    } else {
        var APIKey = 'trnsl.1.1.20160703T165611Z.3f81e93b1efbc536.52bb87dccc85720f151e884d8825ba920184ff6b';
        var text = result.t;
        var lang = 'ru';
        var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + APIKey + '&text=' + text + '&lang=' + lang;

        request.get({
                url: url,
                json: true
            },
            function(err, response, body) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(body.text[0]);
                }
            }
        );
    }
});