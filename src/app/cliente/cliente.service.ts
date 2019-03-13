import { Cliente } from './../../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_API = "https://localhost:44329/api/"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {

  }

  buscaTodos() {
    return this.http.get<Cliente[]>(URL_API + "cliente");
  }

  busca(id) {
    return this.http.get<Cliente>(URL_API + "cliente/" + id);
  }

  adicionar(cliente: Cliente) {
    return this.http.post(URL_API + "cliente/adicionar", cliente);
  }

  atualizar(cliente: Cliente) {
    return this.http.put(URL_API + "cliente/atualizar", cliente);
  }

  Excluir(codigo) {
    return this.http.delete(URL_API + "cliente/excluir/"+codigo);
  }
}
