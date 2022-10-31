const mysql = require('mysql');

const dbcon = mysql.createConnection({
    host     : 'database.consulhosting.nl',
    user     : 'u4044_WBiSmT75l5',
    password : '2EcD2Gl350^ryHYT969gB^f1',
    database : 's4044_Main'
});
  
dbcon.connect((err) =>{
    if (err) throw err;
    console.log("Connected!");
});