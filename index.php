<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Привет! Меня Андрей зовут.</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>

        <div class="container">
            <h1>Расскажи мне историю.</h1>
            <form action="#">
                <form method="post" action="#">
                    <input type="text" name="name" placeholder="Кто?" />
                    <textarea name="text" placeholder="Что?"></textarea>
                    <div id="btn-mail" class="btn-send yellow">Отправить</div>
            </form>
        </div>

        <script src="js/vendor/jquery-1.10.2.min.js"></script>
        <script src="js/sendmail.js"></script>
        <script src="js/cookie.js"></script>
        <script src="js/main.js"></script>

        <script>
        $(function(){

           $('#btn-mail').click( function(){

              var name = $( "input[name$='name']" ).val(),
              back = $( "input[name$='back']" ).val(),
              text = $( "textarea[name$='text']" ).val();

              var status = sendMail(name, text,
              function(){
                $('#btn-mail').removeClass('yellow').addClass('success').html('ммм.. интересно!');
              });

              if (status == 'sent'){
                $('#btn-mail').html('Подожди немного.');
              }

              if (status == 'empty'){
                $('#btn-mail').html('Напиши что нибудь.');
              }
            });

        });
        </script>

    </body>
</html>
