

    $(function(){

          $('.container h1').shuffleLetters({step: 10, fps: 35,callback:function(){
            $('.container h2').addClass('show').shuffleLetters();
                $("input[name$='name']").addClass('show animated flipInY');
                setTimeout(function() {
                    $("textarea[name$='text']").addClass('show animated flipInX');
                }, 500);
                setTimeout(function() {
                    $('#btn-mail').addClass('show animated fadeInDown');
                }, 1000);
                setTimeout(function() {
                 //   $('.container').addClass('animated pulse');
                }, 1500);
                 setTimeout(function() {
                     $('#btn-mail').removeClass('hide animated fadeInDown');
                     $("textarea[name$='text']").removeClass('hide animated flipInX');
                     $('.container').removeClass('hide animated pulse');
                     $('.container').removeClass('hide animated pulse');
                }, 2000);
          }});

          $('#btn-mail').click( function(){

          var name = $( "input[name$='name']" ).val(),
          text = $( "textarea[name$='text']" ).val();

          var status = sendMail(name, text,
          function(){
            $('#btn-mail').removeClass('yellow animated tada').addClass('success animated tada').html('ммм.. интересно!');
          });

          if (status == 'sent'){
            $('#btn-mail').html('Ещё одну? Потерпи.');
            $('#btn-mail').addClass('animated wobble');
          }

          if (status == 'empty'){
            $('#btn-mail').html('Напиши что нибудь.');
            $("textarea[name$='text']").addClass('animated shake');
          }
        });

    });