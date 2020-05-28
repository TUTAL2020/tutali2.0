
var Tendero = require('../model/Tendero');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb+srv://tutali:123@cluster0-wkwzl.mongodb.net/test?retryWrites=true&w=majority';
var baseDatos = "tutali";
var producto;
module.exports = class crudDB{

  agregar(cliente,usuario){
    MongoClient.connect(url, function(err, db) {
      var baseDatosRegistro = db.db(baseDatos);
      baseDatosRegistro.collection(usuario).insertOne(cliente, function(err, res) {
        if (err) throw err;
        console.log("Dato insertado");
        db.close();
        });
      });
    }

    consultarProducto(){
      MongoClient.connect(url, function(err, db) {
        var baseDatosRegistro = db.db(baseDatos);
        var o_id = new ObjectId(producto);
        var consulta = {_id:o_id}
        baseDatosRegistro.collection("productos").find(consulta).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          console.log("JAIRO");
          db.close();
          });
        });

    }
    consultar(usuario){
      MongoClient.connect(url, function(err, db) {
        var baseDatosRegistro = db.db(baseDatos);
        baseDatosRegistro.collection("tenderos").find(usuario).toArray(function(err, result) {
          if (err) throw err;
          var tendero = new Tendero(result);
          console.log(result);
          producto= result[0].productos[0];
          console.log(producto);
          db.close();
          });
        });

    }




}
