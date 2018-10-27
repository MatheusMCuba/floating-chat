let template = '<div class="message {0}"><div class="message-content">{1}</div><div class="message-info">{2}</div></div>'
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
       $('.chat-bubble').addClass('active');
    }, 1000);

    $(document).on('click', '.thumb:not(.up)', function(){
      let self = this;
       $('.chat-bubble').removeClass('active');

       $(self).addClass('in-box');
       setTimeout(function(){
          $(self).addClass('up');
          $('.box').addClass('active');
          $('.chat-bubble').addClass('close');
    $('.body-messages').scrollTop($('.body-messages')[0].scrollHeight);
          setTimeout(() => {
            $('.message').addClass('sended');      
          }, 300);
       }, 300)
    });
});

    
$(document).on('click', '.thumb.up', function(){
    let self = this;
    $(self).removeClass('up');
    $('.box').removeClass('active');
    setTimeout(function(){
        $(self).removeClass('in-box');
        $('.message').removeClass('sended'); 
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
$('.chat-bubble span').click(function(){
    $('.chat-bubble').removeClass('active');
    setTimeout(function(){
        $('.chat-bubble').addClass('close');
    }, 300)
});

function NovaMensagem(mensagem, bot){
    let message = String.format(template, bot ? 'left' : 'right', mensagem, 'just now');
    $('.body-messages').append(message);
    $('.body-messages').scrollTop($('.body-messages')[0].scrollHeight);
    $('.message').addClass('sended');
}
