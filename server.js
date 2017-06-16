var express = require('express');
var app = express();
var mysql = require('mysql');
var qs = require('querystring');
var request = require('request');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'vibe',
  password : 'viber12',
  database : 'vibe_info'
});

connection.connect();

var COLOR_MAP = {
    "Happy" : "yellow",
    "Sad"   : "blue",
    "Terrified" : "orange",
    "Gloomy" : "purple",
    "Excited" : "green",
    "Bored" : "white"
}

app.get('/', function (req, res) {
  res.sendFile('index.html', {"root": __dirname})
})

app.get('/mapPoints', function (req, res) {
    connection.query('SELECT * FROM user_information', function(err, rows) {
        if (err) throw err;
        listToSend = [ ]
        for (var i = 0; i < rows.length; i++) {
            content = {}
            content['color'] = COLOR_MAP[rows[i].feeling];
            content['feeling'] = rows[i].feeling;
            content['opacity'] = (rows[i].rangevalue)/10;
            content['latitude'] = rows[i].latitude;
            content['longitude'] = rows[i].longitude;
            listToSend.push(content);
        };
        res.send(listToSend);
    })
})

app.post('/vibeSubmit', function(req, res) {
    var chunk = '';
    req.on('data', function (data) {
        chunk = chunk + data;
    });
    req.on('end', function () {
        var headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded'
        };
        
        var options = {
            url: 'https://www.google.com/recaptcha/api/siteverify',
            method: 'POST',
            headers: headers,
            form: {'secret': '6LcCrCAUAAAAAMU6ultMPXLnZdsuvId2ANLJzOF3', 
                   'response': qs.parse(chunk).captcha}
        };   
        
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if(!JSON.parse(body).success) {
                    res.send("error");
                }
            }
        });
        
        console.log(qs.parse(chunk).captcha);
        var datadump = {
            'latitude' : qs.parse(chunk).latitude,
            'longitude' : qs.parse(chunk).longitude,
            'rangevalue' : qs.parse(chunk).range,
            'feeling' : qs.parse(chunk).feeling
        }
        connection.query('INSERT into user_information SET ?', datadump, function (err, res) {
            if (err) throw err;
            console.log('Inserted' + datadump);
        });
        console.log('end');
        res.send('ok');
       // res.sendFile('index.html', {"root": __dirname});
    })
})

var mockMySql = function () {
    var i = 0;
    var MOCK_FEELING = ['Happy', 'Sad', 'Gloomy', 'Terrified', 'Excited', 'Bored'];
    for (i = 0; i < 1000; i++) {
         var datadump = {
            'latitude' : Math.random() * 180 - 90,
            'longitude' : Math.random() * 360 - 180,
            'rangevalue' : Math.floor(Math.random()*10),
            'feeling' : MOCK_FEELING[Math.floor(Math.random()*5)]
        }
         connection.query('INSERT into user_information SET ?', datadump, function (err, res) {
            if (err) throw err;
            console.log('Inserted');
        });
    }
}

// mockMySql();
app.get('/index.html', function (req, res) {
  res.sendFile('index.html' , {"root": __dirname})
})

app.get('/semantic/dist/semantic.min.js', function (req, res) {
  res.sendFile('semantic/dist/semantic.min.js' , {"root": __dirname})
})

app.get('/semantic/dist/semantic.min.css', function (req, res) {
  res.sendFile('semantic/dist/semantic.min.css' , {"root": __dirname})
})

app.get('/styles.css', function (req, res) {
  res.sendFile('styles.css' , {"root": __dirname})
})

app.get('/map.html', function (req, res) {
  res.sendFile('map.html' , {"root": __dirname} )
})

app.get('/range.css', function (req, res) {
  res.sendFile('range.css' , {"root": __dirname})
})

app.get('/range.js', function (req, res) {
  res.sendFile('range.js' , {"root": __dirname})
})

app.get('/map.html', function (req, res) {
  res.sendFile('map.html' , {"root": __dirname})
})

app.get('/semantic/dist/themes/default/assets/fonts/icons.woff2', function (req, res) {
  res.sendFile('semantic/dist/themes/default/assets/fonts/icons.woff2' , {"root": __dirname})
})

app.get('/semantic/dist/themes/default/assets/fonts/icons.woff', function (req, res) {
  res.sendFile('semantic/dist/themes/default/assets/fonts/icons.woff' , {"root": __dirname})
})

app.get('/semantic/dist/themes/default/assets/fonts/icons.ttf', function (req, res) {
  res.sendFile('semantic/dist/themes/default/assets/fonts/icons.ttf' , {"root": __dirname})
})

app.listen(3000, function () {
  console.log('Vibe Started')
})
