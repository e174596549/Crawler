"use strict"

const request = require('request')
const cheerio = require('cheerio')

const list = [
    10035,
    10262,
    10263,
    13459,
    10278,
    10279,
    13461,
    10275,
    10280,
    10261,
    10247,
    10239,
    11192,
    10248,
    10276,
    10238,
    10245,
    13622,
    10240,
    10079,
    10094,
    13506,
    10088,
    10096,
    10260,
    10073,
    13582,
    13301,
    13304,
    10244,
    10271,
    13913,
    10141,
    10159,
    10255,
    10281,
    10072,
    10091,
    13504,
    10085,
    10078,
    13495,
    14661,
    13580,
    10237,
    10268,
    10140,
    10267,
    10152,
    10264,
    13298,
    13546,
    10076,
    10083,
    11770,
    12383,
    10308,
    10158,
    10778,
    10236,
    13687,
    10249,
    13310,
    10080,
    13290,
    10074,
    13644,
    10151,
    10156,
    13522,
    10145,
    10253,
    10092,
    10265,
    10150,
    10266,
    10272,
    10273,
    10453,
    13492,
    10090,
    13316,
    13787,
    10146,
    13524,
    13543,
    10153,
    10274,
    14675,
    10081,
    10089,
    10093,
    13501,
    10256,
    10284,
    10087,
    10149,
    10235,
    10138,
    13294,
    13747,
    10309,
    10143,
    10082,
    13313,
    13322,
    13498,
    10086,
    11696,
    10270,
    10254,
    10084,
    10155,
    10257,
    10139,
    10157,
    10095,
    12374,
    14750,
    13458,
    13460,
    14835,
    14810,
    14789,
    14852,
    14814,
    14849,
    14777,
    14884,
    14905,
    14906,
    14579,
    14838,
    14801,
    14860,
    15298,
]

var result = []

function Course() {
    this.id = ''
    this.status = ''
}

const log = function() {
    console.log.apply(console, arguments)
}


const courseFromDiv = function(options) {
    // 这个函数来从一个回答 div 里面读取回答信息

    // 使用 cheerio.load 函数来返回一个可以查询的特殊对象
    // 使用这个 options 才能使用 html() 函数来获取带回车的文本信息

    request(options, function(error, response, body) {
        // 下载好了之后，保存到本地文件
        // TODO, 应该下载成功之后再保存
        if (error === null && response.statusCode == 200) {
            // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
            // body 就是 html 内容
            const e = cheerio.load(body)
            const a = new Course()

            const timer = e('#timer')
            a.id = timer[0].attribs['data-id']
            var str = timer[0].attribs['enroll-cnt']
            a.status = str.slice(2, str.length - 3)
            result.push(a)
        }
    })
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


const _saveJSON = function(path, answers) {
    // 这个函数用来把一个保存了所有电影对象的数组保存到文件中
    const fs = require('fs')
    const s = JSON.stringify(answers, null, 2)
    fs.writeFile(path, s, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}

const __main = function() {
    // 这是主函数
    // 知乎答案
    var i = 0

    let timmer = setInterval(() => {
        console.log(i);
        var num = list[i]
        console.log(num);
        const url = `http://zhibo.zuoyebang.com/elearning/course/detail?courseId=${num}`
        // request 从一个 url 下载数据并调用回调函数
        // 根据 伪装登录爬虫设置图例 替换 cookie 和 useragent 中的内容
        // 这里 useragent 我已经替换好了, 替换上你自己的 cookie 就好了
        //const cookie =
        const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
        const headers = {
            //'Cookie': cookie,
            'User-Agent': useragent,
        }

        const options = {
            url: url,
            headers: headers,
        }
        try {
            let a = courseFromDiv(options)
            //console.log(a);

        } catch (e) {

        } finally {

        }
        i++
        //console.log(result);
        if (i === list.length) {
            let a = new Date().toLocaleString();
            a = a.split(' ').join('').split(',').join('/').split(':').join('-')
            _saveJSON(`zuoyebang-status(${a}).json`, result)
            clearInterval(timmer)
        }
    }, 1000)

}

// 程序开始的主函数
__main()
