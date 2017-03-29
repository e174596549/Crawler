"use strict"

const request = require('request')
const cheerio = require('cheerio')

const list = [
    "56630112",
    "58365288",
    "48651871",
    "49984611",
    "22308781",
    "76432746",
    "18007027",
    "51699796",
    "48452709",
    "39692981",
    "69225046",
    "83269244",
    "28910469",
    "29204689",
    "39413413",
    "31356689",
    "36903981",
    "38815873",
    "61615312",
    "4692045",
    "59499036",
    "56046058",
    "20127471",
    "37672891",
    "42666101",
    "45748091",
    "75894926",
    "77648050",
    "84417846",
    "39598055",
    "53589786",
    "67648192",
    "13933219",
    "51467388",
    "50997334",
    "74177376",
    "66538944",
    "39803835",
    "13061463",
    "39609569",
    "59569250",
    "71099600",
    "34929743",
    "68781652",
    "54432482",
    "76667252",
    "50827463",
    "27566727",
    "16613387",
    "57711426",
    "77515226",
    "9108507",
    "3194121",
    "57859230",
    "79684458",
    "4781483",
    "41422783",
    "55174880",
    "53535788",
    "63378016",
    "15586239",
    "29241213",
    "82674978",
    "35268287",
    "59129794",
    "48179443",
    "68109010",
    "38981059",
    "86599594",
    "57696172",
    "4872071",
    "19262959",
    "57815216",
    "65895008",
    "3086665",
    "37146809",
    "2343403",
    "56746900",
    "36876773",
    "53980070",
    "75812282",
    "75391138",
    "60095222",
    "58197692",
    "71821714",
    "57821194",
    "55912700",
    "55519646",
    "56099032",
    "79346606",
    "85039618"
]

var result = []

function Teacher() {
    this.id = ''
    this.name = ''
    this.totalHours = ''
    this.favorableRate = ''
    this.intro = ''
    this.basicInformation = ''
    this.teachingExperience = ''
    this.briefIntroduction = ''
    this.good = ''
    this.medium = ''
    this.inferior = ''
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
            const a = new Teacher()
            let id = options.url.split('/')
            let teacher = e('.basic-info')
            a.id = id[id.length - 1]
            a.name = teacher[0].children[0].children[0].data
            a.totalHours = teacher[0].children[1].children[0].data.split(' ')[1]
            a.favorableRate = teacher[0].children[1].children[1].children[0].data.split(' ')[1]

            for (var i = 0; i < teacher[0].children[2].children.length; i++) {
                a.intro += ' ' + teacher[0].children[2].children[i].children[0].data
            }
            let tbody = e('tbody')
            // a.teacher = teacher[0].children[0].children[1].children[0].data

            for (let i = 0; i < 2; i++) {
                a.basicInformation += ' ' + tbody[0].children[i].children[1].children[0].data
            }
            //console.log(tbody[0].children[2].children[1].children[0].children[0].children[1]);
            try {
                //console.log(tbody[0].children[2]);
                if (tbody[0].children[2].children[1].children[0].children) {
                    for (let i = 0; i < tbody[0].children[2].children[1].children[0].children.length; i++) {
                        for (let j = 0; j < tbody[0].children[2].children[1].children[0].children[i].children.length; j++) {
                            a.teachingExperience += ' ' + tbody[0].children[2].children[1].children[0].children[i].children[j].children[0].data
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {

            }

            a.briefIntroduction = e('.self-bd').text()
            let rates = e('.rates')
            try {
                a.good = rates[0].children[1].children[1].children[0].data
                a.medium = rates[0].children[2].children[1].children[0].data
                a.inferior = rates[0].children[3].children[1].children[0].data
            } catch (e) {
                console.log(e);
            } finally {

            }
            result.push(a)
            console.log(a);
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
        const url = `https://www.yuanfudao.com/teachers/${num}`
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
            //let arr = Array.from(result);
            _saveJSON('yuanfudao-teacher.json', result)
            clearInterval(timmer)
        }
    }, 1000)

}

// 程序开始的主函数
__main()
