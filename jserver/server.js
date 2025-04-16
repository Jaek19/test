const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.db_DATABASE,
});


db.connect((err) => {
    if (err) {
        console.log('db connect error:', err);
    } else {
        console.log('db connect success');
    }
});

app.get('/guest', (req, res) => {
    db.query('SELECT * FROM guest ORDER BY created_at DESC', (err, result) => {
        res.json(result);
    })
    console.log('get');
});

app.post('/guest', (req, res) => {
    const {name, message} = req.body;
    db.query('INSERT INTO guest (name, message) VALUES (?, ?)', [name, message], (err, result) => {
        if(err) {
            console.log('message post failed:', err);
        } else {
            console.log('message post successed:', result);
        }
    }) 
    console.log('post');
});


app.listen(8080, () => {
    console.log('port 8080');
});