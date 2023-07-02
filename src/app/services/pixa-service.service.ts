import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixaServiceService {

  private error$ = new Subject<string>()
  private terminoBusqueda$ = new Subject<string>()

  constructor(private http: HttpClient) { }

  setError(mensaje: string){
    this.error$.next(mensaje)
  }

  setTerminoBusqueda(busqueda: string){
    this.terminoBusqueda$.next(busqueda)
  }

  getError():Observable<string>{
    return this.error$.asObservable();
  }
  getTerminoBusqueda ():Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  busquedaPixabay(termino: string, cantidadImagenes:number, paginaActual:number):Observable<any>{
    //trabajar con variables de entorno
    const api_key = '22611623-ccf542a106d6005f7c5fdf94a';
    const url = `https://pixabay.com/api/?key=${api_key}&q=${termino}&per_page=${cantidadImagenes}&page=${paginaActual}`
    return this.http.get(url);
  }
}
