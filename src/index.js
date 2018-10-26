/**
 * Created by OXOYO on 2018/9/30.
 */

const { youdao, baidu, google } = require('translation.js')

const type = 'google'

const translate = ((type) => {
  let ret
  switch (type) {
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
})(type)

const doTrans = function (text, to = 'en', from = 'auto') {
  // console.log('this..', this)
  return translate(text, {
    from,
    to
  })
}

let fromText = '我爱你中国'
doTrans(fromText).then((text) => {
  console.log('res', fromText, '=>', text)
}).catch(error => console.log('caught', error))