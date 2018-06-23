<?php
namespace Api\Model;
use Think\Model;

/**
* M_种植类型
*/
class MPlantCategoryModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('plantCategory','require','请输入种植类型'),
			array('plantName','require','请输入种植类型名称'),
			array('spec','require','请输入规格'),
			array('yield','require','请输入产量（每亩）'),
		);
		$m = $this->getInfo($data['companyCd'], $data['plantCategory']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$plantCategory)
	{
		$map['companyCd'] = $companyCd;
		$map['plantCategory'] = $plantCategory;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
