<?php
    class requestMapper {
        private $requestType;
        public function __construct ($params) {
            $this->requestType = $params['requestType'];
            $this->requestParams	= $params['requestParams'];
        }
        
        public function __destruct() {
            $this->requestType = '';
        }
        
        public function mapRequest () {
            $response = array();
            switch ($this->requestType) {
                case 'school_list':
                    $response = getSchoolList();
                    break;
                case 'featured_articles':
                    $response = getArticleList();
                    break;
                case 'school_data':
                    $response = getSchoolData();
                    break;
                case 'article_data':
                    $response = getArticleData();
                    break;
                case 'state_list':
                    $response = getStateList();
                    break;
                case 'user_login':
                    $response = userSignin( $this->requestParams );
                    return $response;
                    break;
                case 'user_register':
                	$response = userRegister( $this->requestParams );
                	break;
                case 'google_user_login':
                	$response = google_user_signin( $this->requestParams );
                	break;
                case 'fb_user_login':
                	$response = userSignin();
                	break;
                default:
                    $response['status'] = false;
                    break;
            }
            return $response;
        }
        
    }

function getSchoolList () {
    $perPage = 4;
    $startIndex = 0;
    $category = '2';
    if(isset($_REQUEST['type']) && $_REQUEST['type'] == 'category' && isset($_REQUEST['category'])) {
        $category = getCatIdFromSlug($_REQUEST['category']);
        $perPage = 10;
    }
    if(isset($_REQUEST['count'])) {
        $perPage = $_REQUEST['count'];
    }
    if(isset($_REQUEST['start'])) {
        $startIndex = $_REQUEST['start'];
    }
    $queryArr = array(
        '_embed' => '',
        'per_page' => $perPage,
        'categories' => $category
    );
    $response = wpQuery('getPosts', $queryArr);
    if($response['status']) {
        return $response;
    } else {
        return $response;
    }
}

function getStateList () {
    $perPage = 50;
    $queryArr = array(
        'parent' => '8',
        'per_page' => $perPage
    );
    $response = wpQuery('getCategories', $queryArr);
    if($response['status']) {
        return $response;
    } else {
        return $response;
    }
}

function userSignin ( $params ) {
	$output	=	array();
	$login_obj		=	new _user_login();
	$login_response	=	$login_obj	-> initiate_wp_session( $params );
	
	$output['status']	=	$login_response['status'];
	if ( !$login_response['status'] ){	
		if ( isset($login_response['reason']) ){
			$output['reason']	=	$login_response['reason'];
		}		
	}	
	return $output;
}

function userRegister ( $params ) {
	$output	=	array();
	$login_obj		=	new _user_login();
	$login_response	=	$login_obj	-> insert_user_in_wp( $params );
	
	if( $login_response['status'] ) {
		
	}
	$output['status']	=	$login_response['status'];
	if ( !$login_response['status'] ){
		if ( isset($login_response['reason']) ){
			$output['reason']	=	$login_response['reason'];
		}
	}
	return $output;
}

function google_user_signin ( $params ){
	$output	=	array();
	$login_obj		=	new _user_login();
	if ( !isset( $params['token'] ) || empty( $params['token'] ) ) {
		$output['status']	=	false;
		$output['reason']	=	'No token found';
	}
	else{
		$google_response	=	$login_obj	-> sso_google_signin( $params['token'] );
		if( $google_response['status'] ){
			$login_response	=	$this -> initiate_wp_session( $google_response['server_data'] );
			$output['status']	=	$login_response['status'];
			if ( !$login_response['status'] &&	!empty($login_response['reason'])){
				$output['reason']	=	$login_response['reason'];
			}
		}
		else{
			$output['status']	=	$google_response['status'];
			$output['reason']	=	$google_response['reason'];
		}
	}	
	return $output;
}


function getArticleList () {
    $perPage = 4;
    if(isset($_REQUEST['count'])) {
        $perPage = $_REQUEST['count'];
    }
    $queryArr = array(
        '_embed' => '',
        'per_page' => $perPage,
        'categories' => '3'
    );
    $response = wpQuery('getPosts', $queryArr);
    if($response['status']) {
        return $response;
    } else {
        return $response;
    }
}

function getSchoolData () {
    $slug = '';
    $id = 0;
    if(isset($_REQUEST['slug'])) {
        $slug = $_REQUEST['slug'];
    }
    $queryArr = array(
        '_embed' => '',
        'slug' => $slug
    );
    $response = wpQuery('getPosts', $queryArr);
    if($response['status']) {
        return $response;
    } else {
        return $response;
    }
}

function getArticleData () {
    $slug = '';
    $id = 0;
    if(isset($_REQUEST['slug'])) {
        $slug = $_REQUEST['slug'];
    }
    if(isset($_REQUEST['id'])) {
        $id = $_REQUEST['id'];
    }
    $queryArr = array(
        '_embed' => '',
        'slug' => $slug
    );
    
    $urlArr = array($id);
    $response = wpQuery('getPosts', $queryArr, $urlArr);
    if($response['status']) {
        return $response;
    } else {
        return $response;
    }
}

function getCatIdFromSlug ($slug) {
    $queryArr = array(
        'slug' => $slug
    );
    $response = wpQuery('getCategories', $queryArr);
    if($response['status']) {
        return $response['data'][0]['id'];
    } else {
        return 0;
    }
}

function wpQuery($reqType, $queryArr, $urlArray = array()) {
    $response = array();
    $url = 'http://localhost/schoolap/trunk/wordpress/wp-json/wp/v2/';
    $method = 'GET';
    $content = '';
    $endpoint = '';
    switch($reqType) {
        case 'getPosts':
            $method = 'GET';
            $endpoint = 'posts';
            break;
        case 'getCategories':
            $method = 'GET';
            $endpoint = 'categories';
            break;
        default:
            break;
    }
    if($endpoint != '') {
        $url .= $endpoint;
        
        if(isset($urlArray) && count($urlArray) > 0) {
            $url .= '/'.(implode("/", $urlArray));
        }
        
        if($queryArr) {
            $query= http_build_query($queryArr);
            if($method == 'GET') {
                $url .= '?'.$query;
            } else{
                $content = $query;
            }
        }

        $opts = array(
            'http'=>array(
                'method'=>$method,
                'header'=>  "Content-type: application/x-www-form-urlencoded\r\n".
                            "Accept-language: en\r\n" .
                            "Cookie: foo=bar\r\n",
                'content'=>$content
            )
        );
        $context = stream_context_create($opts);
        $fp = file_get_contents($url, false, $context);
        if($fp) {
            $response['status'] = true;
            $response['data'] = json_decode($fp, true);
        } else {
            $response['status'] = false;
            $response['data'] = 'Failed to get response from endpoint';
            $response['error'] = error_get_last();
        }
    } else {
        $response['status'] = false;
        $response['data'] = 'Invalid API endpoint';
    }
    return $response;
}

?>
