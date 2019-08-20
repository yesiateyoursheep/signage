var express = require('express')
var react = require('react')

var app = express()

app.get('/',function(req,res){
    res.send('hello world')
});

app.listen(3000,'0.0.0.0',()=>console.log('listening on port 3000...'))