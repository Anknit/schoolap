<?php
    require_once __DIR__.'/requestMap.php';
    require_once __DIR__.'/loginClass.php';
    define('sso_fwt_app_id','');
    define('sso_fwt_app_secret','');
    $response = array();
    if(isset($_REQUEST) && isset($_REQUEST['request'])) {
        $reqMapper = new requestMapper( $_REQUEST );
        $response = $reqMapper->mapRequest();
    } else {
        $response['status'] = false;
    }
    
   
    echo json_encode($response);
    die();
?>