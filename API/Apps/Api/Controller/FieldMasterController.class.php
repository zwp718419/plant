<?php
namespace Api\Controller;
use Think\Controller;
use Think\Log;

/**
 * 土地信息
 */
class FieldMasterController extends Controller {
    
    /**
     * 保存土地信息
     * 
     */
    public function doSave() {
        $bodyStr = file_get_contents("php://input");
        Log::write($bodyStr, "INFO");
        $data = json_decode($bodyStr, true);

        $sd = vaild_sk($data['sk']);
        Log::write(json_encode($sd), "INFO");

        // 表单信息
        $fieldForm = $data['data'];
        // 特殊设置-所属
        $fieldForm['belongToType'] = $fieldForm['belongToType'][0];

        // 公司信息
        $companyInfo = $sd['companyInfo'];
        $fieldForm['companyCd'] = $companyInfo['companyCd'];

        $f = D('MField');

        if($field = $f->updateInfo($fieldForm)) {
            $result['code'] = "1000";
            $result['msg'] = "保存成功！";
        } else {
            $result['code'] = 0;
            $result['msg'] = $f->getError();
        }

        exit(json_encode($result));
    }
    
    /**
     * 获取土地信息
     * 
     */
    public function getFieldInfo() {
        $bodyStr = file_get_contents("php://input");
        Log::write($bodyStr, "INFO");
        $data = json_decode($bodyStr, true);

        $sd = vaild_sk($data['sk']);
        Log::write(json_encode($sd), "INFO");
        Log::write("99999999999999999999", "INFO");

        // 表单信息
        $fieldForm = $data['data'];

        // 公司信息
        $companyInfo = $sd['companyInfo'];

        // 获取土地信息
        $f = D('MField');
        $fieldInfo = $f->getInfo($companyInfo['companyCd'], $fieldForm['fieldId']);
        
        if (!empty($fieldInfo)) {
            if (isset($fieldInfo['belongToType'])) {
                $fieldInfo['belongToType'] = array($fieldInfo['belongToType']);
            }
            // 获取土地租赁信息
            $fr = D('MFieldRent');
            $fieldRentList = $fr->getListByFieldId($companyInfo['companyCd'], $fieldForm['fieldId']);

            if (!empty($fieldRentList)) {
                $file = D('TFile');
                $newFieldRentList = array();
                foreach ($fieldRentList as $rowData) {

                    if (isset($rowData['fileGroupId']) && !empty($rowData['fileGroupId'])) {
                        $fileList = $file->getListByFileGroupId($companyInfo['companyCd'], $rowData['fileGroupId']);

                        if (!empty($fileList)) {
                            $rowData['files'] = $fileList;
                        }
                        array_push($newFieldRentList,$rowData);
                    }
                }
                $fieldInfo['fieldRentInfoList'] = $newFieldRentList;
            }

            $result['code'] = "1000";
            $result['msg'] = "";
            $result['data'] = $fieldInfo;
        } else {
            $result['code'] = "3000";
            $result['msg'] = "该数据不存在！";
        }

        Log::write("Result>>>" + json_encode($result), "INFO");
        exit(json_encode($result));
    }


}