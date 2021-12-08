import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    private clientes: Cliente[] = [];
    private listaClientesAtualizada = new Subject<Cliente[]>();
    clienteService: any;

    onDelete(id: string): void {
        this.clienteService.removerCliente(id);
    }

    getClientes(pagesize: number, page: number): void {
        const parametros = `?pagesize=${pagesize}&page=${page}`;
        this.httpClient.get <{mensagem: string, clientes: any}>('http://localhost:3000/api/clientes' +
        parametros)
            .pipe(map((dados) => {
                return dados.clientes.map((cliente: { _id: any; nome: any; fone: any; email: any; senha: any; especialidade: any; estado: any; crp: any, imagemURL: any }) => {
                    return {
                        id: cliente._id,
                        nome: cliente.nome,
                        fone: cliente.fone,
                        email: cliente.email,
                        senha: cliente.senha,
                        especialidade: cliente.especialidade,
                        estado: cliente.estado,
                        crp: cliente.crp,
                        imagemURl: cliente.imagemURL,
                    }
                })
            }))
            .subscribe(
                (clientes) => {
                    this.clientes = clientes;
                    this.listaClientesAtualizada.next([...this.clientes]);
                }
            )
    }

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    adicionarCliente(nome: string, fone: string, email: string, senha: string, especialidade: string, estado: string, crp: string, imagem: File) {
        const dadosCliente = new FormData();
        dadosCliente.append("nome", nome);
        dadosCliente.append('fone', fone);
        dadosCliente.append('email', email);
        dadosCliente.append('senha', senha);
        dadosCliente.append('especialidade', especialidade);
        dadosCliente.append('estado', estado);
        dadosCliente.append('crp', crp);
        dadosCliente.append('imagem', imagem);
        this.httpClient.post<{ mensagem: string, cliente: Cliente }>
            ('http://localhost:3000/api/clientes', dadosCliente).subscribe(
                (dados) => {
                    /*cliente.id = dados.id;*/
                    const cliente: Cliente = {
                        id: dados.cliente.id,
                        nome: nome,
                        fone: fone,
                        email: email,
                        senha: senha,
                        especialidade: especialidade,
                        estado: estado,
                        crp: crp,
                        imagemURL: dados.cliente.imagemURL
                    };
                    this.clientes.push(cliente);
                    this.listaClientesAtualizada.next([...this.clientes]);
                    this.router.navigate(['/inicio-voluntario']);
                }
            )
    }
    getCliente(idCliente: string) {
        //return {...this.clientes.find((cli) => cli.id === idCliente)};
        return this.httpClient.get<{ 
            _id: string, 
            nome: string, 
            fone: string, 
            email: string, 
            senha: string, 
            especialidade: string, 
            estado: string, 
            crp: string ,
            imagemURL:string
        }>(`http://localhost:3000/api/clientes/${idCliente}`);

    }

    getListaDeClientesAtualizadaObservable() {
        return this.listaClientesAtualizada.asObservable();
    }
    removerCliente(id: string): void {
        this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
            this.clientes = this.clientes.filter((cli) => {
                return cli.id !== id
            });
            this.listaClientesAtualizada.next([...this.clientes]);
        });
    }
    atualizarCliente (id: string, nome: string, fone: string, email: string, senha: string, especialidade: string, estado: string, crp: string,imagem:File|string) {
        //const cliente: Cliente = { id, nome, fone, email, imagemURL: null};
        let clienteData: Cliente | FormData ;
        if (typeof(imagem) === 'object'){// é um arquivo, montar um form data
        clienteData = new FormData();
        clienteData.append("id", id);
        clienteData.append('nome', nome);
        clienteData.append('fone', fone);
        clienteData.append("email", email);
        clienteData.append('senha',senha);
        clienteData.append('especialidade',especialidade);
        clienteData.append('estado',estado);
        clienteData.append('crp',crp);
        clienteData.append('imagem', imagem, nome);//chave, foto e nome para o arquivo
        }else{
        //enviar JSON comum
        clienteData = {
        id: id,
        nome: nome,
        fone: fone,
        email: email,
        senha:senha,
        especialidade:especialidade,
        estado:estado,
        crp:crp,
        imagemURL: imagem
        }
        }
        console.log (typeof(clienteData));
        this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, clienteData)
        .subscribe((res => {
        const copia = [...this.clientes];
        const indice = copia.findIndex (cli => cli.id === id);
        const cliente: Cliente = {
        id: id,
        nome: nome,
        fone: fone,
        email: email,
        senha:senha,
        especialidade:especialidade,
        estado:estado,
        crp:crp,
        imagemURL: ""
        }
        copia[indice] = cliente;
        this.clientes = copia;
        this.listaClientesAtualizada.next([...this.clientes]);
        this.router.navigate(['/'])
    }));
}}