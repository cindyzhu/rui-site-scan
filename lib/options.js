const path = require('path');
const untils = require('./tools.js')

let options = {
  configPath: '',
  devicesList: untils.getDeviceList('mobile'),
  devices: untils.getDevices()
};
options.definitions = [
  {
    fileds: [
      '-h',
      '--help',
    ],
    description: '       查看帮助信息'
  },
  {
    fileds: [
      '-c',
      '--config',
    ],
    description: '     配置文件路径',
    action: val => {
      options.configPath = typeof val === 'string' ? path.join(process.cwd(), val) : '';
    }
  },
  {
    fileds: [
      '-d',
      '--device',
    ],
    description: '     可输入mobile、table、all 默认为mobile ruiscan -d all',
    // description: '可输入mobile（width < 450 的所有模拟器），table(width >= 450 的所有设备) all(所有模拟器) 默认为mobile, ruiscan -d all',
    action: val => {
      const typeInfo = typeof val === 'string' ? val : '';
      if(typeInfo && typeInfo !== 'mobile') {
        options.devicesList = untils.getDeviceList(val);
      }
    }
  },
  {
    fileds: [
      '-dl',
      '--devicelist',
    ],
    description: '自定义模拟器, 支持自定义：ruiscan -dl "iPhone 4"] ', // + options.devicesList.join(','),
    action: val => {
      let list = [];
      if(typeof val === 'string' && val.length > 0) {
        list = val.split(',')
      }
      options.devicesList = untils.getDeviceList('custom', list);
    }
  }
];

module.exports = options;