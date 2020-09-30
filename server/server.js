
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('./config/config')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuarios'));



 mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
    useCreateIndex: true
}, (err, res)=>{
    if (err) throw err
    console.log('base datos online');

});

//  mongoose.connect('mongodb://localhost:27017/cafe',(err, res)=>{
//     if(err) throw err
//
//     console.log('base datos online');
//
// });



app.listen(process.env.PORT, ()=>{
    console.log('escuchando puerto ', process.env.PORT)
})