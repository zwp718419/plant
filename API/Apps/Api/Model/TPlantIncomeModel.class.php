<?php
namespace Api\Model;
use Think\Model;

/**
* T_种植收益
*/
class TPlantIncomeModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('plantId','require','请输入种植编号'),
			array('incomeNo','require','请输入收益编号'),
			array('income_pattern','require','请输入用途'),
			array('unitPrice','require','请输入单价'),
			array('quantity','require','请输入数量'),
			array('totalAmount','require','请输入总金额'),
			array('happenDate','require','请输入发生日期'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['plantId'], $data['incomeNo']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$plantId,$incomeNo)
	{
		$map['companyCd'] = $companyCd;
		$map['plantId'] = $plantId;
		$map['incomeNo'] = $incomeNo;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
