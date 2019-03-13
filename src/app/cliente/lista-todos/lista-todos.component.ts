import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/models/cliente';
import { ClienteService } from '../cliente.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-todos',
  templateUrl: './lista-todos.component.html',
  styleUrls: ['./lista-todos.component.css']
})
export class ListaTodosComponent implements OnInit {

  private clientes: Cliente[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.service.buscaTodos().subscribe(
      (data)=>{
        this.clientes = data
      },
      (err:HttpErrorResponse)=>{console.log(err.message);
      }
    );
  }

}
