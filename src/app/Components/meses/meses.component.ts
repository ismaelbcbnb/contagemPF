import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mes } from 'src/app/Models/Mes';
import { MesesService } from 'src/app/Services/meses.service';

@Component({
  selector: 'app-meses',
  templateUrl: './meses.component.html',
  styleUrls: ['./meses.component.css']
})
export class MesesComponent implements OnInit {

  formulario: any;
  tituloFormulario: string = '';
  meses: Mes[] = [];
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeFormularioAtualizar = false;
  modalRef?: BsModalRef;
  idMes: number = 0;
  mesAnoExcluir: string = '';

  constructor(private mesesService: MesesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    })

    this.tituloFormulario = 'Cadastrar novo Mês/Ano';
    this.formulario = new FormGroup({
      idMes: new FormControl(null),
      mesAno: new FormControl(null)
    });
    
  }

  ExibirFormularioCadastro():void{

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Cadastrar novo Mês/Ano';
    this.formulario = new FormGroup({
      idMes: new FormControl(null),
      mesAno: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(mesId:number):void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = false;
    this.visibilidadeFormularioAtualizar = true;
    this.mesesService.PegarPorId(mesId).subscribe(resultado =>{
      this.tituloFormulario = `Alterar ${resultado.mesAno}.`
      this.formulario = new FormGroup({
        idMes: new FormControl(resultado.idMes),
        mesAno: new FormControl(resultado.mesAno)
      });
    })
  }

  EnviarFormulario() : void{
    const mes: Mes = this.formulario.value;
    this.mesesService.SalvarMes(mes).subscribe(() => {
      alert("Mês/Ano inserido com sucesso");
      this.Voltar();
      this.mesesService.PegarTodos().subscribe(resultado => {
        this.meses = resultado;
      })
    });
  }

  EnviarFormularioAtualizar(): void {
    const mes: Mes = this.formulario.value;
      this.mesesService.AtualizarMes(mes).subscribe(() => {
        alert('Mês/Ano atualizados com sucesso!');
        this.Voltar();
        this.mesesService.PegarTodos().subscribe(registros => {
          this.meses = registros;
        })
      });
  }

  ExibirConfirmacaoExclusao(mesId:number, mesAno: string, conteudoModal:TemplateRef<any>):void {
    this.modalRef = this.modalService.show(conteudoModal)
    this.mesAnoExcluir = mesAno;
    this.idMes = mesId;
  }

  ExcluirMesAno(contagemId: number): void {
    this.mesesService.ExcluirMes(contagemId).subscribe(() => {
      this.modalRef?.hide();
      alert('Mês/Ano excluídos com sucesso!');
      this.mesesService.PegarTodos().subscribe(registros => {
        this.meses = registros;
      })
    })
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
    this.visibilidadeFormularioAtualizar = false;
  }

}
