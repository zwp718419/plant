<?php
namespace Api\Model;
use Think\Model;

/**
* T_种植状况
*/
class TPlantStatusModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('plantId','require','请输入种植编号'),
			array('statusNo','require','请输入状况序号'),
			array('fileGroupId','require','请输入文件组Id'),
			array('planStatus','require','请输入状态'),
			array('solution','require','请输入对策'),
			array('happenDate','require','请输入发生日期'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['plantId'], $data['statusNo']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$plantId,$statusNo)
	{
		$map['companyCd'] = $companyCd;
		$map['plantId'] = $plantId;
		$map['statusNo'] = $statusNo;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
