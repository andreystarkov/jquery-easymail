
    function rand(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function bullShit(count){
        var words = ["в принципе", "в самом деле", "а тут", "это","ну","значит","какбэ","предположим","сам понимаешь", "так-то", "типа",
        "это самое", "такскать", "по ходу", "который", "в натуре", "видишь","собственно говоря","это самое","как его","прикинь", "в целом",
        "буквально", "скажем", "хотя нет","в целом", "ну а вообще", "или как", "всё такое", "я имею ввиду", "бля", "в смысле",
        "ну", "тот", "какой-то", "оно которое", "сука", "по существу", "в общем", "или", "хотя да", "блин", "кстате", "а именно",
        "короче", "просто", "нет", "а да", "пожалуй", "в принципе", "на самом деле", "судя по всему", "думал это", "оказалось", "пиздец",
        "другой", "тот же", "тлен", "ништяки", "вероятно", "в кон", "но хуй там", "боль", "какарды там", "заебись же",
        "вообще", "охуенно же"];
        var bullshit = "";
        var last, one, div, a;
        for (var i = 0; i < count; i++) {
            a = rand(1, rand(3,5));
            one = rand(1, words.length-1);
            if(one == last){ one = rand(2, words.length-1); } else {
                if(a != 1) { div = ', '; } else { div = ' '; }
                if(i == (count-1)) { div = ''; }
                bullshit = div+words[one]+bullshit;
                last = one;
            }
        }
        return bullshit;
    }

    function generateAll(){

        var headerText = [ 'Здравствуйте, '+bullShit(rand(1,4))+'.', 'Привет, или '+bullShit(rand(1,4))+'.', 'Здарова, '+bullShit(rand(1,4))+'.',
        'Добро пожаловать, '+bullShit(rand(1,4))+'.'];
        var subHeaderText = ['Ну то, '+bullShit(rand(1,3))+'?', 'Как дела, или '+bullShit(rand(1,2))+'?', 'Ну как там '+bullShit(rand(1,2))+'?',
        'Идею запилишь, или '+bullShit(1)+'?','Рассказывай давай, '+bullShit(1)+'.', 'Или че там '+bullShit(1)+'?', 'Что там, '+bullShit(rand(1,3))+'?'];
        var buttonText = [ 'Ну и вот, '+bullShit(2)+'.', 'Так всё и было, '+bullShit(2)+'.', 'Кароче шлю, '+bullShit(2)+'.', 'Отправить, '+bullShit(2)+'.'];
        var nameField = [ 'Я этот, как его, '+bullShit(4)+"...", 'Ну тот я, который, '+bullShit(4)+'...', 'Я тот, который он, или '+bullShit(4)+'...'];
        var textField = [ 'Тут такие дела кароче, '+bullShit(22)+"...", 'Ну и вот, '+bullShit(24)+'...', 'История в том, что '+bullShit(22)+'...',
        'И я вот, кароче '+bullShit(22)+'...', 'Думаю вот что — '+bullShit(22)+'...'];

        var subHeader = rand(0, (subHeaderText.length-1));
        var header = rand(0, (headerText.length-1));
        var name = nameField[rand(0, (nameField.length-1))];
        var text = textField[rand(0, (textField.length-1))];
        $('.container h2').html(subHeaderText[subHeader]);
        $('.container h1').html(headerText[header]);
        $('#btn-mail').html(buttonText[rand(0, (buttonText.length-1))]);

        $('.container h1').addClass('show animated pulse').shuffleLetters({step: 10, fps: 35,callback:function(){
            $('.container h2').addClass('show').shuffleLetters();
            $("input[name$='name']").attr("placeholder", name);
            $("input[name$='name']").addClass('show animated flipInY');
            setTimeout(function() {
                $("textarea[name$='text']").attr("placeholder", text);
                $("textarea[name$='text']").addClass('show animated flipInX');
            }, 500);
            setTimeout(function() {
                $('#btn-mail').addClass('show animated fadeInDown');
                $('#btn-fresh').addClass('show animated fadeInUp');
            }, 1000);
             setTimeout(function() {
                 $('#btn-mail').removeClass('hide animated fadeInDown');
                 $('#btn-fresh').removeClass('hide animated fadeInUp');
                 $("input[name$='name']").removeClass('hide animated flipInY');
                 $("textarea[name$='text']").removeClass('hide animated flipInX');
                 $('.container h1').removeClass('hide animated pulse');
                 $('.container h2').removeClass('hide animated pulse');
            }, 2000);
            $('#btn-mail').addClass('true');
        }});

    }

    function sectorClear(){
        setTimeout(function() {
             $('#btn-mail').removeClass('show animated fadeInDown').addClass('hide').css({opacity: 1});
             $('#btn-fresh').removeClass('show animated fadeInUp').addClass('hide').css({opacity: 1});
             $("input[name$='name']").removeClass('show animated flipInY').addClass('hide').css({opacity: 1});
             $("textarea[name$='text']").removeClass('show animated flipInX').addClass('hide').css({opacity: 1});
             $('.container h1').removeClass('animated pulse');
             $('.container h2').removeClass('show animated pulse').addClass('hide').css({opacity: 1});
             $('.container').removeClass('animated fadeOutUpBig');
             setTimeout(function() {
              generateAll();
             }, 100);
         },150);
    }

    function collapseSteps(time){
        $('#btn-fresh').animate({opacity:0}, time, function(){
            $('#btn-mail').animate({opacity:0}, time, function(){
                $("textarea[name$='text']").animate({opacity:0}, time, function(){
                    $("input[name$='name']").animate({opacity:0}, time, function(){
                        $('.container h2').animate({opacity:0}, time, function(){
                            sectorClear();
                        });
                    });
                });
            });
        });
    }

    $(function(){

          generateAll()

          $('#btn-fresh').click(function(){
                      if($('#btn-mail').hasClass('true')){
                                $('.container').addClass('animated fadeOutUpBig');
                                sectorClear();
                      }
          });

          $('#btn-mail').click( function(){

              var name = $( "input[name$='name']" ).val(),
              text = $( "textarea[name$='text']" ).val();

              var status = sendMail(name, text,
              function(){
                $('#btn-mail').removeClass('yellow animated tada').addClass('success animated tada').html('От души '+bullShit(3)+'!');
              });

              if (status == 'sent'){
                $('#btn-mail').html('Пару минут жди прям '+bullShit(2)+'!');
                $('#btn-mail').addClass('animated wobble');
              }

              if (status == 'empty'){
                $('#btn-mail').html('Мало букв '+bullShit(2)+".");
                $("textarea[name$='text']").addClass('animated shake');
                setTimeout(function() {
                   $('#btn-mail').html('Давай пиши уже, '+bullShit(2)+".");
                }, 3500);
              }
         });

    });