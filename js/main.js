
    function rand(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function bullShit(count){
          var words = ["в принципе", "в самом деле ", "а тут", "это","ну","значит","какбэ","предположим","сами понимаете", "так-то", "типа",
          "это самое", "такскать", "по ходу", "который", "в натуре", "видишь","собственно говоря","это самое","как его","прикинь", "в целом",
          "буквально", "скажем", "буквально", "в целом", "всё такое", "я имею ввиду", "бля", "в смысле", "ну", "тот", "какой-то", "оно которое",
          "сука"];
          var bullshit = "";
          var last, one, div, a;
        for (var i = 0; i < count; i++) {
            a = rand(1, 3);
            one = rand(1, words.length-1);
            if(one == last){ one = rand(2, words.length-1); } else {
                if(a != 1) {
                    div = ', ';
                } else { div = ' '; }
                if(i == (count-1)) { div = '' }

                bullshit = div+words[one]+bullshit;
                console.log('words['+one+']'+' = '+words[one]);
                last = one;
            }
         }
         bullshit = bullshit + "...";
         return bullshit;
    }

    $(function(){
          var headerText = [ 'Здравствуйте, добро пожаловать.', 'Привет, вопрос есть', 'Как вообще дела то?'];
          var subHeaderText = ['Расскажешь историю?', 'Ну и что, какбэ, ну?',
          'Ну как там ну то, это?.', 'И че там типа того?', 'И как вообще ну там да?' ];

          var buttonText = [ 'Ну и вот, типа того, да.', 'Ага, ну, по ходу да.', 'В натуре, как есть, ну.', 'Как-то так, сука, ну.'];

          $("input[name$='name']").attr("placeholder", bullShit(6));
          $('.container h2').html(subHeaderText[rand(0, subHeaderText.length)]);
          $('.container h1').html(headerText[rand(0, headerText.length)]);
          $('#btn-mail').html(buttonText[rand(0, buttonText.length)]);
          $("textarea[name$='text']").attr("placeholder", bullShit(19));
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
            $('#btn-mail').html('Да ладно, колись уже.');
            $("textarea[name$='text']").addClass('animated shake');
            setTimeout(function() {
               $('#btn-mail').html('Пили историю и жми!');
            }, 2500);
          }
        });

    });