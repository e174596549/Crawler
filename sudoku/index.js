#!/usr/local/bin/node
 // 这一行是套路, 给 node.js 用的
// 如果没有这一行, 就没办法使用一些 let const 这样的特性


const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

/*
本文件需要安装两个基本的库
request 用于下载网页
cheerio 用于解析网页数据
*/

//根据url爬取数据
const imgFromUrl = function(url) {
    //console.log('imgFromUrl');
    request(url, function(error, response, body) {
        // 回调函数的三个参数分别是  错误, 响应, 响应数据
        // 检查请求是否成功, statusCode 200 是成功的代码
        //console.log('request');
        if (error === null && response.statusCode == 200) {
            // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
            // body 就是 html 内容
            const e = cheerio.load(body)
            const imgs = []
            // 查询对象的查询语法和 DOM API 中的 querySelector 一样
            const temp = e('script')
            //定位需要数据位置
            let element = temp[7].children[0].data.split("=")
            let num = element[2].split(';')[0]
            num = num.split('').splice(1, num.length - 2).join('')
            //console.log('得到数据：', num);
            let nameArr = [9, 0, 5, 1, '000']
            validate(nameArr[0], nameArr[1], num, '')
            //存储
        } else {
            console.log('*** ERROR 请求失败 ', error)
        }
    })

}

//批量存储题目到目标格式文件
function toSave(arr) {
    _saveJSON('./data/data-9.json', arr)
    for (var i = 0; i < arr.length; i++) {
        let n = 0
        //题目文件命名序号
        n = i + 110
        if (n < 10) {
            var name = '905100' + n + '.num'
        }
        if (n >= 10 && n < 100) {
            var name = '90510' + n + '.num'
        }
        if (n >= 100) {
            var name = '9051' + n + '.num'
        }
        _saveJSON('./data/data9-0/' + name, 'num:' + arr[i].split('').join(' '))
    }
}

//另存题目为相应格式的文件
const _saveJSON = function(path, answers) {
    // 这个函数用来把一个保存了所有对象的数组保存到文件中
    const fs = require('fs')
    const s = JSON.stringify(answers, null, 2)
    fs.writeFile(path, answers, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
            //alert('*** 写入文件错误')
        } else {
            console.log('--- 保存成功')
            //alert('--- 保存成功')
        }
    })
}

//验证题目
function validate(space, mold, str, newStr) {
    //console.log('题目是：', str);
    const spawn = require('child_process').spawn;
    //console.log('__dirname', __dirname);
    const ls = spawn(`./sudoku.check_darwin`, [`${space}`, `${mold}`, str, newStr]);
    //${__dirname}/../../../../../../../../../../Applications/Utilities/Terminal.app`
    let canSave = true

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        //错误的话继续生成
        //    console.log(`stderr: ${data}`);
        if (data) {
            //alert('题目错误！')
            console.log('题目错误');
            canSave = false
        } else {


        }
    });

    ls.on('close', (code) => {
        //console.log(`child process exited with code ${code}`);

        //正确的话存入临时数组
        if (canSave) {
            //_saveJSON(`${name}.num`, saveArr)
            //alert('题目正确！')
            //console.log('题目正确');
            problemArr.add(str)
            console.log('题目正确', problemArr.size);
        }
    });
}

function __main() {
    problemArr = new Set()
    let i = 130
    let timer = setInterval(() => {
        let url = `http://www.llang.net/sudoku/` + i + '.html'
        i++
        imgFromUrl(url)
        if (problemArr.size >= 100) {
            console.log('可使用数据：', problemArr);
            var newArr = Array.from(problemArr)
            console.log('newArr', newArr);
            toSave(newArr)
            clearInterval(timer)
        }
    }, 1000)
}

// 程序开始的主函数
__main()
