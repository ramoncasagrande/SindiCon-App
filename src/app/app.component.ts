import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sindico } from './sindico';
import { SindicoService } from './sindico.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sindicon';
  public sindicos: Sindico[] = [];

  constructor (private sindicoService: SindicoService){}

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
}
