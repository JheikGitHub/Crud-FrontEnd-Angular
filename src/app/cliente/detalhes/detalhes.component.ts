import { Cliente } from './../../../models/cliente';
import { HttpErrorResponse } from '@angular/common/http';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  private cliente: Cliente;
  private id: any;
  constructor(private service: ClienteService, private paramentro: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id = this.paramentro.snapshot.paramMap.get('id');

    this.cliente = new Cliente()
    this.service.busca(this.id).subscribe(
      (data) => { this.cliente = data },
      () => { }
    );
  }


  excluir() {

    this.service.Excluir(this.cliente.id).subscribe(
      () => { alert("Cliente Excluido."),this.router.navigate([""]) },
      (err: HttpErrorResponse) => { alert(err.message) }
    );
  }
}
