const express = require('express');
const fs = require('fs')
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('Server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanence.hbs', {
//       message: `We'll be right back!`,
//     messageDescription: 'This site is being currently updated'
//   })
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('toUpper', (text) => {
  return text.toUpperCase();
})

app.get('/', (request , response) => {
response.render('home.hbs', {
  pageTitle: 'BestShop',
  welcomeMessage: 'welcome to '
});
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errormessage: 'Unable to handle request'
  })
});



app.listen(3000);
