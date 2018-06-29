<?php
namespace Api\Controller;
use Think\Controller;
use Think\Log;

/**
 * 文件
 */
class FileController extends Controller {

	/**
	 * 文件上传
	 */
	public function upload() {
		$token = vaild_sk($_REQUEST["token"]);
		Log::write(json_encode($token), "INFO");

		// 公司信息
		$companyInfo = $token['companyInfo'];

		$upload = new \Think\Upload();// 实例化上传类
		$upload->exts = array('txt', 'jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
		$upload->savePath = './'.$companyInfo['companyCd'].'/'; //保存路径

		// 上传单个文件 
		$info   =   $upload->uploadOne($_FILES['file']);

        if($info) {
			$result['code'] = 1;
			$result['msg'] = '图片上传成功!';
			$result['data'] = $info;

        } else {
            // 上传失败获取错误信息
            $result['code'] =0;
            $result['msg'] = '图片上传失败!';
		}

		exit(json_encode($result));
	}

	public function download() {

	}

}