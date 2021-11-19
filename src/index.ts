import Koa from 'koa' // koa框架
import Router from 'koa-router' // koa-router：处理路由

const app = new Koa() // 新建一个koa应用
const router = new Router() // 新建一个路由

router.get('/a', async (ctx) => {
  // 定义路由以及对应处理
  ctx.body = 'a 服务启动成功Hello World!'
}).get('/b', async (ctx) => {
  ctx.body = 'b 服务启动成功Hello World!'
}).get('/c', async (ctx, next) => {
  ctx.body = 'c 服务启动成功Hello World!'
  console.log('c 第一中间件')
  const tempPormise = new Promise((resolve, reject) => {
    setTimeout(() => {
      ctx.body += '  第一中间件settime'
      console.log('第一中间件settime')
      resolve(true)
    }, 1000)
  })
  await tempPormise.then(() => {
    next()
  })
}, async (ctx, next) => {
  ctx.body += '  第二中间件'
  console.log('c 第二中间件')
  await next()
}).all(/.*/, async (ctx, next) => {
  ctx.set('a', 'a')
  console.log('全局设置!')
  await next()
})

app.use(router.routes()) // 加载路由

app.listen(8080) // 此应用会监听3000端口

console.log('服务启动成功 端口 8080')
