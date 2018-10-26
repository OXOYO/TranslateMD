/**
 * Created by OXOYO on 2018/9/30.
 */

const translate = require('translate-api')

const doTrans = function (text, to = 'en', from = 'auto') {
  // console.log('this..', this)
  return translate.getText(text, {
    from,
    to
  })
}

let fromText = '我爱你中国'
doTrans(fromText).then((text) => {
  console.log('res', fromText, '=>', text)
}).catch(error => console.log('caught', error))