import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  //Objengo el valor de la etiqueta 
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifService:GifsService){}

  buscar(){
    const gifBuscado = this.txtBuscar.nativeElement.value;

    if(gifBuscado.trim().length === 0){
      return;
    }

    this.gifService.agregarGifs(gifBuscado);

    this.txtBuscar.nativeElement.value = "";
  }
}
