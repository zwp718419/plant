<?php
namespace Api\Model;
use Think\Model;

/**
* M_工作用品
*/
class MArticlesModel extends Model {


	/**
	* 更新/插入数据
	*/
	function updateInfo($data)
	{
		// 数据检查
		$rules = array(
			array('companyCd','require','请输入公司Cd'),
			array('articleId','require','请输入工作用品Id'),
			array('articleName','require','请输入用品名称'),
			array('unit','require','请输入单位'),
		);
		$m = $this->getInfo($data['companyCd'], $data['articleId']);
		if (empty($m)) {
			return $this->validate($rules)->add($data);
		} else {
			return $this->validate($rules)->save($data);
		}
	}


	/**
	* 根据主键查询
	*/
	function getInfo($companyCd,$articleId)
	{
		$map['companyCd'] = $companyCd;
		$map['articleId'] = $articleId;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
