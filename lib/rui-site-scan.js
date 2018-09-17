const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')
// const rules = require('./config/scenarioH5')
// const rules = require('./config/vip')


const argv  = require('minimist')(process.argv.slice(2));
// console.log(process.execPath)
// console.log(__dirname)
// console.log(process.cwd())
if(!argv['c']) {
  console.log('配置文件不能为空; ruiscan -c "xxx.json"');
  return;
}
const configPath = path.join(process.cwd(), argv['c'])
if(!fs.existsSync(configPath)) {
  console.log('找不到配置文件：' + configPath)
  return;
}
const rules = require(configPath)
const archiver = require('archiver');

detailRules();
async function getDeviceList(devices) {
  let devicesList = ['iPhone 4'];
  // let devicesList = [];
  // for(let k in devices) {
  //   if(k.length >  2 && !devices[k].viewport.isLandscape && devices[k].viewport.width < 450) {
  //     devicesList.push(k);
  //   }
  // }
  return devicesList;
}

async function detailRules() {
  if(rules.type === 'spa') {
    spaTest()
  }
}

async function spaTest() {
  const list = rules.ruleList;
  const baseStep = rules.baseStep;
  const browser = await puppeteer.launch({
    headless: true
  });
  const devices = require('puppeteer/DeviceDescriptors');
  const deviceList = await getDeviceList(devices);
  const basePath = baseStep.rootPath + '/'+ baseStep.filePath;
   //不存在创建文件夹
   if(!fs.existsSync(baseStep.rootPath)) {
    fs.mkdirSync(baseStep.rootPath);
  }

   //不存在创建文件夹
  if(!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  for(var i = 0; i < deviceList.length; i++) {
    let k = deviceList[i];
    let iPhone = devices[k];
    console.log(k)
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.emulate(iPhone);
    await page.emulateMedia(null); 

    console.log(baseStep.indexUrl)
    await page.goto(baseStep.indexUrl, { waitUntil: 'load'})
    // await autoScroll(page);

    await page.waitFor(baseStep.wrapEle);
    await page.waitFor(baseStep.pageTimeout);
    
    console.log(`生产文件首页./${basePath}/(${k})-${baseStep.fileName}.png`)
    await page.screenshot({path: `./${basePath}/(${k})-${baseStep.fileName}.png`,  fullPage: true})
    //step1
    if(baseStep.stepList.length) {
      for(let i = 0; i < baseStep.stepList.length; i++) {
        const curStep = baseStep.stepList[i];
        if(curStep.type === 'input') {
          await page.type(curStep.ele, curStep.value, {delay: baseStep.inputTimeout});
        }
        if(curStep.type === 'button') {
          switch(curStep.eventType) {
            case 'click' :
              await page.click(curStep.ele, {delay: baseStep.inputTimeout})
            break;
            case 'tap': 
              await page.tap(curStep.ele, {delay:  curStep.buttonTimeout|| baseStep.inputTimeout})
            break;
          }
        }
        if(curStep.type === 'domList') {
         let domList =  await page.evaluate((curStep) => {
            const list =  [...document.querySelectorAll(curStep.ele)]
             list.forEach(el => {
               el.click({delay: 300});
               //await
            })
          }, curStep);
        }
        if(curStep.screenShot) {
          console.log(`生产文件./${basePath}/(${k})-${baseStep.fileName}-(${curStep.fileName}).png`)
          await page.screenshot({path: `./${basePath}/(${k})-${baseStep.fileName}-(${curStep.fileName}).png`,  fullPage: true})
        }
      }
    }
    //spa route list
    if(rules.pageList && rules.pageList.length) {
      for(let i = 0 ; i < rules.pageList.length; i++) {
        const curStep = rules.pageList[i];
        const filePath = baseStep.rootPath + '/' + curStep.filePath;
        if(!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
        }
        await page.waitForSelector(curStep.wrapEle);
        await page.waitFor(curStep.pageTimeout); 

        console.log(`生产首页文件./${filePath}/(${k})-${curStep.fileName}.png`)
        await page.screenshot({path: `./${filePath}/(${k})-${curStep.fileName}.png`,  fullPage: true})

        if(curStep.stepList && curStep.stepList.length) {
          for(let i = 0; i < curStep.stepList.length; i++) {
            const curSmallStep = curStep.stepList[i];
            if(curSmallStep.type === 'input') {
              await page.type(curSmallStep.ele, curSmallStep.value, {delay: curStep.inputTimeout});
            }
            if(curSmallStep.type === 'button') {
              switch(curSmallStep.eventType) {
                case 'click' :
                  await page.click(curSmallStep.ele, {delay: curStep.inputTimeout})
                break;
                case 'tap':
                  await page.waitFor(curStep.pageTimeout, {delay: curStep.inputTimeout}); 
                break;
              }
            }
            if(curSmallStep.screenShot) {
              console.log(`生产文件./${filePath}/(${k})-${curSmallStep.fileName}-(${curSmallStep.fileName}).png`)
              await page.screenshot({path: `./${filePath}/(${k})-${baseStep.fileName}-(${curSmallStep.fileName}).png`,  fullPage: true})
            }
          }
        }
      }
    }
    await page.close();
  }
  await browser.close();
  createZip(baseStep.rootPath);
}

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {

          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}
async function detailDom(page, curStep) {
  await page.evaluate((curStep) => {
    let list = [...document.querySelectorAll(curStep.ele)]
    console.log(list, 222222)
    list.forEach(el => {
       console.log(el, 333)
        el.click()
    })
    // return {
    //   width: document.documentElement.clientWidth,
    //   height : document.body.clientHeight,
    // }
  })
}
async function createZip(rootPath) {
  const output = fs.createWriteStream( path.join(process.cwd(), '/agency.zip'));
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });
  output.on('end', function() {
    console.log('Data has been drained');
  });
  archive.on('error', function(err) {
    throw err;
  });
  archive.pipe(output)
  archive.directory(rootPath + '/', true, { date: new Date() });
  // fs.rmdir(rootPath)
  archive.finalize();
  console.log('end')
}