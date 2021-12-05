const express = require("express");
const router = express.Router();
const Agenda = require("../models/agenda");

router.post(
  "",
  (req, res, next) => {
    const agenda = new Agenda({
      especialidade: req.body.especialidade,
      medico: req.body.medico,
      data: req.body.data,
      hora:req.body.hora,
    }); console.log("post " + req.body.especialidade)
    agenda.save().then((agendaInserido) => {
      res.status(201).json({
        mensagem: "Cliente inserido",
       
        agenda: {
          id: agendaInserido._id,
          especialidade: agendaInserido.especialidade,
          medico:agendaInserido.medico,
         data: agendaInserido.data,
         hora: agendaInserido.hora,
        },
      });
      
    });
  }
);

router.put(
  "/:id",
  (req, res, next) => {
  console.log (req.file);
if (req.file) { //mas se for um arquivo, montamos uma nova
const url = req.protocol + "://" + req.get("host");
}
    const agenda = new Agenda({
      _id: req.params.id,
      especialidade: req.body.especialidade,
      medico: req.body.medico,
     data: req.body.data,
     hora:req.body.hora,
    });
    Agenda.updateOne({ _id: req.params.id }, agenda).then((resultado) => {
      //console.log(resultado)
      res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
    });
  }
);
   
router.get('', (req, res, next) => {
  //console.log (req.query);
  try{
  const pageSize = +req.query.pagesize;
  const page = +req.query.page;
  const consulta = Agenda.find();//só executa quando chamamos then
  if (pageSize && page){
  consulta
  .skip(pageSize * (page - 1))
  .limit(pageSize);
  }
  consulta.then(documents => {
  //console.log(documents)
  res.status(200).json({
  mensagem: "Tudo OK",
  agendas: documents
  });
  })
}catch(err){
    next(err);
  }});

router.delete("/:id", (req, res, next) => {
  console.log("id: ", req.params.id);
  Agenda.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Cliente removido" });
  });
});

router.get("/:id", (req, res, next) => {
 try{ Agenda.findById(req.params.id).then((age) => {
    if (age) {
      res.status(200).json(age);
    } else res.status(404).json({ mensagem: "Cliente não encontrado!" });
  })}catch(err){
    next(err);
}});
module.exports = router;
