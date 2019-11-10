const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "db.yiays.com",
    port: 33306,
    user: "memero",
    database: 'meme'
});

db.connect((error)=>{
    if(error) throw error;
    console.log("Connected to database.")
});
global.db = db;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => res.send("hello"));
app.get('/meme/latest', (req, res) => {
    var out;
    db.query('SELECT Id,Type,Url,Date FROM meme WHERE NOT Hidden AND NOT Nsfw ORDER BY Date DESC LIMIT 10', (error, results, fields)=>{
        if(error){
            res.json({success:false,msg:"Failed to fetch from database."});
            throw error;
        }
        res.json(results);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
