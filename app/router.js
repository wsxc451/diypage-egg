'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.lists)
  router.get('/page/lists', controller.home.lists)
  router.get('/page/insert', controller.home.insert)
  router.get('/page/update/:id', controller.home.update)
  router.get('/page/delete/:id', controller.home.delete)
  router.get('/page/remove/:id', controller.home.remove)
  router.get('/page/get/:id', controller.home.get)
  router.post('/page/upload', controller.upload.upload)
  router.get('/page/csrf', controller.upload.getCsrf)
  router.get('/img/lists', controller.img.lists)
}
