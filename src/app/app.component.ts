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
}
