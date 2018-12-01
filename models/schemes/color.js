var Scheme = require('schema-object');

module.exports.Color = new Scheme({
    value: {
        type: 'String',
        regex: /^#([a-fA-F0-9]){3,6}$/
    }
}, {
    methods: {
        
    }
}); 