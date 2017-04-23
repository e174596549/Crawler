const request = require('request')
const cheerio = require('cheerio')

const cachedUrl = function(path) {
    const fs = require('fs')
    // 先尝试去硬盘中读取这个 url 对应的文件
    fs.readFile(path, function(err, data){
        let list = JSON.parse(data)

        for (var i = 0; i < list.length; i++) {
            const url = list[i].url
            const name = list[i].name
            //console.log(list);
            setTimeout(function(){
                //console.log(url);
                const cookie = '__cfduid=d0e1eb948d15ca911f8cfa47a3370ad6e1492936887; CLIPSHARE=3c7f375msgedi2tj2nrdm0bn82; show_msg=1; 91username=e174596549; DUID=0fdfcHJoEyPBRQfBH4aAdn32rwXhXSV%2FHIB%2FlpogJZua6%2Frs; USERNAME=d7dfoWqnBcKMdENh6KQi%2FnzH5ZmK9wgFzicJrjPvoYzhWnCmakbf; user_level=5; EMAILVERIFIED=no; level=5; watch_times=8; __utma=38902711.697155163.1492936888.1492936888.1492936888.1; __utmb=38902711.0.10.1492936888; __utmc=38902711; __utmz=38902711.1492936888.1.1.utmcsr=dizhi.space|utmccn=(referral)|utmcmd=referral|utmcct=/Cazn2/'
                const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
                const headers = {
                    'Cookie': cookie,
                    'User-Agent': useragent,
                }
                const options = {
                    url: url,
                    headers: headers,
                }
                try {
                    request(options, function(error, response, body) {
                        if (error === null && response.statusCode == 200) {
                            //console.log('read');
                            answersFromBody(body, name)
                        } else {
                            console.log('*** ERROR 请求失败 ', error)
                        }
                    })
                } catch (e) {
                    console.log(e);
                } finally {

                }
            },1000)
        }
    })
}

const answersFromBody = function(body, name) {
    // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
    const options = {
        decodeEntities: false,
    }
    const e = cheerio.load(body, options)

    let url = e('source').attr('src')
        console.log(url);
    const path = `${__dirname}/data/img/` + name + '.mp4'
    // request({
    //     uri: url,
    //     encoding: 'binary'
    // }, function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         const fs = require('fs')
    //         console.log('start download:', name);
    //         fs.writeFileSync(path, body, 'binary', function(err) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log(`download ${name}`);
    //             }
    //         });
    //     }
    // });
}

const answerFromDiv = function(div) {
    // 这个函数来从一个回答 div 里面读取回答信息
    const a = new Answer()
    // 使用 cheerio.load 函数来返回一个可以查询的特殊对象
    // 使用这个 options 才能使用 html() 函数来获取带回车的文本信息
    const options = {
        decodeEntities: false,
    }
    const e = cheerio.load(div, options)
    // 然后就可以使用 querySelector 语法来获取信息了
    // .text() 获取文本信息
    a.author = e('.author-link-line > .author-link').text()
    // 如果用 text() 则会获取不到回车
    // 这里要讲一讲爬虫的奥义
    a.content = e('.zm-editable-content').html()
    //
    a.link = 'https://zhihu.com' + e('.answer-date-link').attr('href')
    a.numberOfComments = e('.toggle-comment').text()
    // log('***  ', a.content)
    return a
}


const __main = function(number) {
    // 这是主函数
    // 知乎答案

    const path = `${__dirname}/data/url/`+ num +'.json'
    cachedUrl(path)
}
// 程序开始的主函数
var num = 18
__main(num)
// var i = 2
// setInterval(function() {
//     __main(num++)
// }, 1000)
