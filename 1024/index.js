function bindButton() {
    let buttonInput = e('#id-button')
    bindEvent(buttonInput, 'click', (event) => {
        let input = e('#id-input')
        let inputUrl = input.value || input.placeholder
        localStorage.url = inputUrl
        console.log('上次下载：', localStorage.url);
        console.log(inputUrl);
        pa100(inputUrl)
        let arr = inputUrl.split('=')
        arr[arr.length - 1] = Number(arr[arr.length - 1]) + 1
        input.value = arr.join('=')
        //console.log('已下载：', localStorage.downloaded);
    })

}

function pa100(url) {
    var spawn = require('child_process').spawn;
    console.log('__dirname', __dirname);
    var ls = spawn(`${__dirname}/./url-acquire`, [url]);
    //${__dirname}/../../../../../../../../../../Applications/Utilities/Terminal.app`
    //let canSave = true
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        if (data) {
            alert('错误:', data)
            //canSave = false
        } else {
            //alert('题目正确！')

        }
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        //urlAdd(url)
        //save(url)
        toDownLoad()
    });
}

function toDownLoad() {
    var spawn2 = require('child_process').spawn;
    console.log('__dirname2', __dirname);
    var ls2 = spawn2(`${__dirname}/./img-acquire`, ['']);
    //${__dirname}/../../../../../../../../../../Applications/Utilities/Terminal.app`
    //let canSave = true
    ls2.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls2.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        if (data) {
            alert('错误:', data)
            //canSave = false
        } else {
            //alert('题目正确！')

        }
    });
}

function turnOver() {
    var spawn3 = require('child_process').spawn;
    console.log('__dirname2', __dirname);
    var ls3 = spawn3(`bash`, ['export http_proxy=http://duotai:7Ek_vcfDRlu@sheraton.h.xduotai.com:21251']);
    //${__dirname}/../../../../../../../../../../Applications/Utilities/Terminal.app`
    //let canSave = true
    ls3.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls3.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        if (data) {
            alert('错误:', data)
            //canSave = false
        } else {
            //alert('题目正确！')

        }
    });

    ls3.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        //urlAdd(url)
        //save(url)
    });
}

function urlAdd(url) {
    let arr = load()
    arr.push(url)
    save(arr)
}

function main() {
    //    turnOver()
    console.log('上次下载：', localStorage.url);
    bindButton()

}

main()
