var Scheme = require('schema-object');

module.exports.Chatbot = new Scheme({
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
    starting_message: [{
        type: 'String',
        minLength: 1
    }],
    color_scheme: {
        primary_color: {
            type: 'String',
            required: true,
        },
        background: {
            type: 'String',
            required: true
        }
    }
}); 