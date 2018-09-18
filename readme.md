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
$ sitescan [options] [url(s)]
$ ss [options] [url(s)]
```

# Options
`-h` or `--help` 查看帮助信息

`-c` or `--config` 配置文件路径

`-d` or `--device` 可输入mobile、table、all 默认为mobile ruiscan -d all

`-dl` or `--devicelist` 自定义模拟器, 支持自定义：ruiscan -dl ["iPhone 4"] 

# Config

# Development
```
$ git clone https://github.com/cindyzhu/rui-site-scan.git
$ cd rui-site-scan
$ npm i
$ node ./lib/rui-site-scan.js -c ./config/miation.json
```
