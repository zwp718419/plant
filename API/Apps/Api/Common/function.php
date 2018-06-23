<?php

/**
 * 判断登录是否过期
 */
function vaild_sk($sk){
	if(!S($sk)){
		$result['status'] = -1;
		$result['msg'] = '登录已过期';
		exit(json_encode($result));
	}
	return S($sk);
}

/**
 * 生成Token
 */
function getToken() {
	$str = md5(uniqid(md5(microtime(true)),true));  //生成一个不会重复的字符串
	$str = sha1($str);  //加密

	return $str;
}
?>