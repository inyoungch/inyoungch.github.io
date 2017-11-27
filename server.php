<?php

    $name = $_POST['user-name'];
    $phone = $_POST['user-phone'];
    $street = $_POST['user-street'];
    $house = $_POST['user-house'];
    $building = $_POST['user-building'];
    $flat = $_POST['user-flat'];
    $floor = $_POST['user-floor'];
    $comment = $_POST['comment'];
    $pay = $_POST['payment'];

    $call = $_POST['call'];
    $call = isset($call) ? 'НЕТ' : 'ДА'; 

    $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $name . '</li>
                <li>Телефон: ' . $phone . '</li>
                <li>Улица: ' . $street . '</li>
                <li>Дом: ' . $house . '</li>
                <li>Корпус: ' . $building . '</li>
                <li>Квартира: ' . $flat . '</li>
                <li>Этаж: ' . $floor . '</li>
                <li>Комментарий: ' . $comment . '</li>
                <li>Способ оплаты: ' . $pay . '</li>
                <li>Нужно ли перезванивать клиенту: ' . $call . '</li>
            </ul>
        </body>
    </html>    
    ';

    $headers = "From: Администратор сайта Mr.Burger <admin@mrburger.tmweb.ru>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('maxim_91@inbox.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "true";
        // $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "false";
        // $data['mes'] = "На сервере произошла ошибка";
    }

    echo json_encode($data);

?>