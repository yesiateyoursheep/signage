var express = require('express')
var react = require('react')

var app = express()

/*app.get('/hello',function(req,res){
    res.send('hello world')
})*/
app.use(express.static('html'))

app.listen(3000,'0.0.0.0',()=>console.log('listening on port 3000...'))