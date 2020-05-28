const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var Cliente = require('../model/Cliente');
var Tendero = require('../model/Tendero');
var baseDatosC = require('../libs/d-connection')
var baseDatos = new baseDatosC();
var productos;
var productoE;
var idp;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://tutali:123@cluster0-wkwzl.mongodb.net/test?retryWrites=true&w=majority';


function agregarP(nombrep,preciop, cantidadp, descripcionp,imagen){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var myobj = {
      nombreP:nombrep,
      precioP: preciop,
      cantidadP: cantidadp,
      descripcionP: descripcionp,
      imagen:imagen

    };
    dbo.collection("productos").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function consultar(usuarioc, contrasenac, res){
  var usuario;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var query = { usuarioC:usuarioc,contrasenaC:contrasenac};
    dbo.collection("usuario").find(query).toArray(function(err, result) {
      if (err) throw err;
      if(result.length==1){
        res.render('cliente',{
          titulo:usuarioc

        })
      }else{
        res.render('index',{
          imagenpublcidad:[''],
          usuarioI:"USUARO INCORRECTO"
        })
      }
      usuario = result;
      console.log(result.length);
      db.close();
    });
  });
  return usuario;
}
function consultarP(){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    dbo.collection("productos").find().toArray(function(err, result) {
      if (err) throw err;
      productos = result;
      console.log(result);
      db.close();
    });
  });
}

function eliminar(id){
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutali");
  var o_id = new ObjectId(id);
  var consulta = {_id:o_id}
  dbo.collection("productos").deleteOne(consulta, function(err, obj) {
    if (err) throw err;
    console.log(id)
    db.close();
  });
});
}

function consultarPE(id){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("tutali");
    var o_id = new ObjectId(id);
    var consulta = {_id:o_id}
    dbo.collection("productos").find(consulta).toArray(function(err, result) {
      if (err) throw err;
      productoE = result;
      console.log(result);
      db.close();
    });
  });
}

function actualizarP(_id,nombreP,precioP,cantidadP,descripcionP){
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutali");
  var o_id = new ObjectId(_id);
  var consulta = {_id:o_id}
  var actualizar = { $set: {nombreP:nombreP, precioP:precioP, cantidadP:cantidadP,descripcionP:descripcionP } };
  dbo.collection("productos").updateOne(consulta, actualizar, function(err, res) {
    if (err) throw err;
    console.log(o_id,nombreP,precioP,cantidadP,descripcionP);
    console.log("Documento actualizado");
    db.close();
  });
});
}

//Panel de inicio
router.get('/', (req, res) =>{
    res.render('index',{
      imagenpublcidad:[],
      usuarioI:""
    });

 });
 router.get('/tenderol', (req, res) =>{
   consultarP();

     res.render('Tendero',{
       productos:productos
     });

  });

  router.get('/cliente', (req, res) =>{
    consultarP();
      res.render('Cliente',{
        productos:productos
      });

   });
   /*
router.get('/hola', (req, res) =>{
     consultarP();
       res.render('hola',{
         productos:productos
       });

    });
*/


//panel del formulario para registrar el cliente
router.get('/registroCliente', (req, res) =>{
  res.render('registroCliente',{
    imagenpublcidad:"",
    usuarioI:""
  });
});

//Panel del fomrulario para registrar el tendero
router.get('/registroTendero', (req, res) =>{
  res.render('registroTendero',{
    imagenpublcidad:"",
    usuarioI:""
  });
});

//Panel del tendero
/*
router.get('/tendero', (req, res) =>{
  let body = req.body;
  console.log();
  consultarP();
  console.log(productos);
  res.render('tendero',{
    productos:productos
  });
});
*/

//Post para iniciar sección
router.post('/add', function (req, res) {
  let body = req.body;
  //agregar(body.usuario, body.contrasena);
  //baseDatos.consultar(body);
  //baseDatos.consultarProducto();
  res.redirect('/tenderol');
});

//Post para registrar el cliente
router.post('/registrarC', function (req, res) {
  let body = req.body
  var cliente = new Cliente(body);
  console.log(cliente);
  baseDatos.agregar(cliente,"clientes");
  res.render('index',{
    imagenpublcidad:['https://cdn.dribbble.com/users/788099/screenshots/11118237/media/83403954402d4839cf3670aadee46367.png'],
    usuarioI:""
  })

});

//Post para registrar el tendero
router.post('/registrarT', function (req, res) {
  let body = req.body;
  var tendero = new Tendero(body);
  console.log(tendero);
  baseDatos.agregar(tendero,"tenderos");
  res.render('index',{
    imagenpublcidad:[],
    usuarioI:""
  })
});

//Post para agregar producto
router.post('/agregarProducto', function (req, res) {
  let body = req.body;
  console.log(body.myfile);
  agregarP(
    body.nombreP,
    body.precioP,
    body.cantidadP,
    body.descripcionP,
    body.myfile);
  res.redirect('/tenderol')
});

router.post('/actualizarProducto', function (req, res) {
  let body = req.body;
  console.log(idp,"Jairo","___________________________");
  actualizarP(
    idp,
    body.nombreP,
    body.precioP,
    body.cantidadP,
    body.descripcionP);
  res.redirect('/tenderol')
});


//Get para elimiar productos
router.get('/delete/:id',(req, res)=>{
  let nombreP = req.params.id;
  console.log(nombreP);
  eliminar(nombreP);
  res.redirect('/tenderol')
});

router.get('/editar/:id',(req, res)=>{
  let id = req.params.id;
  idp = id;
  consultarPE(id);
  console.log(idp);
  res.render('editarProducto',{
    productoE:productoE,
    idp:idp
  })
});





module.exports = router;
