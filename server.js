const express= require('express');
const hbs=require('hbs');
const fs=require('fs');
const port= process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
var now= new Date().toString();
var log=`${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log+ '\n', error=>{
  if(error){
    console.log('Unable to append to server.log.');
  }
});
next();
});

// Ver important! maintenance window
// app.use((req, res, next)=>{
//   res.render('mainteinance.hbs');
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
//return 'test';
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
//return 'test';
});

// app.get('/', (req, res)=>{
//
// //  res.send('<h1>Hello Express!</h1>');
// res.send({
//   name:'Zack',
//   likes:[
//     'Biking',
//     'Cities'
//   ]
// });
//
// });
app.get('/about', (req, res)=>{
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle:'About Page oh no!'

  });
});


app.get('/notfound', (req, res)=>{
  //res.send('About Page');
  res.render('notfound.hbs',{
    pageTitle:'No Page oh no!'

  });
});


app.get('/', (req, res)=>{
  //res.send('About Page');
  res.render('home.hbs',{
    pageTitle:'Home Page oh no!',
     welcomeMessage: 'Welcome to my home website'

  });
});

app.get('/bad', (req, res)=>{

//  res.send('<h1>Hello Express!</h1>');
res.send({
  errorMessage:'Unable tp fulfill the request!'

});

});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
