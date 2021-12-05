import { Component, OnInit, OnDestroy } from '@angular/core';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
selector: 'app-agenda-lista',
templateUrl: './agenda-lista.component.html',
styleUrls: ['./agenda-lista.component.css'],
})
export class AgendaListaComponent implements OnInit, OnDestroy {
agendas: Agenda[] = [];
agendasSubscription: Subscription = new Subscription;
public estaCarregando=false;


constructor(public agendaService: AgendaService) {}
  ngOnInit(): void {
    this.estaCarregando=true;
    this.agendaService.getAgendas();
    this.agendasSubscription = this.agendaService
.getListaDeAgendasAtualizadaObservable()
.subscribe((agendas: Agenda[]) => {
  this.estaCarregando=false;
this.agendas = agendas;
});
  }

  onDelete (id: string): void{
    this.agendaService.removerAgenda(id);
    }

  ngOnDestroy(): void {
    this.agendasSubscription.unsubscribe();
    }     
}
