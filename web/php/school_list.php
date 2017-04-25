<?php
class _school_helper {
	public $response	=	array(
			'status' => false,
			'reason' => "No request found"
	);
	
	public function insert_school( $params ) {
		$data		=	$params['data'];
		$wp_meta	=	$params['meta'];
		$wp_data = array(
				'post_title'    => wp_strip_all_tags( $wp_meta['post_title'] ),
				'post_content'  => $wp_meta['post_content'],
				'post_status'   => $wp_meta['post_status'],
				'post_category' => $wp_meta['post_category']
		);
		$response	=	wp_insert_post( $wp_data );
		if( !is_wp_error( $response ) ) {
			foreach ( $data as $key => $value ) {
				add_post_meta( $response, $key, $value, true );
			}		
		}		
		return $this -> response;
	}
	
	public function get_school( $params ){
		return $this -> response;
	}
	
	public function update_school( $params ) {
		return $this -> response;
	}
}
?>