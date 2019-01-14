/*eslint-disable */
const pool = require('../db/index').pool;

exports.getUser = (req, res) => {
  console.log(req.params.id, 'req');

  pool.query('SELECT * FROM user', (err, res) => {
    if (err) {
      throw err;
    }
    console.log('user:', res.rows[0]);
  });
};

exports.addUser = async (req, res) => {

};

// exports.updateUser = async (req, res) => {

// };

// exports.deleteUser = async (req, res) => {

// };
