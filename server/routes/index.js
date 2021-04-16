/**
 * ajax 服务路由集合
 */
const Router = require('koa-router');
const controllers = require('../controllers');
const router = new Router();

// 路由列表
router.post('/api/sys/login', controllers.login.login);
router.get('/api/sys/getMenuList', controllers.api.getMenuList);
router.get('/api/sys/getDictList', controllers.api.getDictList);
router.post('/api/sys/upload', controllers.api.upload);

router.post('/api/user/getCustomerList', controllers.admin.getCustomerList);
router.post('/api/user/updateCustomerInfo', controllers.admin.updateCustomerInfo);
router.get('/api/user/delCustomerRecord', controllers.admin.delCustomerRecord);
router.post('/api/goods/getGoodsList', controllers.admin.getGoodsList);
router.post('/api/goods/addGoddsRecord', controllers.admin.addGoddsRecord);
router.post('/api/goods/updateGoodsInfo', controllers.admin.updateGoodsInfo);
router.get('/api/goods/delGoodsRecord', controllers.admin.delGoodsRecord);
router.post('/api/order/getOrderList', controllers.admin.getOrderList);
router.get('/api/order/delOrderRecord', controllers.admin.delOrderRecord);
router.get('/api/order/updateOrderType', controllers.admin.updateOrderType);
router.get('/api/order/getOrderById', controllers.admin.getOrderById);

module.exports = router;
