import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContagensService } from './Services/contagens.service';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ContagensComponent } from './Components/contagens/contagens.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatTableModule} from '@angular/material/table';
import { NavegacaoComponent } from './Components/navegacao/navegacao.component';
import { MesesService } from './Services/meses.service';
import { MesesComponent } from './Components/meses/meses.component';

@NgModule({
  declarations: [
    AppComponent,
    ContagensComponent,
    NavegacaoComponent,
    MesesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
  ],
  providers: [HttpClientModule, ContagensService, MesesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
