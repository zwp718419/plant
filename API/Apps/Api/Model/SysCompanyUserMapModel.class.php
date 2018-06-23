<?php
namespace Api\Model;
use Think\Model;

/**
* SYS_公司用户关系
*/
class SysCompanyUserMapModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('userCd','require','请输入用户Id'),
			array('currentFlag','require','请输入当前公司Flag'),
			array('sysAuth','require','请输入系统权限'),
		);
		$m = $this->getInfo($data['companyCd'], $data['userCd']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$userCd)
	{
		$map['companyCd'] = $companyCd;
		$map['userCd'] = $userCd;
		$m = $this->where($map)->find();
		return $m;
	}

	/**
	* 根据用户查询
	*/
	function getInfoByUser($userCd)
	{
		$map['userCd'] = $userCd;
		$m = $this->where($map)->find();
		return $m;
	}
	
	/**
	* 获取当前用户公司
	*/
	function getLoginCompanyInfo($userCd)
	{
		$map['userCd'] = $userCd;
		$map['currentFlag'] = "1";
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
