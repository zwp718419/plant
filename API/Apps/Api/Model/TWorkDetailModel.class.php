<?php
namespace Api\Model;
use Think\Model;

/**
* T_工作详细
*/
class TWorkDetailModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('workId','require','请输入工作Id'),
			array('workDetailNo','require','请输入工作详细编号'),
			array('workType','require','请输入工作类型'),
			array('startDate','require','请输入开始时间'),
			array('endDate','require','请输入结束时间'),
			array('worker','require','请输入工作者'),
			array('billingMethod','require','请输入计费方式'),
			array('unitPrice','require','请输入单价'),
			array('quantity','require','请输入数量'),
			array('totalAmount','require','请输入总金额'),
			array('fileGroupId','require','请输入文件组Id'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['workId'], $data['workDetailNo']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$workId,$workDetailNo)
	{
		$map['companyCd'] = $companyCd;
		$map['workId'] = $workId;
		$map['workDetailNo'] = $workDetailNo;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
