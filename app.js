var firebase = require('./firebase/firebase');
var express = require('express');
var fs = require('fs');
var app = express();

var users = require('./entities/user');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/loadBotConfig', async function(req, res){
    let user = await users.getByHashConfig(req.query.h, req.query.c);
    let config = { };
    config.config = user;
    config.style = replaceObj(fs.readFileSync('./css/main.min.css', 'utf-8'), user.chatbot);
    res.send(config);
});

app.get('/script', function(req, res){
    console.log(req.query.t);
});

function replaceObj(string, obj){
    for(let prop in obj){
        let rgxp = new RegExp(`"{{${prop}}}"`, 'gmi');
        string = string.replace(rgxp, obj[prop]);
    }
    return string;
}

app.listen(3000);