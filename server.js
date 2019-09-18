const app = require('express')();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const port = process.env.port || 8080;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'letmein12@',
    database: 'node_analytics'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to database');
});
global.db = db;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();  
});

app.get('/script.js', (req,res) => {
    //console.log(process.env);
    fs.readFile('script.js', (err,data) => {
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
    });
});

app.post('/script.js', (req,res) => {
    if(req.body.current_page == '/index.html'){
        let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        let sql = 'INSERT INTO user_info SET ip="'+ip+'", timestamp=NOW()';
        let checkSql = 'SELECT ip FROM user_info WHERE ip="'+ip+'"';
        db.query(checkSql, (err,data) => {
            if(err) throw err;
            if(data.length == 0){
                db.query(sql, (err,result) => {
                    if(err) throw err;
                    console.log(result);
                });
            }
        });
    }
});

app.post('/', (req,res) => {
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    let sql = 'SELECT ip FROM user_info WHERE ip="'+ip+'"';
    db.query(sql, (err,data) => {
        if(err) throw err;
        if(data.length > 0){
            res.send('green');
        }else{
            res.send('red');
        }
    });
});

app.listen(port, () => {
    console.log('Server running at '+port);
});