<?php
namespace Api\Model;
use Think\Model;

/**
* T_工作管理
*/
class TWorkModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('workId','require','请输入工作Id'),
			array('plantId','require','请输入种植编号'),
			array('workStatus','require','请输入工作状态'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['workId']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$workId)
	{
		$map['companyCd'] = $companyCd;
		$map['workId'] = $workId;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
