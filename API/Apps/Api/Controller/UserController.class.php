<?php
namespace Api\Controller;
use Think\Controller;
use Think\Log;

class UserController extends Controller {
    
    /**
     * 注册用户
     * 
     */
    public function register() {
        // $data = $_POST;
        $data = var_dump($_REQUEST);
        echo "99999".$data;
        $u = D('SysUser');

        if ($user = $u->updateInfo($data)) {
            $result['code'] = "1000";
            $result['msg'] = "注册成功！";
        } else {
            $result['code'] = 0;
            $result['msg'] = $u->getError();
        }
        exit(json_encode($result));
    }

    /**
     * 用户登录
     * 
     */
    public function login() {
        // var_dump($_REQUEST);
        // var_dump($_POST);
        // $data = file_get_contents("php://input");

        $bodyStr = file_get_contents("php://input");
        Log::write($bodyStr, "INFO");
        $data = json_decode($bodyStr, true);

        $u = D('SysUser');
        $user = $u->getInfo($data['userCd']);
        
        if (empty($user)) {
            $result['code'] = "2000";
            $result['msg'] = "该用户不存在！";
        } else {
            if ($user['password'] == $data['password']) {
                // 获取当前公司信息
                $cu = D('SysCompanyUserMap');
                $companyInfo = $cu->getLoginCompanyInfo($user['userCd']);
                // 保存到缓存
                $sk = $this->get3rdSession($user, $companyInfo);

                $tempData['user'] = $user;
                $tempData['loginCompanyInfo'] = $companyInfo;
                $tempData['sk'] = $sk;

                $result['code'] = "1000";
                $result['msg'] = "登录成功！";
                $result['data'] = $tempData;
            } else {
                $result['code'] = "2001";
                $result['msg'] = "密码输入错误！";
            }
        }
        Log::write(json_encode($result), "INFO");
        exit(json_encode($result));
    }

    /**
     * 用户登出
     * 
     */
    public function logout() {
        // 清空缓存
        S(I('userCd'), null);

        $result['code'] = "1000";
        $result['msg'] = "登出成功！";

        exit(json_encode($result));
    }

    //生成返回给客户端的3rdsession 
    private function get3rdSession($user, $companyInfo) {
        $sk = getToken();
        
        $session['userInfo'] = $user;
        $session['companyInfo'] = $companyInfo;
        S($sk, $session, 60*60*24);
        return $sk;
    }

}