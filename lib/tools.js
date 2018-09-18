const puppeteer = require('puppeteer');
const chalk = require('chalk');
const devices = require('puppeteer/DeviceDescriptors');

module.exports = {
  getDeviceList: (deviceType, customDeviceList) => {
    const deviceList = [];
    if(['mobile', 'table', 'all', 'custom'].indexOf(deviceType) < 0){
      console.log(chalk`{red 输入的参数有误}`);
      return;
    }
    if(deviceType === 'custom' &&  customDeviceList.length < 1) {
      console.log(chalk`{red 输入的设备信息有误}`);
      return;
    }
    //设备列表处理
    for(let k in devices) {
      if(k.length >  2) {
        switch(deviceType) {
          case 'mobile':
            if(!devices[k].viewport.isLandscape && devices[k].viewport.width < 450) {
              deviceList.push(k);
            }
          break;
          case 'table':
            if(!devices[k].viewport.isLandscape && devices[k].viewport.width >= 450) {
              deviceList.push(k);
            }
          break;
          case 'all':
            deviceList.push(k);
          break;
          case 'custom':
            if(customDeviceList.indexOf(k) > -1) {
              deviceList.push(k);
            }
          break;
        }
      }
    }
    return deviceList;
  },
  getDevices: () => {
    return devices;
  }
};