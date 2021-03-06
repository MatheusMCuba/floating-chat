(function(){
    'use strict';
    window.Chatbot = new function(){
        let self = this;   
        
        self.url = "http://localhost:3000/"

        self.authToken = document.currentScript.getAttribute('auth');
        self.chatToken  = document.currentScript.getAttribute('bot');
        self.context = '';
        
        self.config = {
            name: '',
            main_color: '',
            main_background: '',
            start_message: '',
            animation_ms: 300,
            messages:{
                input_placeholder: 'Digite sua mensagem...',
                time: {
                    just_now: 'agora mesmo' 
                }
            },
        };
        
        self.init = function(){
            self.configBot(function(){
                self.addCSS();
                self.addElements();
                self.addEvents();
            
                self.loadBubble(); 
                self.showStartMessage();
            });
        };

        self.helpers = {
            addClass: function(el, className){
                if (el.classList)
                    el.classList.add(className);
                else
                    el.className += ' ' + className;
            },
            hasClass: function(el, className){
                if (el.classList)
                    return el.classList.contains(className);
                else
                    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            },
            removeClass: function(el, className){
                if (el.classList)
                    el.classList.remove(className);
                else
                    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        };

        self.elements = { };

        self.templateMensagem = function(text, bot){
            let wrapper = document.createElement('message-wrapper');
            wrapper.classList = bot ? 'left' : 'right';
            let content = document.createElement('message-content');
            content.innerHTML = text;
            let messageInfo = document.createElement('message-info');
            // messageInfo.innerHTML = self.config.messages.time.just_now;
            messageInfo.innerHTML = '';
            wrapper.appendChild(content);
            wrapper.appendChild(messageInfo);
            wrapper.trigger = function(){
                let self = this;
                setTimeout(function(){
                    self.classList += " sended";
                }, 1);
            };

            return wrapper;
        };

        self.addMensagemBot = function(text){
            let mensagem = self.templateMensagem(text, true);            
            mensagem = self.elements.content.appendChild(mensagem);
            self.elements.content.scrollTop = self.elements.content.scrollHeight;
            mensagem.trigger();
        };

        self.addMensagemUser = function(text){
            let mensagem = self.templateMensagem(text, false);
            mensagem = self.elements.content.appendChild(mensagem);
            self.elements.content.scrollTop = self.elements.content.scrollHeight;
            mensagem.trigger();
        };

        self.configBot = function(fn){
            get(self.url + 'api/chatbot/config', {
                h: self.authToken,
                c: self.chatToken
            }, function(result){
                result = JSON.parse(result);
                if(result.status){
                    self.config.name = result.data.name;
                    self.config.style = result.data.style;
                    self.config.start_message = result.data.starting_message[Math.floor(Math.random() * result.data.starting_message.length)];
                    fn();
                }
            }, function(e){
                console.log(e);
            })
        };

        self.addCSS = function(){
            let style = document.createElement("style");
            style.innerHTML = self.config.style;
            document.body.appendChild(style);
        }

        self.addElements = function(){
            self.elements.bubbleWrapper = document.createElement('bubble-wrapper');
            self.elements.bubble = document.createElement('chat-bubble');
            self.elements.start_message = document.createElement('bubble-message');
            self.elements.close_message = self.icon('close');
            self.elements.start_message.appendChild(self.elements.close_message);
            self.elements.start_message.innerHTML += self.config.start_message;
            self.elements.bubbleWrapper.appendChild(self.elements.start_message);
            self.elements.bubbleWrapper.appendChild(self.elements.bubble);

            self.elements.chat_box = document.createElement('chat-box');

            self.elements.header = document.createElement('header');
            self.elements.name = document.createElement('h3');
            self.elements.name.innerText = self.config.name;
            self.elements.close_button = document.createElement('button');
            self.elements.close_button.appendChild(self.icon('close'));
            self.elements.header.appendChild(self.elements.close_button);
            self.elements.header.appendChild(self.elements.name);
            self.elements.chat_box.appendChild(self.elements.header);

            self.elements.content = document.createElement('chat-content');
            self.elements.chat_box.appendChild(self.elements.content);

            self.elements.footer = document.createElement('footer');
            self.elements.send_button = document.createElement('button');
            self.elements.send_button.classList = "no-glow";
            self.elements.send_button.appendChild(self.icon('paper-plane'));

            self.elements.input = document.createElement('input');
            self.elements.input.type = "text";
            self.elements.input.classList = "no-glow";
            self.elements.input.id = "text";
            self.elements.input.placeholder = self.config.messages.input_placeholder;

            self.elements.footer.appendChild(self.elements.input);
            self.elements.footer.appendChild(self.elements.send_button);
            self.elements.chat_box.appendChild(self.elements.footer);

            self.elements.backdrop = document.createElement('chat-backdrop');

            document.body.appendChild(self.elements.backdrop);
            document.body.appendChild(self.elements.bubbleWrapper);
            document.body.appendChild(self.elements.chat_box);
        };

        self.addEvents = function(){
            self.elements.bubble.addEventListener('click', function(){
                if(!self.helpers.hasClass(self.elements.bubble, 'up'))
                    self.openChatbox();
            });

            self.elements.close_button.addEventListener('click', self.closeChatbox);
            self.elements.close_message.addEventListener('click', self.closeStartMessage);
            self.elements.send_button.addEventListener('click', self.sendMessage);
            self.elements.input.addEventListener('keydown', function(e){
                if(e.keyCode == 13) self.elements.send_button.click();
            });
        };

        self.closeChatbox = function(){
            self.helpers.removeClass(self.elements.backdrop, 'active');
            self.helpers.removeClass(self.elements.bubble, 'up');
            self.helpers.removeClass(self.elements.chat_box, 'active');
            setTimeout(function(){
                self.helpers.removeClass(self.elements.bubble, 'in-box');
                Array.from(document.querySelectorAll('message-wrapper')).forEach(function(el){
                    self.helpers.removeClass(el, 'sended');
                });  
            }, self.config.animation_ms);
        };

        self.openChatbox = function(){
            self.helpers.addClass(self.elements.bubble, 'in-box');
            self.helpers.removeClass(self.elements.start_message, 'active');
            setTimeout(function(){
                self.helpers.addClass(self.elements.bubble, 'up');
                self.helpers.addClass(self.elements.start_message, 'close');
                self.helpers.addClass(self.elements.backdrop, 'active');                
                self.helpers.addClass(self.elements.chat_box, 'active');
                self.elements.content.scrollTop = self.elements.content.scrollHeight;
                setTimeout(function(){
                    Array.from(document.querySelectorAll('message-wrapper')).forEach(function(el){
                        self.helpers.addClass(el, 'sended');
                    });                
                }, self.config.animation_ms);
            }, self.config.animation_ms);
        };

        self.showStartMessage = function(){
            setTimeout(function(){
                self.elements.start_message.classList = "active";
             }, 1000);
        };

        self.sendMessage = function(){
            let text = self.elements.input.value;
            if(!text) return;
            self.elements.input.value = '';
            self.addMensagemUser(text);

            var data = {
                message: text,
                context: self.context,
                h: self.authToken,
                c: self.chatToken
            };

            sendRequest(self.url + "api/chatbot/send_message", function(data){
                self.context = data.context;
                Array.from(data.messages).forEach(function(message){
                    self.addMensagemBot(message);
                });
            }, data);
        };

        self.closeStartMessage = function(){
            self.helpers.removeClass(self.elements.start_message, 'active');
            setTimeout(function(){
                self.helpers.addClass(self.elements.start_message, 'close');
            }, self.config.animation_ms);
        };

        self.loadBubble = function(){
            setTimeout(function(){
                self.elements.bubble.classList = "loaded";
            }, self.config.animation_ms);
        };

        self.messageTempate = '';

        self.icon = function(iconClass){
            let span = document.createElement("span");
            span.classList = "icon icon-"+iconClass;
            return span;
        };
    };

    ready(function(){
        window.Chatbot.init();
    });

    function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function sendRequest(url,callback,postData) {
        var req = createXMLHTTPObject();
        if (!req) return;
        var method = (postData) ? "POST" : "GET";
        req.open(method,url,true); 
        if (postData)
            req.setRequestHeader('Content-type','application/json');

        req.onreadystatechange = function () {
            if (req.readyState != 4) return;
            if (req.status != 200 && req.status != 304) {
                return;
            }

            if(callback && typeof callback == "function") callback(JSON.parse(req.responseText));
        }
        if (req.readyState == 4) return;
        req.send(postData ? JSON.stringify(postData) : {});
    }
    
    var XMLHttpFactories = [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];
    
    function createXMLHTTPObject() {
        var xmlhttp = false;
        for (var i=0;i<XMLHttpFactories.length;i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }

    function post(url, data, success, error){
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(data);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                success(request.responseText);
            } else {
                error(request.responseText);
            }
        };
    }

    function get(url, data, success, error){
        var request = new XMLHttpRequest();

        let int = '?';
        for(let prop in data){
            console.log(data)
            url += int += prop + '=' +data[prop];
            int = '&';
        }

        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                success(request.responseText);
            } else {
                error(request.responseText);
            }
        };

        request.onerror = function() {
        // There was a connection error of some sort
        };
        request.send();
    }
})();