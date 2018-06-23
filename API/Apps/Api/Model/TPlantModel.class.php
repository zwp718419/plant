<?php
namespace Api\Model;
use Think\Model;

/**
* T_种植信息
*/
class TPlantModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('plantId','require','请输入种植编号'),
			array('fieldId','require','请输入土地编号'),
			array('plantCategory','require','请输入种植类型'),
			array('startDate','require','请输入开始日'),
			array('endDate','require','请输入结束日'),
			array('processStatus','require','请输入种植进度状态'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['plantId']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$plantId)
	{
		$map['companyCd'] = $companyCd;
		$map['plantId'] = $plantId;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
