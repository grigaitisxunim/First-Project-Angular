import { Component } from '@angular/core';
import { Agenda } from './agenda/agenda.model';
import { Cadastro } from './cadastro/cliente.component';
import { Cliente } from './clientes/cliente.model';
import { Paciente } from './clientes/paciente.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clientes: Cliente[] = [];
  pacientes:Paciente[]=[];
  agendas: Agenda []=[];
 

  onClienteAdicionado(cliente: Cliente) {
  this.clientes.push(cliente);
  }

  onPacienteAdicionado(paciente: Paciente) {
    this.pacientes.push(paciente);
    }

   onAgendaAdicionado(agenda: Agenda) {
     this.agendas.push(agenda);
   }

}
