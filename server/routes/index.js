/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// --- 万象优图 --- //
// POST 用来处理微信转发过来的客服消息
router.post('/ci', controllers.ci)

module.exports = router
