$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class= "message" data-message-id=${message.id}>
        <div class = "box">    
          <div class="box__data">
            <div class="name">
              ${message.user_name}
            </div>
          <div class="time">
             ${message.created_at}
        </div>
      </div>
      <div class="box__text">
        <p class="box__text__content">
          ${message.content}
        </p>
      </div>
         <img src=${message.image} >
      </div>`
     return html;
   } else {
     var html =
     `<div class= "message" data-message-id=${message.id}>
        <div class = "box">
          <div class="box__data">
            <div class="name">
             ${message.user_name}
            </div>
            <div class="time">
             ${message.created_at}
            </div>
         </div>
        <div class="box__text">
          <p class="box__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-bar__main-messages').append(html);
    $('form')[0].reset();
    $('.main-bar__main-messages').animate({ scrollTop: $('.main-bar__main-messages')[0].scrollHeight});
    $('.main-bar__main-form__submit__btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-bar__main-messages').append(insertHTML);
      $('.main-bar__main-messages').animate({ scrollTop: $('.main-bar__main-messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('更新に失敗しました');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
