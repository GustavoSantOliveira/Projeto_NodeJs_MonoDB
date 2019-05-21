var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/projetoIteris")
            .then(conn => global.conn = conn)
            .catch(err => console.log(err))

/* ---- perfil analista ---- */
function findAll(callback){  
    global.conn.collection("notas").find({}).toArray(callback);
}

function findOne(numero, callback){ 
    global.conn.collection("notas").find(({"numero":numero})).toArray(callback);
}

function insert(notas, callback){
    global.conn.collection("notas").insert(notas, callback);
}

function insertPag(antecNotas, callback){
    global.conn.collection("antecNotas").insert(antecNotas, callback);
}


/* ---- perfil gestor ---- */
function findAllG(callback){  
    global.conn.collection("antecNotas").find({}).toArray(callback);
}

var {ObjectId} = require('mongodb')
var safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;

function findOneG(id, callback){
    global.conn.collection("antecNotas").find({"_id":ObjectId(id)}).toArray(callback);
}

function findOneGA(numero, callback){
    global.conn.collection("antecNotas").find({"numero":numero}).toArray(callback);
}

function updateG(numero, antecNotas, callback){
    var myquery = {"numero": numero}
    var newval = {$set:{"novaDt":antecNotas.novaDt,"situacao": antecNotas.situacao}}
    global.conn.collection("antecNotas").updateOne(myquery, newval, callback);
}

module.exports = { findAll, findOne, insert, insertPag, findAllG, findOneG, updateG, findOneGA }
