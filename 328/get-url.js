"use strict"

const request = require('request')
const cheerio = require('cheerio')

const list = [
    3022324,
    3022334,
    3022318,
    3022330,
    3022314
]

var result = []
var urls = []

function Course() {
    this.id = ''
    this.courseName = ''
    this.kind = ''
    this.content = ''
    this.schedule = ''
    this.classHours = ''
    this.times = ''
    this.textbook = ''
    this.teacher = ''
    this.price = ''
    this.status = ''
    this.lessonList = []
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
            var Div = e('h3')
            for (var i = 0; i < Div.length; i++) {
                urls.push(Div[i].children[0].attribs.href)
            }
            _saveJSON('url-12.json', urls)
            // 查询对象的查询语法和 DOM API 中的 querySelector 一样
            // console.log();
            // for (var i = 0; i < lessonList.length; i++) {
            //     a.lessonList.push({
            //         time: lessonList[i].attribs.time,
            //         content: lessonList[i].children[0].data
            //     })
            // }
            //result.push(a)
            //let element = img[0]
            // let element = movieDivs[i]
            //     // 获取 div 的元素并且用 movieFromDiv 解析
            //     // 然后加入 movies 数组中
            //const div = e(element).html()
            // 然后就可以使用 querySelector 语法来获取信息了
            // .text() 获取文本信息
            //a.author = e('.author-link-line > .author-link').text()
            // 如果用 text() 则会获取不到回车
            // 这里要讲一讲爬虫的奥义
            //a.content = e('.zm-editable-content').html()
            //
            //a.link = 'https://zhihu.com' + e('.answer-date-link').attr('href')
            //a.numberOfComments = e('.toggle-comment').text()
            // log('***  ', a.content)
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
    var i = 1

    //let timmer = setInterval(() => {
    console.log(i);
    //var num = list[i]
    //console.log(num);
    const url = `https://www.yuanfudao.com/?page=${i}&studyPhase=chuzhong&channelId=0&grade=0`
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
        url: 'https://www.yuanfudao.com/lessons/groups/11320?groupName=%E3%80%90%E6%96%87%E7%A7%91%E3%80%91%E7%8C%BF%E8%BE%85%E5%AF%BC%E4%BA%8C%E6%A8%A1%E8%AF%95%E5%8D%B7%E8%AE%B2%E8%AF%84%E5%8F%8A2017%E9%AB%98%E8%80%83%E8%80%83%E7%82%B9%E9%A2%84%E6%B5%8B&studyPhase=gaozhong',
        headers: headers,
    }
    try {
        let a = courseFromDiv(options)
        //  console.log(a);

    } catch (e) {

    } finally {

    }
    i++
    console.log(i);
    if (i >= 2) {
        //_saveJSON('url.json', urls)
        //clearInterval(timmer)
    }
    //}, 1000)

}

// 程序开始的主函数
__main()
