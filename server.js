var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile('index.html', {"root": __dirname})
})

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
  console.log('Example app listening on port 3000!')
})