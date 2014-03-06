<?php

    /*
        Simple JQuery Mail Send Demo.
        by Andrey Starkov.
        im@andreystarkov.ru
    */

    $name = stripslashes($_POST[name]);
    $text = stripslashes($_POST[text]);

    $referer = $_POST[referer];
    $remote_host = $_SERVER[REMOTE_ADDR];
    $server = $_SERVER[SERVER_NAME];
    $browser = $_SERVER[HTTP_USER_AGENT];
    $sent = $_COOKIE['sent'];

    $sendto = 'im@andreystarkov.ru';
    $subject = 'New message from '.$name;
    $header = "From: root@webscapes.ru\r\nReply-To: root@webscapes.ru\r\n";

    $cooldown = 5; // minutes

    // $sent = 0;

    if( !($sent) ){

        $message = "
        From: $name
        Message:
        $text

        -----------------
        IP: $remote_host
        CL: $browser
        ";

        if(mail($sendto, $subject, $message, $header)){
            setcookie("sent", true, time() + (60 * $cooldown));
        }
    } else {
        $file = 'debug.html';
        file_put_contents($file, 'sent!');
    }

    $referer = $_SERVER[HTTP_REFERER];

    if(!preg_match('#^http://[a-z0-9-]+.([a-z0-9-]+.)?[a-z]+#i', $referer))
    {
        unset($referer);
    }
