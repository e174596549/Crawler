// 如果没有这一行, 就没办法使用一些 let const 这样的特性
"use strict"


const request = require('request')
const cheerio = require('cheerio')

/*
本文件需要安装两个基本的库
request 用于下载网页
cheerio 用于解析网页数据

安装命令如下
npm install request cheerio
*/

// 定义一个类来保存回答的信息
// 这里只定义了 4 个要保存的数据
// 分别是  问题 作者 内容 链接
function Answer() {
    this.question = ''
    this.author = ''
    this.content = ''
    this.link = ''
}


const log = function() {
    console.log.apply(console, arguments)
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

    a.question = e('.question_link').text()

    a.content = e('.zm-item-rich-text').html()

    a.author = e('.zm-item-rich-text').attr('data-author-name')

    a.link = 'https://zhihu.com' + e('.zm-item-rich-text').attr('data-entry-url')

    //log('answerFromDiv a.author = ', a.link)
    // a.author = e('.author-link-line > .author-link').text()
    // // 如果用 text() 则会获取不到回车
    // a.content = e('.zm-editable-content').html()
    // //
    // a.link = 'https://zhihu.com' + e('.answer-date-link').attr('href')
    // a.numberOfComments = e('.toggle-comment').text()
    // log('***  ', a.content)
    return a
}


const answersFromBody = function(body) {
    // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
    const options = {
        decodeEntities: false,
    }
    const e = cheerio.load(body, options)
    // 查询对象的查询语法和 DOM API 中的 querySelector 一样
    const divs = e('.feed-item-hook')
    //log('answersFromBody divs', divs)

    // let element = divs[0]
    // const div = e(element).html()
    // const m = answerFromDiv(div)
    //
    const answers = []
    // answers.push(m)
    for (let i = 0; i < divs.length; i++) {
        let element = divs[i]
        // 获取 div 的元素并且用 movieFromDiv 解析
        // 然后加入 movies 数组中
        const div = e(element).html()
        const m = answerFromDiv(div)
        answers.push(m)
    }
    return answers
}


const writeToFile = function(path, data) {
    const fs = require('fs')
    fs.writeFile(path, data, function(error) {
        if (error != null) {
            log('--- 写入成功', path)
        } else {
            log('*** 写入失败', path)
        }
    })
}


const cachedUrl = function(options, callback) {
    const fs = require('fs')
    // 先生成对应的文件
    const path = options.url.split('/').join('-').split(':').join('-')
    // 先尝试去硬盘中读取这个 url 对应的文件
    fs.readFile(path, function(err, data) {
        if (err != null) {
            // 读取这个文件失败
            // 读不到的话说明是第一次请求，那么就使用 request
            request(options, function(error, response, body) {
                // 下载好了之后，保存到本地文件
                // TODO, 应该下载成功之后再保存
                writeToFile(path, body)
                callback(error, response, body)
            })
        } else {
            log('读取到缓存的页面', path)
            // 读取到，说明已经下载过了，我们讲直接读取硬盘上的文件
            const response = {
                statusCode: 200,
            }
            callback(null, response, data)
        }
    })
}


const __main = function(number) {
    // 这是主函数
    // 知乎答案
    const url = 'https://www.zhihu.com/topic/19550901/top-answers?page=' + number
    // request 从一个 url 下载数据并调用回调函数
    // 根据 伪装登录爬虫设置图例 替换 cookie 和 useragent 中的内容
    // 这里 useragent 我已经替换好了, 替换上你自己的 cookie 就好了
    const cookie = '************|***********************; q_c1=1ede36857f274ddead3ad39076e4b6e0|1484147055000|1481264450000; r_cap_id="OGU3NmI2Y2Y2YWQ3NGRjN2E3N2JlZWU1NDM1ZDM0ZTc=|1484147057|ef1e863906b5dd3a2723a68cdad11d7987c362ab"; login="ZWI0NjcwMDcxOTZhNDk4Zjk1MGVlOGNjOTM3YzUxNTQ=|1484147066|c452cc2b5bfa22f23482e467a813f9605dfdd20a"; _xsrf=b08047425d2b394c9b9106bb47ce2ec8; aliyungf_tc=AQAAAL+iJA/BnAMAWHJlcO2Op/MzYiw1; l_cap_id="ZDkxM2M3YWY3ZjY5NDc1Nzg5MDhjNmVjN2RkNWY5NzY=|1486258328|0a4eb3534b05f331a5b1424aef2276bfd9a22804"; cap_id="ZDk1OGI3Y2YxZDNkNGJhMGI4NzEzNWYwZDQ0NWM3YWM=|1486258328|5691dfd1a5a5dd846bb14e7984472bde33dafd8c"; n_c=1; capsion_ticket="2|1:0|10:1486258331|14:capsion_ticket|44:OTliZmFmMzZjYzZhNDkwYmJkMTU2NjdmNDUzZWViYzY=|74ff438bfd7671bf43bd6b117f2bedbb0d49618c0b1fe2a5e3cbf0f6a7bac737"; s-q=%E4%BA%BA%E6%80%A7%20%E4%B9%A6; s-i=4; sid=o0gckqda; z_c0=Mi4wQUFBQVE4Z2RBQUFBVUVKRUlLUDRDaVlBQUFCZ0FsVk5xdzItV0FBMXpCS2NSbTRLQzRDWGMxd09HZnd6QndpQkVB|1486356548|56e6f642de9058fbfb840edb09a7c9cc243cfc18; nweb_qa=heifetz; __utma=51854390.1572529805.1486352290.1486354333.1486356549.3; __utmb=51854390.0.10.1486356549; __utmc=51854390; __utmz=51854390.1486356549.3.2.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/topic/19550901/hot; __utmv=51854390.100-1|2=registration_date=20130904=1^3=entry_date=20130904=1'
    const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
    const headers = {
        'Cookie': cookie,
        'User-Agent': useragent,
    }

    const options = {
        url: url,
        headers: headers,
    }
    cachedUrl(options, function(error, response, body) {
        // 回调函数的三个参数分别是  错误, 响应, 响应数据
        // 检查请求是否成功, statusCode 200 是成功的代码
        if (error === null && response.statusCode == 200) {
            const answers = answersFromBody(body)

            // 引入自己写的模块文件
            // ./ 表示当前目录
            const utils = require('./utils')
            const path = 'zhihu.answers' + number + '.txt'
            utils.saveJSON(path, answers)
        } else {
            log('*** ERROR 请求失败 ', error)
        }
    })
    // request(options, function(error, response, body) {
    //     // 回调函数的三个参数分别是  错误, 响应, 响应数据
    //     // 检查请求是否成功, statusCode 200 是成功的代码
    //     if (error === null && response.statusCode == 200) {
    //         const answers = answersFromBody(body)
    //
    //         // 引入自己写的模块文件
    //         // ./ 表示当前目录
    //         const utils = require('./utils')
    //         const path = 'zhihu.answers.txt'
    //         utils.saveJSON(path, answers)
    //     } else {
    //         log('*** ERROR 请求失败 ', error)
    //     }
    // })
}

// 程序开始的主函数


var i = 2
setInterval(function() {
    __main(i++)
}, 2000)
