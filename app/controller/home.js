'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async lists() {
    const { ctx } = this
    const ret = await ctx.service.page.lists(0, 10, { isdelete: [null, 0] })
    ctx.body = ret
  }

  async get() {
    const { ctx } = this
    const { id } = ctx.params
    const ret = await ctx.service.page.get(id)
    ctx.body = ret
  }
  async insert() {
    const { ctx } = this
    const info = { name: '1112' }
    ctx.body = await ctx.service.page.insert(info)
  }

  async update() {
    const { ctx } = this
    const info = { name: 'aaaa' }
    console.log(ctx.params)
    const { id } = ctx.params
    ctx.body = await ctx.service.page.update(id, info)
  }
  async remove() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = await ctx.service.page.remove(id)
  }
  async delete() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = await ctx.service.page.delete(id)
  }
}

module.exports = HomeController
