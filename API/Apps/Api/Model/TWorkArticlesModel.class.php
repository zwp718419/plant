<?php
namespace Api\Model;
use Think\Model;

/**
* T_工作用品
*/
class TWorkArticlesModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('workId','require','请输入工作Id'),
			array('articleId','require','请输入工作用品Id'),
			array('quantity','require','请输入数量'),
			array('unitPrice','require','请输入单价'),
			array('totalAmount','require','请输入总金额'),
			array('remark','require','请输入备注'),
		);
		$m = $this->getInfo($data['companyCd'], $data['workId']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$workId)
	{
		$map['companyCd'] = $companyCd;
		$map['workId'] = $workId;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
