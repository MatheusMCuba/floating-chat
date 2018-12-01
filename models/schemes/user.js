var Scheme = require('schema-object');
var Chatbot = require('./chatbot').Chatbot;

module.exports.User = new Scheme({
    name: {
        type: 'String',
        required: true,
        minLength: 3,
        maxLength: 40
    },
    image: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
    },
    chatbots: [ Chatbot ]
}); 