const chalk = require('chalk');
function helpMessage(name, version, bin, options) {
  let binList = [];
  //get all bin;
  for(k in bin) {
    if(bin[k]) {
      binList.push(k)
    }
  }
  let packageName = chalk`{cyan ${name}} {gray ${version}}`;
  
  // header function 
  let header = header => chalk`{white.bold ${header.toUpperCase()}}`;

  let binInfo = '';
  binList.forEach(binItem => {
    binInfo += '   ' + chalk`{italic ${binItem}}` + chalk` {yellow [options]}` + '\n' + '    ' 
  })

  let optionInfo = '';
  options.forEach(option => {
    let optionRow = [];
    optionRow.push(chalk`{green ${option.fileds.join(', ')}}`);
    optionRow.push('    ' + `${option.description}`);
    optionInfo += '    ' + optionRow.join('') + '\n'  + '  ' ;
  })

    console.log(`
${packageName} 
  ${header('usage')}
  ${binInfo}
  ${header('options')}
  ${optionInfo}`);
}
module.exports = helpMessage;