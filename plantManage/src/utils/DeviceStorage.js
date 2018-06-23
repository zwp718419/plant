import React, {
    AsyncStorage
}from 'react-native';

class DeviceStorage {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static async get(key) {
        console.log(await AsyncStorage.getItem(key));
        return await AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            console.log(jsonValue);
            return jsonValue;
        });
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static async save(key, value) {
        console.log("DATA:" + JSON.stringify(value));
        return await AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
            if (!error) {
                console.log('保存数据成功');
            } else {
                console.log('保存数据失败');
            }
        });
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static async update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static async delete(key) {
        return await AsyncStorage.removeItem(key);
    }
}

export default DeviceStorage;