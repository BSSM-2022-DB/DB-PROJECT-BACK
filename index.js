// setting
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'sion',
    password: '1713',
    database: '2022_DB_PROJECT'
})

app.use(cors())

app.listen(8080,function(){
  console.log('listening on 8080');
});

con.connect(function (err) {
    if ( err ) throw err;
    console.log('Good Connected');
    const sql = "select "+
    "ci.tier,acl.cham_name,acl.cham_id,acl.cham_key,ci.win_rate,ci.ban_rate,ci.pick_rate,ll.line_name "+
    "from champion_info ci ,all_champion_list acl , line_list ll "+
    "where ci.cham_key = acl.cham_key and ll.line_id = ci.line_id "+
    "group by acl.cham_key "+
    "order by ll.line_id , ci.tier";
    con.query(sql, function ( err ,result ,fields) {
        if ( err ) {
            throw err;
        }
        let chamList ='';
        global.chamList=result;
//        console.log(result);
    });
});

app.get('/cham_list',function(req,res) {
//  res.send('This is champion list page');
  res.send(chamList);
});

app.get('/',function(req,res) {
  res.sendFile(__dirname+'/index.html');
})