<?php
    require_once __DIR__.'/requestMap.php';
    $response = array();
    if(isset($_REQUEST) && isset($_REQUEST['request'])) {
        $reqMapper = new requestMapper($_REQUEST['request']);
        $response = $reqMapper->mapRequest();
    } else {
        $response['status'] = false;
    }
    echo json_encode($response);
    die();
?>