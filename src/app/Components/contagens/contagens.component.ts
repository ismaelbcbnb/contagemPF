import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Contagem } from 'src/app/Models/Contagem';
import { Mes } from 'src/app/Models/Mes';
import { ContagensService } from 'src/app/Services/contagens.service';
import { MesesService } from 'src/app/Services/meses.service';

@Component({
  selector: 'app-contagens',
  templateUrl: './contagens.component.html',
  styleUrls: ['./contagens.component.css']
})

export class ContagensComponent implements OnInit {

  formulario: any;
  formularioMes: any;
  tituloFormulario: string = '';
  contagens: Contagem[] = [];
  meses: Mes[] = [];
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  visibilidadeFormularioAtualizar = false;
  modalRef?: BsModalRef;
  idContagem: number = 0;
  numContagem: number = 0;
  mesEscolhido: string = 'Todos';
  sistemaEscolhido: string = 'S627';

  constructor(private contagemService: ContagensService, private mesesService: MesesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.contagemService.PegarTodos().subscribe(resultado => {
      this.contagens = resultado;
    })

    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    })

    this.tituloFormulario = 'Cadastrar nova entrega';
    this.formulario = new FormGroup({
      idContagem: new FormControl(null),
      numCard : new FormControl(null),
      numContagem : new FormControl(null),
      pontosDeFuncao : new FormControl(null),
      sistema : new FormControl(null),
      validado : new FormControl(null),
      entregue: new FormControl(null),
      link : new FormControl(null),
      mes : new FormControl(null),
    });

    this.formularioMes = new FormGroup({
      mesAno: new FormControl(null)
    });

  }

  EscolherMes():void{

    this.mesEscolhido = this.mesEscolhido;
    
  }

  ExibirFormularioCadastro():void{
    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    })
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Cadastrar nova entrega';
    this.formulario = new FormGroup({
      idContagem: new FormControl(null),
      numCard : new FormControl(null),
      numContagem : new FormControl(null),
      pontosDeFuncao : new FormControl(null),
      sistema : new FormControl(null),
      validado : new FormControl(null),
      entregue: new FormControl(null),
      link : new FormControl(null),
      mes : new FormControl(null),
    });
  }

  ExibirFormularioAtualizacao(contagemId:number):void {
    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    })
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = false;
    this.visibilidadeFormularioAtualizar = true;
    this.contagemService.PegarPorId(contagemId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar a entrega ${resultado.numContagem}.`
      this.formulario = new FormGroup({
        idContagem: new FormControl(resultado.idContagem),
        numCard : new FormControl(resultado.numCard),
        numContagem : new FormControl(resultado.numContagem),
        pontosDeFuncao : new FormControl(resultado.pontosDeFuncao),
        sistema : new FormControl(resultado.sistema),
        validado : new FormControl(resultado.validado),
        link : new FormControl(resultado.link),
        entregue : new FormControl(resultado.entregue),
        mes : new FormControl(resultado.mes),
      });
    })
  }

  EnviarFormulario() : void{
    const contagem: Contagem = this.formulario.value;
    contagem.entregue = false;
    contagem.validado = false;
    this.contagemService.SalvarContagem(contagem).subscribe(() => {
      alert("Entrega cadastrada com sucesso");
      this.Voltar();
      this.contagemService.PegarTodos().subscribe(resultado => {
        this.contagens = resultado;
      })
    });
  }

  EnviarFormularioAtualizar(): void {
    const contagem: Contagem = this.formulario.value;
      this.contagemService.AtualizarContagem(contagem).subscribe(() => {
        alert('Entrega atualizada com sucesso!');
        this.Voltar();
        this.contagemService.PegarTodos().subscribe(registros => {
          this.contagens = registros;
        })
      });
  }

  Validar(contagem: Contagem): void {
      this.contagemService.ValidarContagem(contagem).subscribe(() => {
        this.Voltar();
        this.contagemService.PegarTodos().subscribe(registros => {
          this.contagens = registros;
        })
      });
  }
  
  Entregar(contagem: Contagem): void {
      this.contagemService.EntregarContagem(contagem).subscribe(() => {
        this.Voltar();
        this.contagemService.PegarTodos().subscribe(registros => {
          this.contagens = registros;
        })
      });
  }

  ExibirConfirmacaoExclusao(contagemId:number, contagemNum: number, conteudoModal:TemplateRef<any>):void {
    this.modalRef = this.modalService.show(conteudoModal)
    this.numContagem = contagemNum;
    this.idContagem = contagemId;
  }

  ExcluirBanco(contagemId: number): void {
    this.contagemService.ExcluirContagem(contagemId).subscribe(() => {
      this.modalRef?.hide();
      alert('Entrega excluída com sucesso!');
      this.contagemService.PegarTodos().subscribe(registros => {
        this.contagens = registros;
      })
    })
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
    this.visibilidadeFormularioAtualizar = false;
  }
}
