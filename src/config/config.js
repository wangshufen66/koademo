const databaseConfig = {
  host: "8.214.93.244",
  port:3306,
  user: "root",
  password: "Wsf@123456",
  dbName: "sequelize",
  rebuild: false, // 是否每次重启服务器时重建数据库
  logging: false // 是否再控制台输出建表语句
}

module.exports = {
  databaseConfig
}
