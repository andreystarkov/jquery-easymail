
    /*
         Simple JQuery Mail Send.
         by Andrey Starkov
         im@andreystarkov.ru
    */

    function sendMail(name, text, onSuccess){
      var sent = $.cookie('sent');
      var date = new Date();
      var minutes = 5;

      date.setTime(date.getTime() + (minutes * 60 * 1000));

      // sent = 'no';

      if(text == ''){ return 'empty'; }

      if(sent != 'yes'){

          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: {
              'name': name,
              'text': text
            },
            success: function(msg){
              $.cookie('sent', 'yes', { expires: date });
              onSuccess();
            }
          });

      } else return 'sent';
    }
