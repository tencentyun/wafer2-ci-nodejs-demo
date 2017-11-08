/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://localhost:5757/weapp';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        
        // 万象优图接口
        ciUrl: `${host}/ci`
    }
};

module.exports = config;