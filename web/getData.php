<?php
/*
 * author:vaibhav
 */
ini_set('memory_limit', '900M');   
ini_set('display_errors', 0);
session_start();
if(isset($_POST['schoolData'])){
	$postArr = json_decode($_POST['schoolData']);
}
require_once __DIR__.'./../wordpress/wp-load.php';
require_once __DIR__.'/php/school_list.php';

$a  = file_get_contents('aff.json');
$a  = explode(",",$a);
$_SESSION['list']	=	$a;
if(isset($_POST['schoolData'])){
	for($q = 0; $q < count($postArr); $q++) {
		updateSchoolData($postArr[$q]);
	}
	die();
}

function updateSchoolData ($postArr) {
	
	$school_obj	=	new _school_helper();
	
	$param	=	array(
			'meta'	=>	array(),
			'data'	=>	array()
	);
	
	/* $url		=	"http://maps.googleapis.com/maps/api/geocode/json?address=".preg_replace('/\s+/', '+', $postArr[0]).'+'.$postArr[5]."&sensor=false";
	 $result	=	file_get_contents($url);
	 $location	=	json_decode( $result,true );
	 $location	=	$location['results'][0]['geometry']['location'];
	 $lat	=	$location['lat'];
	$lng	=	$location['lng']; */
	
	$param['data']	=	array(
			/* 'latitude_address'			=>	$lat,
			 'longitude_address'			=>	$lng, */
			'name'			 			=>	$postArr[0],
			'affiliation_number'	 	=>	$postArr[1],
			'state'						=>	$postArr[2],
			'district'					=>	$postArr[3],
			'address'					=>	$postArr[4],
			'pin'						=>	$postArr[5],
			'office_number'				=>	$postArr[6].$postArr[7],
			'residence_number'			=>	$postArr[6].$postArr[8],
			'fax'						=>	$postArr[9],
			'email'						=>	$postArr[10],
			'website'					=>	$postArr[11],
			'foundation_year'			=>	$postArr[12],
			'date_of_first_opening'		=>	$postArr[13],
			'principal_name'			=>	$postArr[14],
			'sex'						=>	$postArr[15],
			'principal_qualification'	=>	$postArr[16],
			'admin_years_experience'	=>	$postArr[18],
			'teaching_years_experience'	=>	$postArr[19],
			'status_of_school'			=>	$postArr[20],
			'affiliation_type'			=>	$postArr[21],
			'managing_commitee'			=>	$postArr[24],
			'school_category'			=>	$postArr[25],
			'language_used'				=>	$postArr[26],
			'school_type'				=>	$postArr[27]
	);
	$param['meta']['post_title']	=	$postArr[0];
	$param['meta']['post_content']	=	'';
	$param['meta']['post_status']	=	'publish';
	$category = get_category_by_slug( 'schools' );
	$param['meta']['post_category']	=	array($category->term_id);
	$response	=	$school_obj -> insert_school($param);
}

function getCbseData ($counter) {
	$url = 'http://cbseaff.nic.in/cbse_aff/schdir_Report/AppViewdir.aspx?affno='.$_SESSION['list'][$counter];
	$postdata = array();
	$options = array(
			'http' => array(
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'GET',
					'content' => http_build_query($postdata),
			),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	$_SESSION['counter']++;
	if(strlen($result) > 2868 ){
		$tablesArr = explode('<table', $result);
		return '<div class="schoolMain" schoolid="'.$counter.'"><table id="schoolMain_'.$counter.'" '.$tablesArr[1].'<table id="locationTable_'.$counter.'" '.$tablesArr[3].'<table id="natureTable_'.$counter.'" '.$tablesArr[4].'<table id="enrollTable_'.$counter.'" '.$tablesArr[5].'<table id="infraTable_'.$counter.'" '.$tablesArr[6].'<table id="staffTable_'.$counter.'" '.$tablesArr[7].'<table id="sanitaryTable_'.$counter.'" '.$tablesArr[8].'<table id="facilitiesTable_'.$counter.'" '.$tablesArr[9].'</div>';
	}
}
if(!isset($_SESSION['startCount'] )) {
	$_SESSION['startCount'] = 0;
	$_SESSION['limitCount'] = 1000;
}
	$cbseData = '';
	for($a= $_SESSION['startCount']; $a < $_SESSION['limitCount']; $a++) {
		$cbseData .= getCbseData($a); 
	}
	$_SESSION['startCount'] = $_SESSION['limitCount'];
	$_SESSION['limitCount'] = $_SESSION['limitCount'] + 1000;
	echo $cbseData;
?>
<script src="./../Common/js/jquery/jquery.js"></script>
<script type="text/javascript" language="javascript">
         function Show_hide_ul(id) {

             var ContenID = document.getElementById(id);
             if (ContenID.style.display == "none") {
                 ContenID.style.display = "block";
             }
             else {
                 ContenID.style.display = "none"
             }
         }
</script>
<script>
$(function(){
	var postDataArr = [];
	var schooltablearr = $('.schoolMain');
	var tempArr, schid;
	schooltablearr.each(function (index, elem){
		tempArr = [];
		schid = $(elem).attr('schoolid');
		$(elem).find('#schoolMain_'+schid).find('td:nth-child(2)').each(function(){
			tempArr.push(this.innerText.trim());
		});
		$(elem).find('#natureTable_'+schid).find('td:nth-child(2)').each(function(){
			tempArr.push(this.innerText.trim());
		});
		postDataArr.push(tempArr);
});
	$.ajax({
		url:'./getData.php',
		method:'POST',
		data:{'schoolData':JSON.stringify(postDataArr)},
		success:function(response){
			location.href = './getData.php';
		}
	});
});
</script>