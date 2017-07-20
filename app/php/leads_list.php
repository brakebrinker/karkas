<?php
$lead_name=$id;
$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query='.$lead_name;
$curl=curl_init(); # Save the cURL session handle
# Set the necessary options for cURL session
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
curl_setopt($curl,CURLOPT_URL,$link);
curl_setopt($curl,CURLOPT_HEADER,false);
curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
 
$out=curl_exec($curl); # Initiate a request to the API and stores the response to variable
$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
//CheckCurlResponse($code);

$Response=json_decode($out,true);
$Response=$Response['response']['leads'];
$lead=$Response[0];

foreach($Response as $v){
	if ($v['name'] == $lead_name)
	$lead_new = $v['id'];
	}
	

?>
