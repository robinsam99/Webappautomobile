var express = require('express');
var app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//html file on server
app.use(express.static('./')); 

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Marymathai22',
        database: 'automobile'
    })
}


//posting data to database
app.post('/user_create',(req,res)=>{
    console.log('Trying to create a new record');
    console.log(req.body, 'body');
    const make = req.body.make;
    const model = req.body.model;
    const regnumber = req.body.regnumber;
    const mileage = req.body.mileage;
    const wheeltype = req.body.wheeltype;
    const typeTransm = typefetch(req.body.type);

    function typefetch(transmission){
        if(transmission==='MANUAL')
            return false;
        else
            return true;
    }
    //connecting database
    const connection = getConnection()
    
    connection.connect((err) => {
        if(!err)
            console.log('Database connected');
        else    
            console.log('failed: ' + err);
    
    });
    console.log(wheeltype);
    function getquery(wheeltype){
        if(wheeltype === 'Four wheeler')
            return 'INSERT INTO 4wheelers VALUES(?,?,?,?,?)';
        else    
            return 'INSERT INTO 2wheelers VALUES(?,?,?,?,?)'
    }
    try {
        getConnection().query(getquery(wheeltype),[make,model,typeTransm,mileage,regnumber],(err,results,fields)=>{
            if(err){
                console.log('Failed to insert new record: ' + err);
                res.send(500);
            }

            res.json({ status: 'success!', data: results });
            
        });
    } catch (e) {
        console.log(e);
        res.end();
    }


});
     
app.get('/',function(request, response){
    response.send('Hello world');
});

app.post('/info',function(request, response){
    console.log('Post request recieved at /info');
});
app.listen(3000,function(){
    console.log("server is running on  port 3000");
});


