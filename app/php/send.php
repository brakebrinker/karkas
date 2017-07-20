<?
error_reporting(-1);
$root=__DIR__.DIRECTORY_SEPARATOR;
$id = 'Заявка с сайта (karkas-dom39.ru)';
if($_POST['name'] == ''){
	$name = 'no name';}
else{
	$name = $_POST['name'];
	}

$email = 'test@mail.ru';
if($_POST['phone'] == ''){
	$phone = 'no phone';}
else{
	$phone = $_POST['phone'];
	}

$id_tranz = uniqid();


if($_POST['form'] == ''){
	$form = 'no name application';}
else{
	$form = $_POST['form'];
	}

if($_POST['cid'] == ''){
	$cid = 'no cid';}
else{
	$cid = $_POST['cid'];
	}
$roistat_osn = isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null;

if($roistat_osn == ''){
	$roistat_1 = 'нету';}
else{
	$roistat_1 = $roistat_osn;
	}	
$site_1 = 'karkas-dom39.ru';
$sum = '0';
//require $root.'prepare.php'; # There will be carried out preparatory acts, declarations of functions, etc.
require $root.'auth.php'; # There will be user authentication
require $root.'account_current.php'; # Here we will receive information about account
require $root.'fields_info.php'; # Obtain information about the fields
require $root.'contacts_list.php'; # Obtain contact information
require $root.'lead_add.php'; # There will be adding a Lead
require $root.'leads_list.php'; # There will be adding a Lead
require $root.'contact_add.php'; # There will be adding a Contact linked with the Lead

?>
<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")&&(isset($_POST['form'])&&$_POST['form']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'dom-formula@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Новая заявка на karkas-dom39.ru'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Телефон: '.$_POST['phone'].'</p> 
						<p>Откуда: '.$_POST['form'].'</p>    						
                    </body>
                </html>'; //Текст нашего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Zakaz na karkas-dom39.ru <zakaz@karkas-dom39.ru>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail



}
?>
