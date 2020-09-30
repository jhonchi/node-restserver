

//==============
// puerto
//=============

process.env.PORT = process.env.PORT || 3000;

//==============
// entorno
//=============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==============
// base datos
//=============

let urlDB

if (process.env.NODE_EN === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{

    urlDB = 'mongodb+srv://jhonchi:5T2RLfgvwGmsCsGb@cluster0.q8ppm.mongodb.net/cafe'
}

process.env.URLDB = urlDB

