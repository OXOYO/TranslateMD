#! /usr/bin/env node

/**
 * Module dependencies.
 */
const fs = require('fs')
const readline = require('readline')
const path = require('path')
const chalk = require('chalk')
const program = require('commander')

const print = {
  log: function (text) {
    console.log(chalk.black(text))
  },
  info: function (text) {
    console.log(chalk.blue(`INFO: ${text}`))
  },
  warn: function (text) {
    console.log(chalk.yellow(`WARN: ${text}`))
  },
  error: function (text) {
    console.log(chalk.red(`ERROR: ${text}`))
  },
  success: function (text) {
    console.log(chalk.green(`SUCCESS: ${text}`))
  }
}

const serviceList = ['google', 'baidu', 'youdao']

program
    .version('1.0.0')
    .option('-S, --service [service]', 'choose an interface service, the default is google', 'google')
    .option('-T, --text <text>', 'target text')
    .option('-F, --file <file>', 'target file')
    .option('-f, --from [from]', 'translated from language', 'auto')
    .option('-t, --to <to>', 'translated to language')
    .parse(process.argv)

// 帮助信息
if (!process.argv[2]) {
  program.help()
}

// console.log('program', program)
console.log('program.service', program.service)
console.log('program.text', program.text)
console.log('program.file', program.file)
console.log('program.from', program.from)
console.log('program.to', program.to)
// console.log('process.argv', process.argv)

if (!serviceList.includes(program.service)) {
  print.warn('service must one of [google | baidu | youdao]')
  process.exit(1)
}

if (!program.to) {
  print.warn('no translated to language')
  process.exit(1)
}

const { youdao, baidu, google } = require('translation.js')

const translate = (() => {
  let ret
  switch (program.service) {
    case 'youdao':
      ret = youdao.translate
      break
    case 'baidu':
      ret = baidu.translate
      break
    case 'google':
      ret = google.translate
      break
  }
  return ret
})()

const doTransText = function (text, to = 'en', from = 'auto') {
  return translate(text, {
    from,
    to
  })
}

const transText = function (text, to, from) {
  doTransText(text, to, from).then((res) => {
    console.log('res', text, '=>', res.result[0])
  }).catch(error => console.log('caught', error))
}

const transFile = function (filePath, to, from) {
  filePath = path.resolve(process.cwd(), filePath)
  let fileStream
  try {
    fs.statSync(filePath)
    fileStream = fs.createReadStream(filePath)
  } catch (e) {
    fileStream = null
    print.error('Failed to read file: ' + filePath)
    return
  }
  try {
    let lineList = []
    let rl = readline.createInterface({
      input: fileStream
    })
    rl.on('line', (line) => {
      lineList.push(line)
      print.log('line ' + lineList.length + ': ' + line)
    })
    rl.on('close', function () {
      // TODO something
    })
  } catch (e) {
    fileStream = null
    lineList = null
    print.error('Translation failed')
  }
}

if (program.text) {
  transText(program.text, program.to, program.from)
} else if (program.file) {
  transFile(program.file, program.to, program.from)
}