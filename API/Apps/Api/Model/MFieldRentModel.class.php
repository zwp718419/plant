<?php
namespace Api\Model;
use Think\Model;

/**
* M_土地租赁信息
*/
class MFieldRentModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('fieldId','require','请输入土地编号'),
			array('rentNo','require','请输入租赁编号'),
			array('unitPrice','require','请输入单价'),
			array('startDate','require','请输入开始日'),
			array('endDate','require','请输入结束日'),
			array('years','require','请输入年数'),
			array('totalAmount','require','请输入总金额'),
			array('contractDate','require','请输入合同日'),
			array('fileGroupId','require','请输入文件组Id'),
		);
		$m = $this->getInfo($data['companyCd'], $data['fieldId'], $data['rentNo']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$fieldId,$rentNo)
	{
		$map['companyCd'] = $companyCd;
		$map['fieldId'] = $fieldId;
		$map['rentNo'] = $rentNo;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
