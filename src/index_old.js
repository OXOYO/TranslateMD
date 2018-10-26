/**
 * Created by OXOYO on 2018/9/30.
 */

const translate = require('translate')
const keys = {
  google: '',
  yandex: ''
}

const doTrans = async (text, to = 'en', from = 'zh', engine = 'google') => {
  if (!text) {
    return ''
  }
  return await translate(
      text,
      {
        from,
        to,
        engine,
        key: keys[engine]
      }
  )
}

let fromText = '我爱你中国'
let resText = doTrans(fromText)
console.log('res', fromText, '=>', resText)