import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PixaServiceService } from 'src/app/services/pixa-service.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private pixaService: PixaServiceService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      buscar: ['', [Validators.required]]
    })
  }

  buscarImagen(){
    if(!this.form.valid){
      this.pixaService.setError('No hay un texto de busqueda')
      return;
    }
    this.pixaService.setTerminoBusqueda(this.form.value.buscar);
  }
}
