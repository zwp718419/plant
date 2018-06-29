import React, {
    ToastAndroid
}from 'react-native';

import ajax from '../utils/fetch'
import DeviceStorage from '../utils/DeviceStorage';

class ApiUtil {
    
    /**
     * 保存土地信息
     * @param {*} param0 
     */
    static saveField({data, success, error, complete}) {
        ApiUtil.postJson({
            url: 'fieldMaster/doSave',
            data: data,
            success: success,
            error: error,
            complete: complete
        });
    }

    /**
     * 获取土地信息
     * @param {*} param0 
     */
    static getField({data, success, error, complete}) {
        ApiUtil.postJson({
            url: 'fieldMaster/getFieldInfo',
            data: data,
            success: success,
            error: error,
            complete: complete
        });
    }

    /**
     * 文件上传
     */
    static uploadFile({data, success, error, complete}) {
        let file = {uri: data.url, type: 'multipart/form-data', name: 'image.jpg'};
        ApiUtil.getToken().then((token)=>{
            ajax({
                url: 'file/upload?token=' + token,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                },
                data: {file, file},
                success: success,
                error: error,
                complete: complete
            });
        });
    }

    /**
     * 获取token
     */
    static async getToken() {
        let token = "";
        await DeviceStorage.get(global.storageKey.content).then((value) => {
            token = value.sk;
        });
        return token;
    }

    /**
     * 提交JSON格式
     * @param {*} param0 
     */
    static postJson({url, data, success, error, complete}) {
        ApiUtil.getToken().then((token)=>{
            ajax({
                url: url + '?token=' + token,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {data: data},
                success: success,
                error: error,
                complete: complete
            });
        });
    }
}

export default ApiUtil;