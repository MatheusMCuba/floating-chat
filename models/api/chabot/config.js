var Scheme = require('schema-object');

module.exports.ConfigBot = new Scheme({
    name:{
        type: 'String'
    },
    image: {
        type: 'String'
    },
    style:{
        type: 'String'
    },
    starting_message: [{
        type: 'String'
    }]
}, {
    methods: {
        implementStyle: function(data){
            for(let prop in data){
                let rgxp = new RegExp(`"{{${prop}}}"`, 'gmi');
                this.style = this.style.replace(rgxp, data[prop]);
            }
        }
    }
});