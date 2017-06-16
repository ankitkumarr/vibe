var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'vibe',
  password : 'viber12',
  database : 'vibe_info'
});

connection.connect();




var emptyMySql = function () {
    connection.query('DROP TABLE user_information', function (err, res) {
            if (err) throw err;
            console.log('Dropped');
        });
    connection.query('Create table user_information (latitude FLOAT, longitude FLOAT, rangevalue INT, feeling VARCHAR(20), timestamp TIMESTAMP DEFAULT NOW())', function (err, res) {
            if (err) throw err;
            console.log('New table created');
        });
}

emptyMySql();