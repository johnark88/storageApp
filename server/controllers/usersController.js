const pool = require('../db/index');

exports.getUser = async (req, res) => {
  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  pool.connect().then((client) => {
    return client.query('SELECT user from user WHERE id = $1', [1])
      .then((response) => {
        client.release();
        console.log(response), 'db res';
      });
  });
};

// exports.addUser = async (req, res) => {

// };

// exports.updateUser = async (req, res) => {

// };

// exports.deleteUser = async (req, res) => {

// };
