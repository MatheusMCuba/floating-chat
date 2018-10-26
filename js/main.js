$(function(){
    setTimeout(function(){
       $('.chat-bubble').toggleClass('active');
    }, 1000);
    $('.thumb').click(function(){
      let self = this;
       $('.chat-bubble').removeClass('active');

       $(self).toggleClass('in-box');
       setTimeout(function(){
          $(self).toggleClass('up');
          $('.box').toggleClass('active');
       }, 300)
    });
    $('.chat-bubble span').click(function(){
        $('.chat-bubble').toggleClass('active');
    });
});
