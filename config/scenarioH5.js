module.exports = {
  type: 'spa',
  baseStep: {
    rootPath: 'h5',
    filePath: 'login',
    fileName: 'login',
    wrapEle: '.wrap',
    indexUrl: 'http://localhost:8080/h5/login',
    pageTimeout: 500,
    inputTimeout: 100,
    stepList: [{
        type: 'input',
        ele: '[placeholder="请输入手机号"]',
        value: '18611406250',
        screenShot: false
      },
      {
        type: 'input',
        ele: '[placeholder="请输入图片验证码"]',
        value: '1234',
        screenShot: false
      },
      {
        type: 'input',
        ele: '[placeholder="请输入手机验证码"]',
        value: '123444',
        screenShot: false
      },
      {
        type: 'button',
        ele: '.vcode-box button',
        eventType: 'tap',
        fileName: 'vcode',
        screenShot: true
      },
      {
        type: 'button',
        ele: '.submit button',
        eventType: 'tap',
        fileName: 'submint',
        screenShot: true
      }
    ]
  },
  pageList: [{
    filePath: 'orderlist',
    wrapEle: '.wrap',
    fileName: 'orderlist',
    pageTimeout: 200,
    inputTimeout: 20
  }]
}