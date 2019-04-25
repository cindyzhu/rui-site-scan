<h1 align="center">rui-site-scan</h1>
<p align="center">CLI for capturing website screenshots, powered by <a href="https://github.com/GoogleChrome/puppeteer">puppeteer</a>.</p>

# Installation

To install globally:
```
$ npm install rui-site-scan -g
```

# Usage

You can use `ruiscan` or just `rscan`:
```
$ ruiscan [options] [url(s)]
$ rscan [options] [url(s)]
```

# Options
`-h` or `--help` 查看帮助信息

`-c` or `--config` 配置文件路径

`-d` or `--device` 可输入mobile、table、all 默认为mobile; ruiscan -d all

`-dl` or `--devicelist` 自定义模拟器, 支持自定义：ruiscan -dl ["iPhone 4"] 

# Config
示例代码
```
{
  "type": "spa",                                        //目前只支持spa
  "baseStep": {
    "rootPath": "agency",                               //项目生成的截图存储的目录
    "filePath": "home",                                 //页面目录
    "fileName": "index",                                //页面名称
    "wrapEle": ".wrap",                                 // 最外层的div标记
    "indexUrl": "http://singlepage.xxx.com/singlepage/agency/asdasd", //入口页面地址
    "pageTimeout": 500,                                 //页面等待时间（毫秒）
    "inputTimeout": 100,                                //input失去焦点等待时间（毫秒）
    "stepList": [{ //页面元素操作
        "type": "input",                                //支持input button；button 类型需要输入事件类型
        "ele": "[placeholder='本人姓名']",               //元素标记
        "value": "张三",                                //输入值
        "screenShot": false                            //是否介入
      },
      {
        "type": "input",
        "ele": "[placeholder='本人身份证']",
        "value": "360822198609284091",
        "screenShot": false
      },
      {
        "type": "button",
        "ele": ".select-bank",
        "eventType": "tap",                          //支持事件与pupper官网一致；详情见【https://github.com/GoogleChrome/puppeteer】
        "fileName": "selectBank",
        "screenShot": true
      },
      {
        "type": "button",
        "ele": ".popup .next",
        "eventType": "tap",
        "screenShot": false
      },
      {
        "type": "input",
        "ele": "[placeholder='收款银行卡号']",
        "value": "6222600260001072444",
        "screenShot": false
      },
      {
        "type": "input",
        "ele": "[placeholder='银行卡预留手机号']",
        "value": "18611287904",
        "screenShot": false
      },
      {
        "type": "input",
        "ele": "[placeholder='短信验证码']",
        "value": "132123",
        "screenShot": false
      },
      {
        "type": "button",
        "ele": ".ft .btn",
        "eventType": "tap", 
        "fileName": "submint",
        "screenShot": true
      }
    ]
  },
  "pageList": [{ //第一页后面跳转的页面
    "filePath": "agencyResult", //页面目录
    "wrapEle": ".wrap", //外层div
    "fileName": "agencyResult", //页面文件名
    "pageTimeout": 800 //等待时间
  }]
}
```
# Development
在任意目录执行
```
$ ruiscan ./test.json
```
执行完之后，在执行目录下生成项目文件夹；每个项目文件夹下会有对应的页面文件夹；每个页面文件夹下会生成不同设备下的页面截图；
更多示例见：https://github.com/cindyzhu/rui-site-scan/tree/master/examples