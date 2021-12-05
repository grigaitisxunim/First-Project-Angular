import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AgendaService } from '../agenda.service';
import { Agenda } from '../agenda.model';


@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css'],
})

export class AgendaComponent implements OnInit {

    private modo: string = "criar";
    private idAgenda: string | null = null;
    public agenda: Agenda | undefined;
    public estaCarregando: boolean = false;
    form!: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            especialidade: new FormControl(null, {
                validators: [Validators.required]
            }),
            medico: new FormControl(null, {
                validators: [Validators.required]
            }),
            data: new FormControl(null, {
                validators: [Validators.required]
            }),
            hora: new FormControl(null, {
                validators: [ Validators.required]
            }),
        })
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("idAgenda")) {
                this.modo = "editar";
                this.idAgenda = paramMap.get("idAgenda");
                this.estaCarregando = true;
                this.agendaService.getAgenda(this.idAgenda!).subscribe(dadosAge => {
                    this.estaCarregando = false;
                    this.agenda = {
                        id: dadosAge._id,
                        especialidade: dadosAge.especialidade,
                        medico: dadosAge.medico,
                        data: dadosAge.data,
                        hora: dadosAge.hora,
                    };
                    this.form.setValue({
                        especialidade: this.agenda.especialidade,
                        medico: this.agenda.medico,
                        data: this.agenda.data,
                        hora: this.agenda.hora,
                    })

                });
            }
            else {
                this.modo = "criar";
                this.idAgenda = null;
            }
            console.log("passo 4")
        });
    }
    constructor(public agendaService: AgendaService, public route: ActivatedRoute) { }

    onSalvarAgenda() {
        if (this.form.invalid) {
            return;
        }
        
        this.estaCarregando = true; 
        
        
        if (this.modo === "criar") {
            this.agendaService.adicionarAgenda(
                this.form.value.especialidade,
                this.form.value.medico,
                this.form.value.data,
               this.form.value.hora,
           
            ); 
            console.log("modo criar "+ this.form.value.hora);
        } else {
            this.agendaService.atualizarAgenda(
                this.idAgenda!,
                this.form.value.especialidade,
                this.form.value.medico,
                this.form.value.data,
                this.form.value.hora,


            );
        }

        this.form.reset();
    }
   
   
}
