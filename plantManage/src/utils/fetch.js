const BASE_URL = 'http://192.168.0.122/plant/API/api/';

function toForm(data) {
    let formData = new FormData();
    let keyArr = Object.keys(data);
    if (keyArr.length < 1) {return {}}
    keyArr.map((item) => {
        formData.append(item, data[item])
    });
    
    console.info("toForm>>>>" + JSON.stringify(data));
    return formData;
}

function formatData(headers, data) {
    if (!headers || !headers['Content-Type'] || headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        return toForm(data);
    }

    switch (headers['Content-Type']) {
        case 'application/json':
            return JSON.stringify(data);
        default :
            return toForm(data);
    }
}

function setUrlParams(url, data) {
    let params = "";
    if (data) {
        let paramsArray = [];
        //拼接参数
        Object.keys(data).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url;
}

export default ajax = ({url, method, data, dataType, headers, success, error, complete}) => {

    let options = {}

    //默认method
    options['method'] = method || 'GET'

    //默认header
    options['headers'] = Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded', //默认格式
        'credentials': 'include', //包含cookie
        'mode': 'cors', //允许跨域
    }, headers)

    //处理body
    if (options.method.toUpperCase() === 'POST') {
        options['body'] = formatData(headers, data);
    } else {
        url = setUrlParams(url, data);
    }

    console.info("URL >>>> " + url);
    console.info("options >>>> " + JSON.stringify(options));

    fetch(BASE_URL + url, options).then((response) =>
        response.json()
    ).then((responseJson) => {
        console.info("SUCCESS >>>> " + JSON.stringify(responseJson));

        success && success(responseJson)
        complete && complete(responseJson)
    }).catch((err) => {
        console.error("ERROR >>>> " + err);
        
        error && error(err)
        complete && complete()
    })

}