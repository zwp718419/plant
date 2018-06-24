<?php
namespace Api\Model;
use Think\Model;

/**
* T_附件
*/
class TFileModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('fileGroupId','require','请输入文件组Id'),
			array('fileId','require','请输入文件Id'),
			array('filePath','require','请输入文件路径'),
			array('fileName','require','请输入文件名'),
		);
		$m = $this->getInfo($data['companyCd'], $data['fileGroupId'], $data['fileId']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$fileGroupId,$fileId)
	{
		$map['companyCd'] = $companyCd;
		$map['fileGroupId'] = $fileGroupId;
		$map['fileId'] = $fileId;
		$m = $this->where($map)->find();
		return $m;
	}

	/**
	* 根据主键查询
	*/
	function getListByFileGroupId($companyCd,$fileGroupId)
	{
		$map['companyCd'] = $companyCd;
		$map['fileGroupId'] = $fileGroupId;
		$m = $this->where($map)->select();
		return $m;
	}
}
?>
