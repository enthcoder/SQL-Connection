const sql = require('mssql');

const sqlConfig = {
  user: 'nagios',
  password: '12121212qw.',
  server: '192.168.0.197',
  options: {
    database: 'Timbrador_SeguriDataComercial',
    encrypt: false
  }
};

exports.getPending = (req, res) => {
  new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request().query('select count(*) as \'pending\' from tb_cfdi where sent = \'0\'')
  }).then(result => {
    let rows = result.recordset
    res.status(200).json({
      title: 'pendientes',
      quantity: rows[0].pending
    })
    sql.close();
  }).catch(err => {
    res.status(500).send({message: '${err}'})
    sql.close();
  });
};

exports.getProcessed = (req, res) => {
  new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request().query('select count(*) as \'processed\' from tb_cfdi')
  }).then(result => {
    let rows = result.recordset
    res.status(200).json({
      title: 'processed',
      quantity: rows[0].processed
    })
    sql.close();
  }).catch(err => {
    res.status(500).send({message: '${err}'})
    sql.close();
  });
};

exports.getErrors = (req, res) => {
  new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request().query('select count(*) as \'errors\' from tb_cfdi_error')
  }).then(result => {
    let rows = result.recordset
    res.status(200).json({
      title: 'pendientes',
      quantity: rows[0].errors
    })
    sql.close();
  }).catch(err => {
    res.status(500).send({message: '${err}'})
    sql.close();
  });
};
