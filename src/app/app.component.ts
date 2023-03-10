import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sindico } from './sindico';
import { SindicoService } from './sindico.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sindicon';
  public sindicos: Sindico[] = [];
  public palavraChave: string | any;
  public sindicoEditado: Sindico | any;
  public sindicoExcluido: Sindico | any;
  public sindicoDetalhado: Sindico | any;

  constructor(private sindicoService: SindicoService) { }

  ngOnInit() {
    this.listarSindicos();
  }

  public listarSindicos(): void {
    this.sindicoService.listaSindicos().subscribe(
      (response: Sindico[]) => {
        this.sindicos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public buscaSindico(palavraChave: string): void {
    const resultado: Sindico[] = [];
    for (const sind of this.sindicos) {
      if (sind.nome.toLocaleLowerCase().indexOf(palavraChave.toLocaleLowerCase()) !== -1
        || sind.nomeEdificio.toLocaleLowerCase().indexOf(palavraChave.toLocaleLowerCase()) !== -1
        || sind.email.toLocaleLowerCase().indexOf(palavraChave.toLocaleLowerCase()) !== -1
        || sind.bairro.toLocaleLowerCase().indexOf(palavraChave.toLocaleLowerCase()) !== -1
        || sind.telefone.toLocaleLowerCase().indexOf(palavraChave.toLocaleLowerCase()) !== -1) {
        resultado.push(sind);
      }
    }
    this.sindicos = resultado;
    if (resultado.length === 0 || !palavraChave) {
      this.listarSindicos();
    }
  }

  public adicionarSindico(adicionaForm: NgForm): void {
    document.getElementById('fechar-modal')?.click();
    this.sindicoService.adicionaSindico(adicionaForm.value).subscribe(
      (response: Sindico) => {
        console.log(response);
        this.listarSindicos();
        adicionaForm.reset;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        adicionaForm.reset;
      }
    )
  }

  public editarSindico(sindico: Sindico): void {
    this.sindicoService.atualizaSindico(sindico).subscribe(
      (response: Sindico) => {
        console.log(response);
        this.listarSindicos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public excluirSindico(sindicoId: number): void {
    this.sindicoService.excluiSindico(sindicoId).subscribe(
      (response: void) => {
        console.log(response);
        this.listarSindicos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public chamaModal(sindico: Sindico, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'detalhar'){
      button.setAttribute('data-target', '#detalharModal');
      this.sindicoDetalhado = sindico;
    }
    if (mode === 'editar'){
      button.setAttribute('data-target', '#editarModal');
      this.sindicoEditado = sindico;
    }
    if (mode === 'excluir'){
      button.setAttribute('data-target', '#excluirModal');
      this.sindicoExcluido = sindico;
    }
    container?.appendChild(button);
    button.click();
  }
}
