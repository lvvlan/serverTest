/**
 * Des
 * Created by luowei5 on 2016/10/8.
 * E-mail luowei5@jd.com
 * Update 2016/10/8
 */
var express = require('express');
var request = require('request');
var PORT = 8081;

var app = express();
app.listen(PORT);

function rnd(n,m){
    var iNum = Math.random() * (m - n + 1) + n;
    return iNum | 0;
}
function toDou(num) {
    if(num < 10){
        return '0' + num;
    }
    else {
        return '' + num;
    }
}
var bgUrl = '//momentumdash.com/backgrounds/';

app.get("/", function (req, res) {
    //res.sendFile(__dirname+'/index.html');
    res.sendFile('/index.html', {root: __dirname});
});

app.get('/background', function (req, res) {
    request({
         url: 'https://momentumdash.com/app/backgrounds.json',
         method: 'GET'
    }, function (err, response, body) {
         if(!err && response.statusCode == 200){
             var json = JSON.parse(body);

             res.send({
                 code: 200,
                 bgUrl: bgUrl + json.backgrounds[rnd(0, json.backgrounds.length)].filename
             });
         }
         else{
            res.send({
                code: response.statusCode,
                msg: err
            })
         }
    });
});