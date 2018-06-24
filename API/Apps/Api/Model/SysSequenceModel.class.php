<?php
namespace Api\Model;
use Think\Model;

/**
* SYS_采番
*/
class SysSequenceModel extends Model {

	/**
	* 采番
	*/
	function getSequence($prefix, $len)
	{
		$sequence = 1;
		$data['prefix'] = $prefix;
		
		$m = $this->getInfo($prefix);
		if (empty($m)) {
			$data['sequence'] = $sequence;
			$this->add($data);
		} else {
			$sequence = $m['sequence'] + 1;
			$data['sequence'] = $sequence;
			$this->save($data);
		}
		return $prefix.str_pad($sequence, $len, "0", STR_PAD_LEFT);
	}


	/**
	* 根据主键查询
	*/
	function getInfo($prefix)
	{
		$map['prefix'] = $prefix;
		$m = $this->where($map)->find();
		return $m;
	}
}
?>
