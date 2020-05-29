const Router = require('koa-router'),
    uuid = require('uuid'),
    md5 = require('md5');
const conf = require('../conf'),
    Service = require('../service/RemoteDataBoxService');  

const router = new Router();

router.prefix(`${conf.api}/user`);

router.get('/', async (ctx, next) => {
    let user = ctx.request.body;
    let service = new Service();    
    let data = await service.queryUsers({key: 'users'});   
    ctx.body = data.code?data:{code: 0, data: data}
})

router.post('/', async (ctx, next) => {
    let user = ctx.request.body;
    let service = new Service();
    let data = await service.addQueryUser({key: 'users', val: user}, ctx.session.user.username);
    ctx.body = data.code?data:{code: 0, data: data}
})

router.delete('/', async (ctx, next) => {
    let user = ctx.request.body;
    let service = new Service();
    let data = await service.deleteQueryUser({key: 'users', val: user.data},ctx.session.user.username);
    ctx.body = data.code?data:{code: 0, data: data}
})

router.put('/', async (ctx, next) => {
    let user = ctx.request.body;
    let service = new Service();
    let data = await service.upDateQueryUser({key: 'users', val:user},ctx.session.user.username);
    ctx.body = data.code?data:{code: 0, data: data}
})

module.exports = router;