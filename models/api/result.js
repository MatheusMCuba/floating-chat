var Scheme = require('schema-object');

module.exports.Result = new Scheme({
    status: {
        type: 'Boolean',
        default: false
    },
    data: {
        type: 'any'
    },
    messages: [{
        type: 'String'
    }]
}, {
    methods: {
        setErrorMessage: (error) => this.messages.push(error),
        success: () => this.status = true,
        fail: (error) => {
            this.status = false;
            if(error) this.messages.push(error);
        }
    }
});