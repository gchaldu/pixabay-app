import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PixaServiceService } from 'src/app/services/pixa-service.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit, OnDestroy {

  terminoBusqueda!:Subscription
  texto:string = '';
  listaImagenes: any[] = [];
  spinner: boolean = false;

  //Paginación
  /**Cantidad de imagenes por pagina */
  imgPorPagina:number = 30;
  //por defecto la pagina actual es la primera
  paginaActual: number = 1;
  totalDePaginas: number=0;
  constructor(private service: PixaServiceService) { 
    this.encontrarImagen();
  }
  ngOnDestroy(): void {
    this.terminoBusqueda.unsubscribe();
  }

  ngOnInit(): void {
    
  }

  encontrarImagen(){
    this.service.getTerminoBusqueda().subscribe((data)=>{
      this.texto = data;
      this.paginaActual=1;
      this.getImages();
    });
  }

  getImages(){
    this.spinner = true;
    this.service.busquedaPixabay(this.texto, this.imgPorPagina, this.paginaActual).subscribe((res)=>{
      if(res.hits.length === 0){
        this.service.setError('Opss, no encontramos ningun resultado')
        return;
      }
      this.listaImagenes = res.hits;
      this.totalDePaginas = this.calcularCantPaginas(res.totalHits);
      console.log(this.totalDePaginas)
      this.spinner = false;
    }, () => {
      this.spinner = false;
      this.service.setError('Opss, ocurrio un error en el servicio')
    })
  }

  calcularCantPaginas(totalConsulta: number):number{
    return Math.ceil(totalConsulta/30);
  }
  siguientePagina(){
    if(this.paginaActual<this.totalDePaginas){
      this.paginaActual+=1;
      this.listaImagenes=[];
      this.getImages();
    }
      
  }

  anteriorPagina(){
    if(this.paginaActual>1){
      this.paginaActual-=1;
      this.listaImagenes=[];
      this.getImages();
    }
      
  }

  paginaAnteriorClass():boolean{
    if (this.paginaActual===1){
      return false;
    }else{
      return true;
    }
  }
  paginaSiguienteClass(){
    if (this.paginaActual===this.totalDePaginas){
      return false;
    }else{
      return true;
    }
  }
}
