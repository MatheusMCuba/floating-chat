let template = '<message-wrapper class="{0}"><message-content>{1}</message-content><message-info>{2}</message-info></message-wrapper>'
let randomPharses = [
    'What is your favorite color?',
    'Great!',
    'How do you find me?'
];

if (!String.format) {
    String.format = function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number] 
          : match
        ;
      });
    };
  }

$(function(){

    setTimeout(function(){
        $('chat-bubble').addClass('loaded');
        setTimeout(function(){
           $('bubble-message').addClass('active');
        }, 1000);
    }, 500);

    $(document).on('click', 'chat-bubble:not(.up)', function(){
        let self = this;
        $('bubble-message').removeClass('active');
        $(self).addClass('in-box');
        setTimeout(function(){
            $(self).addClass('up');
            $('chat-backdrop').addClass('active');            
            $('chat-box').addClass('active');
            $('bubble-message').addClass('close');
            $('chat-content').scrollTop($('chat-content')[0].scrollHeight);
            setTimeout(() => {
                $('message-wrapper').addClass('sended');      
            }, 300);
        }, 300)
    });
});

    
$(document).on('click', '#close-chat', function(){
    let self = $('chat-bubble');
    $('chat-backdrop').removeClass('active');   
    $(self).removeClass('up');
    $('chat-box').removeClass('active');
    setTimeout(function(){
        $(self).removeClass('in-box');
        $('message-wrapper').removeClass('sended'); 
    }, 300);
});

$('#userInput').on('keydown', function(e){
    if(!this.value)
        return;
    if(e.keyCode == 13){
        $('#send').click();
    }
})
$('#send').click(function(){
    NovaMensagem($('#userInput').val(),false);
    $('#userInput').val('');
});

$('bubble-message span').click(function(){
    $('bubble-message').removeClass('active');
    setTimeout(function(){
        $('bubble-message').addClass('close');
    }, 300)
});

function NovaMensagem(mensagem, bot){
    let message = String.format(template, bot ? 'left' : 'right', mensagem, 'just now');
    $('chat-content').append(message);
    $('chat-content').scrollTop($('chat-content')[0].scrollHeight);
    $('message-wrapper').addClass('sended');
}
