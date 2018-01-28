/**
 * Des
 * Created by luowei5 on 2016/10/8.
 * E-mail luowei5@jd.com
 * Update 2016/10/8
 */
var express = require('express');
var request = require('request');
var ejs = require('ejs');
var moment = require('moment');
var PORT = 8081;

var app = express();
app.listen(PORT);

app.set('views',__dirname);
app.set('view engine','html');
app.engine('html',ejs.__express);

function rnd(n,m){
    var iNum = Math.random() * (m - n + 1) + n;
    return iNum | 0;
}
var bgUrl = '//momentumdash.com/backgrounds/';
var greetings = [
    'Good morning',
    'Good afternoon',
    'Good evening'
];
var hours = moment().hours();

app.get("/", function (req, res) {
    var iGreet = 0;
    if(hours>=0 && hours<=12){
        iGreet = 0;
    }
    else if(hours>=12 && hours<=18){
        iGreet = 1;
    }
    else {
        iGreet = 2;
    }

    request({
        url: 'http://open.iciba.com/dsapi/',
        method: 'GET'
    }, function (err, response, body) {
        if(!err && response.statusCode == 200){
            var json = JSON.parse(body);

            request({
                url: 'https://momentumdash.com/app/backgrounds.json',
                method: 'GET'
            }, function (err, response, body) {
		
                if(!err && response.statusCode == 200){
                    var bg = JSON.parse(body);
                    res.render('test', {
                        time: moment().format("HH:mm"),
                        desc: greetings[iGreet]+', wonderful human.',
                        content: json.content,
                        note: json.note,
                        translation: json.translation.replace(/词霸小编/, '感悟').replace(/小编/, '我'),
                        background: 'image: url('+bgUrl + bg.backgrounds[rnd(0, bg.backgrounds.length)].filename+');'
                    });
                }
                else{
                    res.render('test', {
                        time: moment().format("HH:mm"),
                        desc: greetings[iGreet]+', wonderful human.',
                        content: json.content,
                        note: json.note,
                        translation: json.note,
                        background: 'color: f50;'
                    });
                }
            });
        }
        else{
            res.render('test', {
                time: moment().format("HH:mm"),
                desc: greetings[iGreet]+', wonderful human.',
                content: '',
                note: '',
                translation: '',
                background: ''
            });
        }
    });

});
