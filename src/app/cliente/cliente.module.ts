import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CriarComponent } from './criar/criar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { AtualizarComponent } from './atualizar/atualizar.component'
import { ClienteRoutingModule } from './cliente.routing.module';
import { ListaTodosComponent } from './lista-todos/lista-todos.component';

@NgModule({
  declarations: [ListaTodosComponent, CriarComponent, DetalhesComponent, AtualizarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
