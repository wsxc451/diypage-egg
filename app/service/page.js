'use strict'
const Service = require('egg').Service
class PageService extends Service {
  constructor(ctx) {
    super(ctx)
    this.tableName = 'cb_page'
  }
  async get(uid) {
    const user = await this.app.mysql.get(this.tableName, { id: uid })
    return user || {}
  }
  async lists(pageNow = 0, limit = 10, where = {}) {
    const ret = await this.app.mysql.select(this.tableName, { where, limit, offset: pageNow * limit })
    return ret
  }
  async insert(info) {
    let retInfo = {
      code: 200,
      data: {},
    }
    try {
      const result = await this.app.mysql.insert(this.tableName, info)
      if (result.affectedRows === 1) {
        retInfo = {
          code: 200,
          data: { id: result.insertId, ...info },
        }
      } else {
        retInfo = {
          code: 400,
          errMsg: 'failed insert',
        }
      }
    } catch (error) {
      console.log(error)
      retInfo = {
        code: 400,
        errMsg: 'failed insert',
      }
    }
    return retInfo
  }
  async update(id, info) {
    let retInfo = {
      code: 200,
      data: {},
    }
    try {
      const result = await this.app.mysql.update(_table, info, {
        where: {
          id,
        },
      })
      if (result.affectedRows === 1) {
        retInfo = {
          code: 200,
          data: { ...info },
        }
      } else {
        retInfo = {
          code: 400,
          errMsg: 'failed update',
        }
      }
    } catch (error) {
      retInfo = {
        code: 400,
        errMsg: 'failed update',
      }
    }
    return retInfo
  }
  async remove(id) {
    let retInfo = {
      code: 200,
      data: {},
    }
    try {
      const result = await this.app.mysql.update(
        this.tableName,
        { isdelete: 1 },
        {
          where: {
            id,
          },
        }
      )
      if (result.affectedRows === 1) {
        retInfo = {
          code: 200,
        }
      } else {
        retInfo = {
          code: 400,
          errMsg: 'failed ',
        }
      }
    } catch (error) {
      retInfo = {
        code: 400,
        errMsg: 'failed ',
      }
    }
    return retInfo
  }
  async delete(id) {
    let retInfo = {
      code: 200,
    }
    try {
      const result = await this.app.mysql.delete(this.tableName, { id })
      if (result.affectedRows === 1) {
        retInfo = {
          code: 200,
        }
      } else {
        retInfo = {
          code: 400,
          errMsg: 'failed',
        }
      }
    } catch (error) {
      console.log(error)
      retInfo = {
        code: 400,
        errMsg: 'failed',
      }
    }
    return retInfo
  }
}

module.exports = PageService
