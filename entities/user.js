var firebase = require('../firebase/firebase');

var chatbot = firebase.Database.collection('user');
var usersRef = firebase.Database.collection('user');  

module.exports.getAll = function(){
    return usersRef.get();
};

module.exports.getByHashConfig = async function(hash, botHash){
    let userRef = usersRef.doc(hash);
    let user = await userRef.get().then(x=> x.data()); 
    user.chatbot = await userRef.collection('chatbot').doc(botHash).get().then(x=>x.data());

    return user;
};

module.exports.getWatsonAuthentication = async function(hash, botHash){
    let authRef = firebase.Database.ref(`user/${hash}/chatbot/${botHash}/auth`).get();
    let auth;
    await authRef.then(x=> x.forEach(y=> {
         auth = y.data();
    }))

    return auth;
};

