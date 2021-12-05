//importando o pacote
const mongoose = require ('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const agendaSchema = mongoose.Schema ({
especialidade:{type:String,require:true},
medico:{type:String,require:true},
data:{type:String},
hora: {type: String},


});
//criamos o modelo associado ao nome Cliente e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Agenda', agendaSchema);
