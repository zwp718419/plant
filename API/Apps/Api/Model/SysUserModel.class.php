<?php
namespace Api\Model;
use Think\Model;

/**
* SYS_用户
*/
class SysUserModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('userCd','require','请输入用户Id'),
			array('userName','require','请输入用户名称'),
			array('password','require','请输入密码'),
			array('telPhone','require','请输入电话'),
			array('address','require','请输入位置坐标')
		);
		
		$m = $this->getInfo($data['userCd']);

		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($userCd)
	{
		$map['userCd'] = $userCd;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
