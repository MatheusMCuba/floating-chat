var Cloudant = require('@cloudant/cloudant');

const cloudant = new Cloudant({ 
    account: '524d3680-d6bc-4ce3-a42a-d72a4aaf7566-bluemix',
    plugins: [
        'promises',
        { 
            iamauth: {
                iamApiKey: 'U2wJRkxqdTDvCFflpYRuoTHOSo1KsEopb-37UlgCnDxd'
            } 
        }
    ]
});

module.exports.Atlas = cloudant.db.use('atlas');