var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'vibe',
  password : 'viber12',
  database : 'vibe_info'
});

connection.connect();



var mockMySql = function () {
    var i = 0;
    var MOCK_FEELING = ['Happy', 'Sad', 'Gloomy', 'Terrified', 'Excited', 'Bored'];
    for (i = 0; i < 10000; i++) {
         var datadump = {
            'latitude' : Math.random() * 10,
            'longitude' : Math.random() * 10 + 25,
            'rangevalue' : Math.floor(Math.random()*10),
            'feeling' : MOCK_FEELING[Math.floor(Math.random()*2)]
        }
         connection.query('INSERT into user_information SET ?', datadump, function (err, res) {
            if (err) throw err;
            console.log('Inserted');
        });
    }
}

mockMySql();