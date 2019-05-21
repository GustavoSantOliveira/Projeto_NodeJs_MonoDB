var express = require('express');
var router = express.Router();

/* definição de perfil */
router.get('/', function (req, res) {
  res.render('perfil', { title: 'Perfil' });
});

/* ---- perfil analista ---- */
router.get('/index1', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index1', { title: 'Consulta Notas Fiscais', docs: docs });
  })
})

router.get('/index1/resul/:numero', function(req, res) {
  var numero = req.params.numero;
  global.db.findOne(numero, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('resul', { title: 'Consulta Notas Fiscais', doc: docs});
    });
})

router.get('/novo', function(req, res, next) {
  res.render('cadastro', { title: 'Novo Cadastro', docs: { "numero" : "", "descricao" : "", "dtFat" : "", "dtPag" : "", "status" : ""}, action: '/novo' });
});

router.post('/novo', function(req, res) {
  var numero = req.body.numero;
  var descricao = req.body.descricao;
  var dtFat = req.body.dtFat;
  var dtPag = req.body.dtPag;
  var status = req.body.status;
  global.db.insert({numero, descricao, dtFat, dtPag, status}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/index1');
      })
})

router.get('/solicitar/:numero', function(req, res) {
  var numero = req.params.numero;
  global.db.findOne(numero, (e, docs) => {
    if(e) { return console.log(e); }
    res.render('solicitar', { title: 'Solicitação de antecipação', doc: docs[0], action: '/solicitar/' + docs[0].numero });
  });
});

router.post('/solicitar/:numero', function(req, res) {
  var numero = req.body.numero;
  var dtPag = req.body.dtPag;
  var novaDt = req.body.novaDt;
  var situacao = "Aguardando análise"
  global.db.insertPag({numero, dtPag, novaDt, situacao}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/index1');
      })
})


/* ---- perfil gestor ---- */
router.get('/index2', function(req, res) {
  global.db.findAllG((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index2', { title: 'Consulta Antecipações', docs: docs });
  })
})

router.get('/index2/result/:numero', function(req, res) {
  var numero = req.params.numero;
  global.db.findOneGA(numero, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('result', { title: 'Consulta Antecipações', doc: docs});
    });
})

router.get('/aprovacao/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOneG(id, (e, docs) => {
    if(e) { return console.log(e); }
    res.render('aprovacao', { title: 'Aprovação de antecipação', doc: docs[0], action: '/aprovacao/' + docs[0]._id });
  });
});

router.post('/aprovacao/:id', function(req, res) {
  var id = req.params.id;
  var numero = req.body.numero;
  var dtPag = req.body.dtPag;
  var novaDt = req.body.novaDt;
  var situacao = "Aprovado"
  global.db.updateG(numero, {situacao, novaDt}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/index2');
    });
});

router.get('/reprovacao/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOneG(id, (e, docs) => {
    if(e) { return console.log(e); }
    res.render('reprovacao', { title: 'Reprovação de antecipação', doc: docs[0], action: '/reprovacao/' + docs[0]._id });
  });
});

router.post('/reprovacao/:id', function(req, res) {
  var id = req.params.id;
  var numero = req.body.numero;
  var dtPag = req.body.dtPag;
  var novaDt = req.body.novaDt;
  var situacao = "Reprovado"
  
  global.db.updateG(numero, {situacao, novaDt}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/index2');
    });
});

module.exports = router;
