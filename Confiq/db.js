const Sequelize = require('sequelize');

const db = new Sequelize('mysql://root:vLPIIMkTxjxtdDteghqxzsScIKTyVPMz@tokaido.proxy.rlwy.net:49869/railway', {
 
  dialect: 'mysql',
  logging: false,
});

 

module.exports = db;