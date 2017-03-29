"use strict"

const request = require('request')
const cheerio = require('cheerio')

const list = [
    "/lessons/3021962.html",
    "/lessons/3020004.html",
    "/lessons/3021692.html",
    "/lessons/3022002.html",
    "/lessons/3021686.html",
    "/lessons/3021548.html",
    "/lessons/3021546.html",
    "/lessons/3021544.html",
    "/lessons/3021540.html",
    "/lessons/3021206.html",
    "/lessons/3021202.html",
    "/lessons/3021218.html",
    "/lessons/3021220.html",
    "/lessons/3021222.html",
    "/lessons/3021224.html",
    "/lessons/3021226.html",
    "/lessons/3021208.html",
    "/lessons/3021210.html",
    "/lessons/3021212.html",
    "/lessons/3021214.html",
    "/lessons/3021216.html",
    "/lessons/3019638.html",
    "/lessons/3019640.html",
    "/lessons/3019642.html",
    "/lessons/3019644.html",
    "/lessons/3019646.html",
    "/lessons/3019926.html",
    "/lessons/3019928.html",
    "/lessons/3019740.html",
    "/lessons/3021812.html",
    "/lessons/3019742.html",
    "/lessons/3021424.html",
    "/lessons/3020090.html",
    "/lessons/3019240.html",
    "/lessons/3019246.html",
    "/lessons/3019248.html",
    "/lessons/3019250.html",
    "/lessons/3019252.html",
    "/lessons/3019254.html",
    "/lessons/3019256.html",
    "/lessons/3019258.html",
    "/lessons/3019260.html",
    "/lessons/3019774.html",
    "/lessons/3019776.html",
    "/lessons/3019780.html",
    "/lessons/3019784.html",
    "/lessons/3019786.html",
    "/lessons/3019788.html",
    "/lessons/3019790.html",
    "/lessons/3022220.html",
    "/lessons/3020490.html",
    "/lessons/3020494.html",
    "/lessons/3020492.html",
    "/lessons/3020486.html",
    "/lessons/3020478.html",
    "/lessons/3020488.html",
    "/lessons/3021936.html",
    "/lessons/3022000.html",
    "/lessons/3022060.html",
    "/lessons/3022062.html",
    "/lessons/3021874.html",
    "/lessons/3022102.html",
    "/lessons/3022100.html",
    "/lessons/3021110.html",
    "/lessons/3021112.html",
    "/lessons/3021122.html",
    "/lessons/3019834.html",
    "/lessons/3019836.html",
    "/lessons/3019840.html",
    "/lessons/3019842.html",
    "/lessons/3019844.html",
    "/lessons/3019846.html",
    "/lessons/3021576.html",
    "/lessons/3021606.html",
    "/lessons/3021586.html",
    "/lessons/3021596.html",
    "/lessons/3021616.html",
    "/lessons/3021626.html",
    "/lessons/3021558.html",
    "/lessons/3021636.html",
    "/lessons/3021568.html",
    "/lessons/3021534.html",
    "/lessons/3021578.html",
    "/lessons/3021588.html",
    "/lessons/3019958.html",
    "/lessons/3019964.html",
    "/lessons/3019966.html",
    "/lessons/3021814.html",
    "/lessons/3021820.html",
    "/lessons/3022030.html",
    "/lessons/3021822.html",
    "/lessons/3021344.html",
    "/lessons/3021346.html",
    "/lessons/3021348.html",
    "/lessons/3021350.html",
    "/lessons/3021352.html",
    "/lessons/3021982.html",
    "/lessons/3021984.html",
    "/lessons/3021354.html",
    "/lessons/3021988.html",
    "/lessons/3022020.html",
    "/lessons/3021356.html",
    "/lessons/3022022.html",
    "/lessons/3022024.html",
    "/lessons/3021974.html",
    "/lessons/3022018.html",
    "/lessons/3021976.html",
    "/lessons/3021978.html",
    "/lessons/3021980.html",
    "/lessons/3021690.html",
    "/lessons/3021708.html",
    "/lessons/3021744.html",
    "/lessons/3021688.html",
    "/lessons/3021752.html",
    "/lessons/3021750.html",
    "/lessons/3021690.html",
    "/lessons/3021706.html",
    "/lessons/3021744.html",
    "/lessons/3021712.html",
    "/lessons/3021716.html",
    "/lessons/3021714.html",
    "/lessons/3019792.html",
    "/lessons/3021834.html",
    "/lessons/3018876.html",
    "/lessons/3021462.html",
    "/lessons/3019448.html",
    "/lessons/3020778.html",
    "/lessons/3021236.html",
    "/lessons/3021482.html",
    "/lessons/3019974.html",
    "/lessons/3021528.html",
    "/lessons/3020052.html",
    "/lessons/3021908.html",
    "/lessons/3019978.html",
    "/lessons/3019290.html",
    "/lessons/3020780.html",
    "/lessons/3021520.html",
    "/lessons/3019496.html",
    "/lessons/3021014.html",
    "/lessons/3019918.html",
    "/lessons/3021104.html",
    "/lessons/3020916.html",
    "/lessons/3021012.html",
    "/lessons/3021066.html",
    "/lessons/3021552.html",
    "/lessons/3021780.html",
    "/lessons/3021556.html",
    "/lessons/3021506.html",
    "/lessons/3021904.html",
    "/lessons/3021542.html",
    "/lessons/3022304.html",
    "/lessons/3019870.html",
    "/lessons/3019386.html",
    "/lessons/3019414.html",
    "/lessons/3020020.html",
    "/lessons/3021002.html",
    "/lessons/3021174.html",
    "/lessons/3021016.html",
    "/lessons/3020120.html",
    "/lessons/3020970.html",
    "/lessons/3020998.html",
    "/lessons/3021274.html",
    "/lessons/3021676.html",
    "/lessons/3021914.html",
    "/lessons/3018684.html",
    "/lessons/3022104.html",
    "/lessons/3020022.html",
    "/lessons/3020494.html",
    "/lessons/3021508.html",
    "/lessons/3020024.html",
    "/lessons/3021086.html",
    "/lessons/3021090.html",
    "/lessons/3021934.html",
    "/lessons/3020044.html",
    "/lessons/3021100.html",
    "/lessons/3021000.html",
    "/lessons/3021848.html",
    "/lessons/3020180.html",
    "/lessons/3021940.html",
    "/lessons/3020996.html",
    "/lessons/3020046.html",
    "/lessons/3022032.html",
    "/lessons/3021312.html",
    "/lessons/3022114.html",
    "/lessons/3020948.html",
    "/lessons/3021106.html",
    "/lessons/3022116.html",
    "/lessons/3022324.html",
    "/lessons/3022334.html",
    "/lessons/3022318.html",
    "/lessons/3022330.html",
    "/lessons/3022314.html"
]

var result = []

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
            const a = new Course()
            const courses = []
            // 查询对象的查询语法和 DOM API 中的 querySelector 一样
            const element = e('.basic-info')
            let kind = element[0].children[0].children[0].attribs.class

            a.kind = kind.split('-')[1]
            a.courseName = element[0].children[0].children[0].next.data

            let time = element[0].children[1].children[1].data
            a.schedule = time.split(' ')[0]
            a.times = time.split(' ')[1]
            a.textbook = element[0].children[2].children[0].data

            let prices = e('.prices > em')
            try {
                a.price = prices[0].children[0].data
            } catch (e) {
                console.log(e);
                return
            } finally {

            }


            let commonNum = e('.common-num')

            a.status = commonNum[0].children[0].data + '人购买 ' + commonNum[1].children[0].data + '月' +
                commonNum[2].children[0].data + '日停售'
            let text = e('.intro-panel')
            try {
                a.content = text[0].children[0].children[8].data
            } catch (e) {
                console.log(e);
                return
            } finally {

            }

            let id = e('.J_SellBtn')
            a.id = id[0].attribs['data-id']
            let teacher = e('.teachers')
            a.teacher = teacher[0].children[0].children[1].children[0].data

            let tbody = e('tbody')
            //console.log('tbody[0].children[0]', tbody[0].children.length);
            for (var i = 0; i < tbody[0].children.length; i++) {
                let name = tbody[0].children[i].children[1].children[0].children[0].data
                let info = tbody[0].children[i].children[2].children[0].children[0].data
                a.lessonList.push({
                    time: info,
                    content: name
                })
            }
            result.push(a)
            //console.log(result);
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
    var i = 0

    let timmer = setInterval(() => {
        console.log('i: ', i);
        var num = list[i]
        console.log('list:', num);
        const url = `https://www.yuanfudao.com${num}`
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
            courseFromDiv(options)
            // console.log(a);

        } catch (e) {

        } finally {

        }
        i++
        //console.log(result);
        if (i === list.length) {
            _saveJSON('yuanfudao.json', result)
            clearInterval(timmer)
        }
    }, 1000)

}

// 程序开始的主函数
__main()
