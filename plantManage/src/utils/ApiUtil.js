import React, {
    ToastAndroid
}from 'react-native';

import ajax from '../utils/fetch'
import DeviceStorage from '../utils/DeviceStorage';

class ApiUtil {
    
    static uploadImage(params) {
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            for (var key in params){
                formData.append(key, params[key]);
            }
            let file = {uri: params.path, type: 'multipart/form-data', name: 'image.jpg'};
            formData.append("file", file);
            fetch("http://192.168.136.171:9096/plant/API/api/file/upload", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData)=> {
                    console.log('uploadImage', responseData);
                    resolve(responseData);
                })
                .catch((err)=> {
                    console.log('err', err);
                    reject(err);
                });
        });
    }
}

export default ApiUtil;