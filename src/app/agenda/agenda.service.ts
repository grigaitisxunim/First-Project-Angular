import { Injectable } from '@angular/core';
import { Agenda } from './agenda.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AgendaService {
    private agendas: Agenda[] = [];
    private listaAgendasAtualizada = new Subject<Agenda[]>();
    agendaService: any;

    onDelete(id: string): void {
        this.agendaService.removerAgenda(id);
    }

    getAgendas(): void {
        this.httpClient.get <{mensagem: string, agendas: any}>('http://localhost:3000/api/agendas')
            .pipe(map((dados) => {
                return dados.agendas.map((agenda: { _id: any; especialidade: any; medico: any; data: any,hora:any }) => {
                    return {
                        id: agenda._id,
                        especialidade: agenda.especialidade,
                        medico: agenda.medico,
                        data:agenda.data,
                        hora: agenda.hora,
                    }
                })
            }))
            .subscribe(
                (agendas) => {
                    this.agendas = agendas;
                    this.listaAgendasAtualizada.next([...this.agendas]);
                }
            )
    }

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    adicionarAgenda(especialidade: string, medico: string , data: string,hora:string) {
        const dadosAgenda = new FormData();
        dadosAgenda.append('especialidade', especialidade);
        dadosAgenda.append('medico', medico);
        dadosAgenda.append('data', data);
        dadosAgenda.append('hora', hora);
        
        this.httpClient.post<{ mensagem: string, agenda: Agenda }>
        ('http://localhost:3000/api/agendas', dadosAgenda).subscribe(
                (dados) => {
                    /*cliente.id = dados.id;*/
                    const xagenda: Agenda = {
                        id: dados.agenda.id,
                        especialidade:especialidade,
                        medico:medico,
                        data: data,
                        hora: hora,
                        
                    };
                    console.log("agenda" + xagenda.especialidade);
                    this.agendas.push(xagenda);
                    this.listaAgendasAtualizada.next([...this.agendas]);
                    this.router.navigate(['/inicio']);
                }
                
            );  console.log("passo 1" + especialidade);
            console.log("passo 1"+ dadosAgenda.get('especialidade'));
            
    }
    getAgenda(idAgenda: string) {
        //return {...this.clientes.find((cli) => cli.id === idCliente)};
        return this.httpClient.get<{ 
            _id: string, 
            especialidade: string, 
            medico: string, 
            data: string ,
            hora:string,
        }>(`http://localhost:3000/api/agendas/${idAgenda}`);

    }

    getListaDeAgendasAtualizadaObservable() {
        return this.listaAgendasAtualizada.asObservable();
    }
    removerAgenda(id: string): void {
        this.httpClient.delete(`http://localhost:3000/api/agendas/${id}`).subscribe(() => {
            this.agendas = this.agendas.filter((age) => {
                return age.id !== id
            });
            this.listaAgendasAtualizada.next([...this.agendas]);
        });
    }
    atualizarAgenda (id: string, especialidade: string, medico: string, data: string,hora:string) {
        //const cliente: Cliente = { id, nome, fone, email, imagemURL: null};
        let agendaData: Agenda | FormData ;
        if (typeof(especialidade) === 'object'){// é um arquivo, montar um form data
        agendaData = new FormData();
        agendaData.append("id", id);
        agendaData.append('especialidade',especialidade);
        agendaData.append('medico',medico);
        agendaData.append('data',data);
        agendaData.append('hora',hora);
        }else{
        //enviar JSON comum
        agendaData = {
        id: id,
        especialidade:especialidade,
        medico:medico,
        data:data,
        hora:hora,
        }
        }
        console.log (typeof(agendaData));
        this.httpClient.put(`http://localhost:3000/api/agendas/${id}`, agendaData)
        .subscribe((res => {
        const copia = [...this.agendas];
        const indice = copia.findIndex (age => age.id === id);
        const agenda: Agenda = {
        id: id,
        especialidade:especialidade,
        medico:medico,
        data:data,
        hora:hora,
        }
        copia[indice] = agenda;
        this.agendas = copia;
        this.listaAgendasAtualizada.next([...this.agendas]);
        this.router.navigate(['/'])
    }));
}}