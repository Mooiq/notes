/* 
    fs 模块
    Node.js内置模块就是文件系统模块，负责读写文件。
    fs 模块提供了异步和同步的读写方法
*/
var fs = require('fs');
fs.readFile('sample.txt', 'utf-8', function(err, data){
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
})
// fs.readFile 第二个参数若不填 会以Buffer的方式读取
//  'utf-8'：hello, world!
//  不填：<Buffer 68 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>

// 转换
// Buffer -> String
    // var text = data.toString('utf-8');
    // console.log(text);
// String -> Buffer
    // var buf = Buffer.from(text, 'utf-8');
    // console.log(buf);

// 同步读文件
var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);

// 写文件
var data2 = 'Hello, Node.js';
// 若不存在output.txt 会自动在当前目录下创建该文件 并写入数据
fs.writeFile('output.txt', data2, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

// stat 文件大小，创建时间等信息
fs.stat('sample.txt',function(err, stat){
    if(err){
        console.log(err);
    } else {
        // 是否是文件
        console.log('isFile:',stat.isFile());
        // 是否是目录
        console.log('isDirectory:', stat.isDirectory());
        if(stat.isFile()){
            // 文件大小
            console.log('size:',stat.size);
            // 创建时间 Date对象
            console.log('create time:',stat.birthtime);
            // 修改事件 Date对象
            console.log('modify time:',stat.mtime);
        }
    }
});


// stream 
// 是Node.js提供的一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

// 打开一个流
var ws1 = fs.createWriteStream('output1.txt','utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write('使用Stream写入二进制数据...\n');
ws2.write('END.','utf-8');
ws2.end();

