<?php
namespace Api\Model;
use Think\Model;

/**
* M_土地
*/
class MFieldModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('fieldId','require','请输入土地编号'),
			array('fieldName','require','请输入土地名称'),
			array('size','require','请输入土地大小'),
			array('address','require','请输入位置坐标'),
			array('addressName','require','请输入坐标名称'),
			array('belongToType','require','请输入所属类型'),
			array('belongToUser','require','请输入所属者'),
		);
		$m = $this->getInfo($data['companyCd'], $data['fieldId']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$fieldId)
	{
		$map['companyCd'] = $companyCd;
		$map['fieldId'] = $fieldId;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
