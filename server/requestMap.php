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
                default:
                    $response['status'] = false;
                    break;
            }
            return $response;
        }
        
    }

function getSchoolList () {
    $url = 'http://localhost/schoolap/trunk/wordpress/wp-json/wp/v2/posts?_embed&per_page=4';
   
    $opts = array(
        'http'=>array(
            'method'=>"GET",
            'header'=>  "Content-type: application/x-www-form-urlencoded\r\n".
                        "Accept-language: en\r\n" .
                        "Cookie: foo=bar\r\n"
        )
    );

    $context = stream_context_create($opts);

    $fp = file_get_contents($url, false, $context);
    return array('status'=> true, 'data' => json_decode($fp));
}

function getArticleList () {
    return array('status' =>true);
}
?>