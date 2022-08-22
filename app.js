const Koa = require('koa');
const koaBody = require('koa-body');
const debug = require('debug')('demo:server');
const app = new Koa();
const http = require('http');
const router = require('koa-router')();

require('./src/models/user');
require('./src/models/goods');
require('./src/models/cart');

const port = normalizePort(process.env.PORT || '3008');

const server = http.createServer(app.callback());

app.use(
  koaBody({
    multipart: true, // 开启文件上传
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      keepExtensions: true, // 保留文件拓展名
    },
  })
);


app.use(async (ctx, next) => {
  ctx.body = {
    msg: '请求成功',
    code: 200,
    data: {
      name: 'wsf888',
      age: 18,
      sex: '男',
    },
  };
  next();
});

router.get('/', async (ctx) => {
  console.log('get--info');
  console.log('ctx', ctx);
  ctx.body = {
    msg: '请求成功',
    code: 200,
    data: {
      name: '首页!!',
      
    },
  };
});

router.get('/info', async (ctx) => {
  console.log('get--info');
  console.log('ctx', ctx);
  ctx.body = {
    msg: '请求成功',
    code: 200,
    data: {
      name: 'wayne 哈哈哈',
      age: 18,
      sex: '男',
    },
  };
});

router.all('*', async ctx => {
  throw new Error('没有该路由');
});


app.use(router.routes());
server.listen(port, () => {
  console.log(`port ${port} start successfully`);
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
