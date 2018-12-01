var db = require('../domain/database');

var Chatbot = require('./schemes/chatbot').Chatbot; 

module.exports.single = function(id, params){
    return db.single(id, { ...params, type: 'chatbot' });
};

module.exports.insert = function(obj){
    let chatbot = new Chatbot({ ...obj });
    console.log(chatbot.getErrors());
};