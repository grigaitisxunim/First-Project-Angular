import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatExpansionModule } from '@angular/material/expansion';
import { ClienteService } from './clientes/cliente.service';
import { AppRoutingModule } from './app-routing.module';
import { Cadastro } from './cadastro/cliente.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InicioComponent } from './inicio/inicio.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AgendaComponent } from './agenda/agenda-inserir/agenda.component';
import { AgendaListaComponent} from './agenda/agenda-lista/agenda-lista.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MenuComponent } from './menu/menu.component';
import {MatSelectModule} from '@angular/material/select';
import { PacienteInserirComponent } from './clientes/paciente-inserir/paciente-inserir.component';
import { PacienteListaComponent } from './clientes/paciente-lista/paciente-lista.component';
import { PacienteService } from './clientes/paciente.service';
import { MatPaginatorModule } from '@angular/material/paginator';
//import { ComponentInicioVoluntarioComponent } from './component-inicio-voluntario/component-inicio-voluntario.component';
import { InicioVoluntarioComponent } from './inicio-voluntario/inicio-voluntario.component';
import { AgendaService } from './agenda/agenda.service';


@NgModule({
  declarations: [
    AppComponent, ClienteInserirComponent, CabecalhoComponent, ClienteListaComponent,Cadastro, MenuComponent, InicioComponent,MenuComponent, AgendaComponent,PacienteInserirComponent,PacienteListaComponent, InicioVoluntarioComponent,
    AgendaListaComponent
  ],
  imports: [
    BrowserModule, FormsModule,ReactiveFormsModule, BrowserAnimationsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,MatNativeDateModule,MatDividerModule,
    MatExpansionModule,HttpClientModule,AppRoutingModule, LayoutModule, MatSidenavModule,
    MatIconModule, MatListModule,IvyCarouselModule,MatProgressSpinnerModule,MatDatepickerModule,MatSelectModule,MatPaginatorModule
  ],
  providers: [ClienteService,PacienteService,AgendaService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
