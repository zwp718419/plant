<?php
namespace Api\Model;
use Think\Model;

/**
* T_种植损失
*/
class TPlantLoseModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('plantId','require','请输入种植编号'),
			array('loseNo','require','请输入损失编号'),
			array('loseReason','require','请输入原因'),
			array('loseQuantity','require','请输入损失数量'),
			array('loseAmount','require','请输入损失金额'),
			array('happenDate','require','请输入发生日期'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['plantId'], $data['loseNo']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$plantId,$loseNo)
	{
		$map['companyCd'] = $companyCd;
		$map['plantId'] = $plantId;
		$map['loseNo'] = $loseNo;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
