import { AtualizarComponent } from './atualizar/atualizar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaTodosComponent } from './lista-todos/lista-todos.component';
import { CriarComponent } from './criar/criar.component';

const routes: Routes = [
  {
    path: '', component: ListaTodosComponent
  },
  {
    path: 'adicionar', component: CriarComponent
  },
  {
    path: 'detalhes/:id', component: DetalhesComponent
  },
  {
    path: 'atualizar/:id', component: AtualizarComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class ClienteRoutingModule { }
