<?php
$contact=array(
			'name'=>$name ,
			'linked_leads_id'=>$lead_new,
			'custom_fields'=>array(
				array(
					'id'=>$custom_fields['EMAIL'],
					'values'=>array(
						array(
							'value'=>$email,
							'enum'=>'WORK'
						)
					)
				)
			)
		);

if(!empty($data['company']))
	$contact+=array('company_name'=>$data['company']);
if(!empty($data['position']))
	$contact['custom_fields'][]=array(
		'id'=>$custom_fields['POSITION'],
		'values'=>array(
			array(
				'value'=>$name
			)
		)
);

if(!empty($phone))
	$contact['custom_fields'][]=array(
		'id'=>$custom_fields['PHONE'],
		'values'=>array(
			array(
				'value'=>$phone,
				'enum'=>'OTHER'
			)
		)
);
if(!empty($data['web']))
	$contact['custom_fields'][]=array(
		'id'=>$custom_fields['WEB'],
		'values'=>array(
			array(
				'value'=>''
			)
		)
	);
if(!empty($data['jabber']))
	$contact['custom_fields'][]=array(
		'id'=>$custom_fields['IM'],
		'values'=>array(
			array(
				'value'=>'',
				'enum'=>'JABBER'
			)
		)
	);
if(!empty($data['scope']))
{
	foreach($data['scope'] as &$enum)
		$enum=trim($scope_info[$enum]);
	unset($enum);
	$intersect=array_intersect($custom_fields['SCOPE']['enums'],$data['scope']);
	foreach($intersect as $k=>$v)
		$values[]=array(
			'value'=>$v,
			'enum'=>$k
		);

	$scope=array(
		'id'=>(int)$custom_fields['SCOPE']['id'],
		'values'=>$values
	);
			
	$contact['custom_fields'][]=$scope;
}
$set['request']['contacts']['add'][]=$contact;

#Формируем ссылку для запроса
$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/contacts/set';
$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
#Устанавливаем необходимые опции для сеанса cURL
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
curl_setopt($curl,CURLOPT_URL,$link);
curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($set));
curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
curl_setopt($curl,CURLOPT_HEADER,false);
curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
//CheckCurlResponse($code);

/**
 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
 * нам придётся перевести ответ в формат, понятный PHP
 */
$Response=json_decode($out,true);
$Response=$Response['response']['contacts']['add'];
 
$output='ID добавленных контактов:'.PHP_EOL;
foreach($Response as $v)
	if(is_array($v))
		$output.=$v['id'].PHP_EOL;
return $output;
?>