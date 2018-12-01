var express = require('express');
var cors = require('cors')
var moment = require('moment');
var fs = require('fs');

var user  = require('../models/user');
var ApiResult = require('../models/api/result').Result;

var ConfigChatbotModel = require('../models/api/chabot/config').ConfigBot;

var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var router = express.Router();
var botStyle = fs.readFileSync('./css/main.min.css', 'utf-8');

router.get('/config', async function (req, res) {
    let result = new ApiResult();
  
    let userId = req.query.h;
    let chatbotId = req.query.c;

    await user.single(userId)
      .catch(x=> result.fail(x))
      .then(x=> {
        let chatbot = Array.from(x.chatbots).find(y=> y._id == chatbotId);
        if(chatbot){
          result.data = new ConfigChatbotModel(chatbot);
          result.data.style = botStyle;
          result.data.implementStyle({
             ...chatbot.color_scheme,
             image: chatbot.image
          });
        }
        result.status = !!result.data;
      })
      .catch(x=> result.fail(x));

    res.send(result);
});

router.post('/send_message', async function(req, res){
    let result = new ApiResult();
  
    let userId = req.body.h;
    let chatbotId = req.body.c;
    let message = req.body.message;
    let context = req.body.context;

    let chatbot;

    await user.single(userId)
      .then(x=> {
        chatbot = Array.from(x.chatbots).find(y=> y._id == chatbotId);
      })
      .catch(x=> result.fail(x));
    
    if(chatbot && chatbot.auth){
       var assistant = new AssistantV1(chatbot.auth);
       let data = {
          workspace_id: chatbot.auth.workspace_id,
          input: {
            text: message
          },
          context: {}
      };
      
      if(context)
        data.context = getContext(context);

      await getAssistantResponse(assistant, data)
        .then((data) => {
            contextList[data.context.conversation_id] = data.context;
            result = {
              messages: data.output.text,
              intents: data.intents,
              context: data.context.conversation_id
          }
        });
    }

    res.send(result);
});

function getAssistantResponse(assistant, data){
   return new Promise((resolve, reject) => {
      assistant.message(data, async function(err, response){
        if(err) reject(err);
        else resolve(response);        
      });
   });
}

var contextList = { };

function getContext(context){
    return contextList[context] ? contextList[context] : null;
}

module.exports = router;