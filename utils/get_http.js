const protocolOfUrl = (url) => {
    let str = ''
    let arr = url.split('//')
    if (arr[0] === 'http:') {
        return 'http'
    } else if (arr[0] === 'https:') {
        return 'https'
    }
    return 'http'
};

const hostOfUrl = (url) => {
    let str = ''
    let arr = url.split('//')
    if (arr.length > 1) {
        str = arr[1]
    } else {
        str = arr[0]
    }
    arr = str.split(':')
    str = arr[0]
    return str.split('/')[0]
}

const portOfUrl = (url) => {
    let protocol = protocolOfUrl(url)
    let arr = url.split(hostOfUrl(url))[1].split(':')
    if (arr.length > 1) {
        arr = arr[1].split('/')[0]
        return arr
    }
    if (protocol === 'http') {
        return '80'
    } else if (protocol === 'https') {
        return '443'
    }
}

const pathOfUrl = (url) => {
    let arr = url.split('//')
    arr = arr[arr.length-1].split('/')
    arr = arr.splice(1).join('/')
    if (arr === '') {
        return '/'
    }else {
        return '/' +  arr
    }
}

const parsedUrl = (url) => {
    let data = {
        protocol: protocolOfUrl(url),
        host: hostOfUrl(url),
        port: portOfUrl(url),
        path: pathOfUrl(url),
    }
    return data
}

function ip (url, callback) {
    //console.log('url: ', url);
    var spawn = require('child_process').spawn;
        var ls = spawn('ping', [hostOfUrl(url)]);
        ls.stdout.on('data', (data) => {
            let a = Object.assign([], data.toString())
            a = a.join('').split(' ')[2]
            a = a.slice(1,a.length-2)
            ls.kill('SIGHUP');
            console.log('ip: ', a);
            callback(a,url)
        });
}

function get(ip, url) {
    const net = require('net');
    const data = parsedUrl(url)
    const host = ip;
    const port = data.port;
    // console.log(`host: ${host} port: ${data.port}`);
    // 创建一个客户端, 可以连接到服务器
    const client = new net.Socket();
    // 客户端根据给出的配置参数打开一个连接, 这样可以连接到服务器
    client.connect(port, host, () => {
        //console.log('connect to: ', host, port);
        // 向服务器发送一个消息
        const request = `GET ${data.path} HTTP/1.1\r\nHost: ${data.host}\r\n\r\n`;
        console.log('request: ', request);
        client.write(request)
    });
    // 当接收服务器的响应数据时触发 data 事件
    client.on('data', (d) => {
        console.log('data:', d.toString());
        return d.toString()
        // 完全关闭 client 的连接, 套路写法
        client.destroy()
    });
    // client 关闭的时候触发这个事件
    client.on('close', function() {
        console.log('connection closed')
    });
}

let url = 'movie.douban.com'

exports.getHttp = function(url) {
    ip(url, get)
}
