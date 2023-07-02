import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PixaServiceService } from 'src/app/services/pixa-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  texto: string = '';
  mostrar:boolean = false;
  suscripcion: Subscription;
  constructor(private service: PixaServiceService) { 
    this.suscripcion = this.service.getError().subscribe((data)=>{
      this.texto = data;
      this.mostrar=true;
      
      setTimeout(() => {
        this.mostrar = false;
      }, 2000);
    })
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
  }

}
