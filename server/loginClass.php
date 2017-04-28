<?php
class _user_login{
	
 	public function initiate_wp_session( $params ) {
 		$output	=	array(
 				'status'	=>	false
 		);
 		
 		$is_user_exists	=	username_exists($params['username']);
 		if ( !$is_user_exists ) {
 			$output['reason']	=	'User not found';
 		}
 		else{
 			$creds = array();
 			$creds['user_login']	= $params['username'];
 			$creds['user_password']	= $params['password'];
 			$creds['remember']		= true;
 			$user 					= wp_signon($creds, $params['secure_cookie']);
 			if ( !is_wp_error( $user ) ){
 				$output['status']	=	true;
 			}
 		}
 		return $output;    	
    }
    
    public function insert_user_in_wp( $params ){
    	$output	=	array(
    			'status'	=>	false
    	);
    	$is_user_exists	=	username_exists($params['username']);
    	if( $is_user_exists ){
    		$output['reason']	=	'User already registered';
    	}
    	else{
    		$wp_username		=	$params['username'];
    		$wp_password		=	$params['password'];
    		$wp_email			=	$parms['emailid'];
    		$wp_nicename		=	$params['first_name'];
    		$wp_display_name	=	$params['first_name'].' '.$params['last_name'];
    		$userdata = array(
    				'user_login'	=>  $wp_username,
    				'user_pass'		=>  $wp_password,
    				'user_email'	=>	$wp_email,
    				'user_nicename'	=>	$wp_nicename,
    				'display_name'	=>	$wp_display_name,
    				'first_name'	=>	$wp_nicename,
    				'last_name'		=>	$params['last_name']
    		);
    		$wp_user_id		=	wp_insert_user($userdata);
    		if(!is_wp_error($wp_user_id)){
    			$output['status']	=	true;
    		}
    	}
    	return $output;
    }
    
    public function sso_facebook_signin( $token='' ){
    	$output	=	array(
    			'status'	=>	true
    	);
    	$params	=	array();
    
    	$options = array(
    			'http' => array(
    					'method'  => "GET",
    			)
    	);
    
    	$access_token	=	false;
    	$user_id		=	false;
    	$user_details	=	false;
    
    	$acess_token_request    	=	"https://graph.facebook.com/oauth/access_token?client_id=".sso_fwt_app_id."&client_secret=".sso_fwt_app_secret.'&grant_type=client_credentials';
    	$pattern_for_access_token	=	'/access_token=(.*)/';
    	$response1    				=	sendExternalRequest($options, $acess_token_request);
    	$matches_for_access_token_in_response	=	preg_match($pattern_for_access_token, $response1, $matches);
    	if(isset($matches[1])){
    		$access_token	=	$matches[1];
    	}
    
    	if($access_token){
    		$user_id_request	=	"https://graph.facebook.com/debug_token?input_token=".$token."&access_token=".$access_token;
    		$response2			=    json_decode(sendExternalRequest($options, $user_id_request),true);
    		if(isset($response2['data']['is_valid'])	&&	$response2['data']['is_valid']){
    			$user_id	=	$response2['data']['user_id'];
    		}
    	}
    
    	if($access_token	&&	$user_id){
    		$user_details_request	=	"https://graph.facebook.com/v2.7/".$user_id."/?fields=email,first_name,last_name,picture&access_token=".$access_token;
    		$response3    =    json_decode(sendExternalRequest($options, $user_details_request),true);
    		if( isset($response3['first_name']) ){
    			$params['first_name']	=	$response3['first_name'];	
    			$params['last_name']	=	$response3['last_name'];
    			$params['image']		=	$response3['picture']['data']['url'];
    			$username	=	$response3['id'];
    			if( isset($response3['email']) ){
    				$user_email	=	$response3['email'];
    			}
    			else{
    				$user_email	=	'';
    			}
    			$user_details	=	true;
    		}
    	}
    
    	if(!$user_details) {
    		$output['status']				=	false;
    		$output['error']				=	'sso_message12';
    		$output['error_description']	=	"sendRequest to facebook api failed at line no. ".__LINE__." in file ".__FILE__." content: response1=".$response1.'&response2='.$response2.'&response3='.$re;
    	}
    	else {
    		$is_user_exists	=	$this -> username_exists( $params['username'] );
 			if ( !$is_user_exists ) {
 				$insert_reponse	=	$this -> insert_user_in_wp( $params );
 				$insert_data    =    array(
 						'Table'	=>	'userinfo',
 						'Fields'=>	array(
 								'sso_ott'	=>	$ott,
 								'regAuthorityId'=>0,
 								'usertype'=>UT_NORMAL,
 								'username'=>$username,
 								'emailid'=>$user_email,
 								'first_name'=>$first_name,
 								'last_name'=>$last_name,
 								'user_image'=>$image,
 								'status'=>US_VERIFIED
 						)
 				);
 				if(!$this->sso_db_handle->Insert($insert_data))	{
 					$output['status']				=	false;
 					$output['error']				=	'sso_message7';
 					$output['error_description']	=	'Database DB_Insert failed at'.__LINE__." in file ".__FILE__." email: ".$email;
 				}
 				else{
 					$output['data']	=	array(
 							"ott"		=>	$ott
 					);
 					$output['data']['data_for_extended_process']	=	array(
 							"status"	=>	false
 					);
 				}
 			}
    		else {
    			if($d_data[0]['status']	!=	US_VERIFIED){
    				$output['status']	=	false;
    				$output['error']	=	'sso_message23';
    			}
    			else{
    				$ott_update_input	  =	   array(
    						'Table'		=>	'userinfo',
    						'Fields'	=>	array(
    								'sso_ott'	=>	$ott
    						),
    						'clause'	=>	"username='$username' AND status!=".US_DELETED
    				);
    
    				if(!$this->sso_db_handle->Update($ott_update_input))	{
    					$output['status']				=	false;
    					$output['error']				=	'sso_message4';
    					$output['error_description']	=	'Database DB_Update failed to update ott for the user email:'.$email;
    				}
    				else{
    					$output['data']	=	array(
    							"ott"		=>	$ott,
    					);
    					$output['data']['data_for_extended_process']	=	array(
    							"status"	=>	false
    					);
    				}
    			}
    		}
    
    		if(!empty($output['data'])){
    			$output['data']['user_login_source']	=	Facebook;
    		}
    	}
    	return $output;
    }
    
    public function sso_google_signin($token = '') {
    	$output	=	array(
    			'status'	=>	true
    	);
    	$params	=	array();
    		
    	$g_request    =    "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=".$token;
    
    	$options = array(
    			'http' => array( 'method'  => "GET"	),
    	);
    	$response    =    json_decode(sendExternalRequest( $options, $g_request ) );
    
    	if($response	==	NULL || $response	==	"") {
    		$output['status']				=	false;
    		$output['reason']				=	'An error has occured';
    		$output['error_description']	=	"sendRequest to google api failed at line no. ".__LINE__." in file ".__FILE__." content: idtoken=".$token;
    	}
    	else {
    		if(isset($response->{'error_description'})) {
    			$output['status']				=	false;
    			$output['reason']				=	'An error has occured';
    			$output['error_description']	=	'Login credentials is not obtained from youtube'."at line no. ".__LINE__." at file ".__FILE__." content: id_token:".$token." response:".$response->{'error_description'};
    		}
    		else if(!isset($response->{'email_verified'})	||	!$response->{'email_verified'})
    		{
    			$output['status']				=	false;
    			$output['error']				=	'Email is not verified with google';
    			$output['error_description']	=	'Google Unverified email'."at line no. ".__LINE__." at file ".__FILE__." content: id_token:".$token." response:".$response->{'error_description'};
    		}
    		else {
    			$params['email']	=	$response->{'email'};
    			$params['user_image']	=	$response->{'picture'};
    			$params['username']		=	$response->{'name'};
    			$params['first_name']	=	explode(' ', $name, 2)[0];
    			$params['last_name']	=	explode(' ', $name, 2)[1];
    
    			$is_user_exists	=	$this -> username_exists( $params['username'] );
    			if ( !$is_user_exists ) {
    				$insert_reponse	=	$this -> insert_user_in_wp( $params );
    				if ( $insert_response['status'] ){
    					$output['server_data']	=	$params;
    				}
    				else{
    					$output['reason']	=	'';
    					if( isset( $insert_reponse['reason'] ) ){
    						$output['reason']	=	$insert_reponse['reason'];
    					}
    				}
    			}
    			else {
    				
    			}
    		}
    	}
    	return $output;
    }
} 
?>