'use strict'

const Controller = require('egg').Controller
const moment = require('moment')
class UploadController extends Controller {
  async upload() {
    const { ctx } = this
    const ret = await ctx.service.upload.index()
    if (ret.code === 200) {
      // save to db
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
      const ret3 = await ctx.service.img.insert({ url: ret.info.fileName, type: ret.info.type, createtime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') })
      if (ret3.code === 200) {
        ctx.body = ret
      } else {
        ctx.body = {
          code: 400,
          errMsg: '图片插入数据库失败',
        }
      }
    } else {
      ctx.body = {
        code: 400,
        errMsg: '图片上传失败',
      }
    }
  }

  async getCsrf() {
    const { ctx } = this
    ctx.body = ctx.csrf
  }
}

module.exports = UploadController
