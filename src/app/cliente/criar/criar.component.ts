import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/models/cliente';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {

  private form: FormGroup;
  private cliente: Cliente;
  private messageErro: string = '';

  constructor(private formBuild: FormBuilder, private service: ClienteService, private route: Router) { }

  ngOnInit() {
    this.validaDados();
  }

  validaDados() {
    this.form = this.formBuild.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      idade: ['', [Validators.required]],
      cnpjcpf: ['', [Validators.required, Validators.maxLength(15)]],
      endereco: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  validaCampos() {
    this.messageErro = '';

    if (this.form.controls['nome'].status == 'INVALID')
      if (this.form.controls['nome'].errors.required) {
        return this.messageErro = 'Nome é obrigatorio';
      } else if (this.form.controls['title'].errors.maxlength) {
        this.messageErro = 'Campo nome é permitido até 150 caracteres';
        return
      }

    if (this.form.controls['idade'].status == 'INVALID')
      if (this.form.controls['idade'].errors.required) {
        return this.messageErro = 'Idade é obrigatorio';
      }

    if (this.form.controls['cnpjcpf'].status == 'INVALID')
      if (this.form.controls['cnpjcpf'].errors.required) {
        return this.messageErro = 'CPF/CNPJ é obrigatorio';
      } else if (this.form.controls['cpf'].errors.maxlength) {
        this.messageErro = 'Campo CPF/CNPJ é permitido até 15 caracteres';
        return
      }

    if (this.form.controls['endereco'].status == 'INVALID')
      if (this.form.controls['endereco'].errors.required) {
        return this.messageErro = 'Endereço é obrigatorio';
      } else if (this.form.controls['endereco'].errors.maxlength) {
        this.messageErro = 'Campo endereço é permitido até 200 caracteres';
        return
      }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.validaCampos();
      return;
    }
    this.cliente = this.form.getRawValue();

    this.service.adicionar(this.cliente).subscribe(
      () => { alert("Cliente salvo com sucesso."), this.route.navigate(['']) },
      (err: HttpErrorResponse) => { console.log(err);
       }
    );

  }

}
