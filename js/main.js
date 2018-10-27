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
       }, 300)
    });

    
    $(document).on('click', '.thumb.up', function(){
        console.log('Not')
        let self = this;
        $(self).removeClass('up');
        $('.box').removeClass('active');
        setTimeout(function(){
            $(self).removeClass('in-box');
         }, 300)
      });
      $('#send').click(function(){
          console.log('Cliq');
      });
    $('.chat-bubble span').click(function(){
        $('.chat-bubble').removeClass('active');
        setTimeout(function(){
               $('.chat-bubble').addClass('close');
        }, 300)
    });
});
