<?php
namespace Api\Model;
use Think\Model;

/**
* M_工作类型
*/
class MWorkTypeModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('workType','require','请输入工作类型'),
			array('workTypeName','require','请输入工作类型名称'),
			array('billingMethod','require','请输入计费方式'),
			array('unitPrice','require','请输入单价'),
		);
		$m = $this->getInfo($data['companyCd'], $data['workType']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$workType)
	{
		$map['companyCd'] = $companyCd;
		$map['workType'] = $workType;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
