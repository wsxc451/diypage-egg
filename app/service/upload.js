'use strict'
const Service = require('egg').Service
const fs = require('fs')
const path = require('path')
// const sendToWormhole = require('stream-wormhole')

class UploadService extends Service {
  //产生随机图片名称
  createPicName() {
    const now = new Date()
    const year = now.getFullYear() //得到年份
    let month = now.getMonth() //得到月份
    let date = now.getDate() //得到日期
    const hour = now.getHours() //得到小时
    const minu = now.getMinutes() //得到分钟
    month = month + 1
    if (month < 10) month = '0' + month
    if (date < 10) date = '0' + date
    const number = now.getSeconds() % 43 //这将产生一个基于目前时间的0到42的整数。
    const time = year + '' + month + '' + date + '' + hour + '' + minu
    return time + '_' + number
  }

  isFileExisted(path_way) {
    return new Promise((resolve, reject) => {
      fs.access(path_way, (err) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(false) //"不存在"
        } else {
          resolve(true) //"存在"
        }
      })
    })
  }
  async index(type = 'common') {
    const ctx = this.ctx
    const stream = await ctx.getFileStream()
    const fileName = stream.filename
    const pathName = path.join(this.config.baseDir, `uploads/${type}`)
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName)
    }
    const appfix = fileName.substr(fileName.lastIndexOf('.'), fileName.length)
    const fileNameNew = this.createPicName() + appfix
    const target = path.join(pathName, `${fileNameNew}`)
    const result = await new Promise((resolve, reject) => {
      const remoteFileStream = fs.createWriteStream(target)
      stream.pipe(remoteFileStream)
      let errFlag
      remoteFileStream.on('error', (err) => {
        errFlag = true
        // sendToWormhole(stream)
        remoteFileStream.destroy()
        reject(err)
      })

      remoteFileStream.on('finish', async () => {
        if (errFlag) return
        resolve({ fileName, name: stream.fields.name })
      })
    })

    if (result.fileName) {
      return {
        code: 200,
        info: {
          fileName: `uploads/${type}/${fileNameNew}`,
          type,
        },
      }
    }
    return {
      code: 400,
      errMsg: 'upload error',
    }
  }
}
module.exports = UploadService
