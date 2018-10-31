var firebase = require('firebase-admin');
var serviceAccount = require('./firebaseServiceAccount.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://atlas-chat-bot.firebaseio.com"
});

module.exports.Database = firebase.firestore();