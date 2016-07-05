var urlutils = require('url');
var request = require('request');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '');

app.get('/', function(req, res) {
    res.render('translator', {
        title: 'Yet Another Translator'
    });
});

app.post('/', function(req, res) {
    if (!req.body.text || req.body.text == '') {
        res.render('translator', {
            title: 'Please write a word!'
        });
    } else {
        var url = urlutils.format({
            protocol: 'https',
            hostname: 'translate.yandex.net',
            pathname: 'api/v1.5/tr.json/translate',
            query: {
                key: 'trnsl.1.1.20160703T165611Z.3f81e93b1efbc536.52bb87dccc85720f151e884d8825ba920184ff6b',
                lang: req.body.lang,
                text: req.body.text
            }
        });

        request.get({ url: url, json: true },
            function(err, response, json) {
                var data = {};
                if (err || json.code != 200) {
                    data = {
                        title: 'Error: bad word - ' + req.body.text,
                        error: json.message
                    }
                } else {
                    data = {
                        title: 'Translate: ' + req.body.text + ' => ' + json.text
                    }
                }

                res.render('translator', data);
            }
        );
    }
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});