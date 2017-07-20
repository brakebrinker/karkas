<?php

$lead=array(
    'name'=>$id,
    'price'=>$sum
    );
	$lead['custom_fields'][]=array(
		'id'=>'417810', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>$roistat_1 //roistat
			)
		)
);
	$lead['custom_fields'][]=array(
		'id'=>'417812', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>$site_1//site
			)
		)
);
	$lead['custom_fields'][]=array(
		'id'=>'422213', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>$form 
			)
		)
);

	$lead['custom_fields'][]=array(
		'id'=>'422215', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>$cid
			)
		)
);
	$lead['custom_fields'][]=array(
		'id'=>'422217', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>$id_tranz
			)
		)
);

$lead['custom_fields'][]=array(
		'id'=>'422219', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>''
			)
		)
);

$lead['custom_fields'][]=array(
		'id'=>'422241', # Replace this value on your custom field ID
		'values'=>array(
			array(
				'value'=>''
			)
		)
);

	
		
$set['request']['leads']['add'][]=$lead;

# Create a link for request
$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/set';
$curl=curl_init(); # Save the cURL session handle
# Set the necessary options for cURL session
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

$out=curl_exec($curl); # Initiate a request to the API and stores the response to variable
$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
//CheckCurlResponse($code);

/**
 * Obtain data in JSON-format, therefore, to obtain the data being read,
 * we have to translate the answer into a format understood by PHP
 */
$Response=json_decode($out,true);
$Response=$Response['response']['leads']['add'];
 
$output='Added leads IDs:'.PHP_EOL;
foreach($Response as $v)
	if(is_array($v))
		$output.=$v['id'].PHP_EOL;
		$lead_id = $v['id'];
return $output;

?>
