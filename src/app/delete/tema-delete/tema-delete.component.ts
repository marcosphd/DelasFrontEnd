import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temas } from 'src/app/model/Temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Temas = new Temas()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Temas)=>{
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
