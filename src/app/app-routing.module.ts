import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContagensComponent } from './Components/contagens/contagens.component';
import { NavegacaoComponent } from './Components/navegacao/navegacao.component';
import { MesesComponent } from './Components/meses/meses.component';

const routes: Routes = [
  {path: 'contagens', component: ContagensComponent},
  {path: '', component: ContagensComponent},
  {path: 'meses', component: MesesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
