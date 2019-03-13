import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Cliente } from 'src/models/cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {

  private form: FormGroup;
  private cliente: Cliente;
  private id;
  private messageErro: string = '';

  constructor(private formBuild: FormBuilder, private service: ClienteService, private route: Router, private paramentro: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.paramentro.snapshot.paramMap.get('id');

    this.cliente = new Cliente()
    this.service.busca(this.id).subscribe(
      (data:Cliente) => {
        this.form.setValue({
          Nome: data.nome,
          Idade: data.idade,
          Cnpjcpf: data.cnpjCpf,
          Endereco: data.endereco,
        })},
      () => { }
    );
    this.validaDados();
  }

  validaDados() {
    this.form = this.formBuild.group({
      Nome: ['', [Validators.required, Validators.maxLength(150)]],
      Idade: ['', [Validators.required]],
      Cnpjcpf: ['', [Validators.required, Validators.maxLength(15)]],
      Endereco: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  validaCampos() {
    this.messageErro = '';

    if (this.form.controls['Nome'].status == 'INVALID')
      if (this.form.controls['Nome'].errors.required) {
        return this.messageErro = 'Nome é obrigatorio';
      } else if (this.form.controls['Nome'].errors.maxlength) {
        this.messageErro = 'Campo nome é permitido até 150 caracteres';
        return
      }

    if (this.form.controls['Idade'].status == 'INVALID')
      if (this.form.controls['Idade'].errors.required) {
        return this.messageErro = 'Idade é obrigatorio';
      }

    if (this.form.controls['Cnpjcpf'].status == 'INVALID')
      if (this.form.controls['Cnpjcpf'].errors.required) {
        return this.messageErro = 'CPF/CNPJ é obrigatorio';
      } else if (this.form.controls['Cnpjcpf'].errors.maxlength) {
        this.messageErro = 'Campo CPF/CNPJ é permitido até 15 caracteres';
        return
      }

    if (this.form.controls['Endereco'].status == 'INVALID')
      if (this.form.controls['Endereco'].errors.required) {
        return this.messageErro = 'Endereço é obrigatorio';
      } else if (this.form.controls['Endereco'].errors.maxlength) {
        this.messageErro = 'Campo endereço é permitido até 200 caracteres';
        return
      }
  }

  onSubmit(form) {

    if (this.form.invalid) {
      this.validaCampos();
      return;
    }

    this.cliente.id = this.id;
    this.cliente.nome = form.Nome;
    this.cliente.idade = form.Idade;
    this.cliente.endereco = form.Endereco;
    this.cliente.cnpjCpf = form.Cnpjcpf;

    this.service.atualizar(this.cliente).subscribe(
      () => { alert("Cliente atualizado com sucesso."), this.route.navigate(['']) },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
