<?php
namespace Api\Model;
use Think\Model;

/**
* SYS_公司
*/
class SysCompanyModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('companyName','require','请输入公司名称'),
		);
		$m = $this->getInfo($data['companyCd']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd)
	{
		$map['companyCd'] = $companyCd;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
