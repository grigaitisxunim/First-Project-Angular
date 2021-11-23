import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
selector: 'app-paciente-lista',
templateUrl: './paciente-lista.component.html',
styleUrls: ['./paciente-lista.component.css'],
})
export class PacienteListaComponent implements OnInit, OnDestroy {
pacientes: Paciente[] = [];
pacientesSubscription: Subscription = new Subscription;
public estaCarregando=false;
totalDePacientes: number = 10;
totalDePacientesPorPagina: number = 2;
opcoesTotalDePacientesPorPagina = [2, 5, 10];

constructor(public pacienteService: PacienteService) {}
paginaAtual: number = 1; //definir

  ngOnInit(): void {
    this.estaCarregando=true;
    this.pacienteService.getPacientes(this.totalDePacientesPorPagina, this.paginaAtual);
    this.pacientesSubscription = this.pacienteService
.getListaDePacienteAtualizadaObservable()
.subscribe((pacientes: Paciente[]) => {
  this.estaCarregando=false;
this.pacientes = pacientes;
});
  }

  onDeletePaciente (id: string): void{
    this.pacienteService.removerPaciente(id);
    }

  ngOnDestroy(): void {
    this.pacientesSubscription.unsubscribe();
    }
    
    onPaginaAlterada (dadosPagina: PageEvent){
      //console.log (dadosPagina);
      this.estaCarregando = true;
      this.paginaAtual = dadosPagina.pageIndex + 1; //no paginator a contagem começa de 0
      this.totalDePacientesPorPagina = dadosPagina.pageSize;
      this.pacienteService.getPacientes (this.totalDePacientesPorPagina, this.paginaAtual);
      }
}
