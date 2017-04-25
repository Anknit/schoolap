<?php
    class requestMapper {
        private $requestType;
        public function __construct ($req) {
            $this->requestType = $req;
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
                default:
                    $response['status'] = false;
                    break;
            }
            return $response;
        }
        
    }

function getSchoolList () {
    $perPage = 4;
    if(isset($_REQUEST['count'])) {
        $perPage = $_REQUEST['count'];
    }
    $queryArr = array(
        '_embed' => '',
        'per_page' => $perPage,
        'categories' => '2'
    );
    $response = wpQuery('getPosts', $queryArr);
    if($response['status']) {
        return $response;
    } else {
        return $response;
    }
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

function wpQuery($reqType, $queryArr) {
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
        default:
            break;
    }
    if($endpoint != '') {
        $url .= $endpoint;
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
            $response['data'] = json_decode($fp);
        } else {
            $response['status'] = false;
            $response['data'] = 'Failed to get response from endpoint';
        }
    } else {
        $response['status'] = false;
        $response['data'] = 'Invalid API endpoint';
    }
    return $response;
}

?>
